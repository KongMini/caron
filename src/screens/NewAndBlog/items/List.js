import React from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {
  AppImage,
  AppText,
  DataNull,
  ErrorView,
  Loading,
} from '../../../elements';
import {
  Convert,
  FetchApi,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

const Item = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewAndBlogDetail', {dataProps: item})}
      activeOpacity={0.8}
      style={{padding: 10, flexDirection: 'row'}}>
      <AppImage
        source={{uri: item.file_name}}
        style={{
          width: Sizes.width(32),
          height: Sizes.width(32),
          marginRight: 10,
        }}
      />
      <View style={{flex: 1}}>
        <AppText
          style={{fontWeight: '600'}}
          multipleLines={true}
          numberOfLines={2}>
          {item.title}
        </AppText>
        {!!item.note && (
          <AppText
            style={{fontSize: Sizes.h6, marginVertical: 10}}
            multipleLines={true}
            numberOfLines={3}>
            {item.note}
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
};

const List = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchedAfterMount,
    refetch,
    isFetching,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'useGetNews',
    ({pageParam = 0}) => {
      return FetchApi.getListNews(pageParam);
    },
    {
      getNextPageParam: lastGroup => {
        return lastGroup.nextPage;
      },
    },
  );
  const news = Convert.dataQueryToList(data);
  const length = news.length;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      <FlatList
        contentContainerStyle={{padding: Sizes.padding, paddingBottom: 100}}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          return (
            <Item
              key={`${item.id}`}
              item={item}
              navigation={navigation}
              last={index === length - 1}
            />
          );
        }}
        refreshing={isFetchedAfterMount && isFetching}
        onRefresh={refetch}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.8}
        data={news || []}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return <Loading />;
          }
          return null;
        }}
        ListEmptyComponent={() => {
          if (isLoading) {
            return <Loading />;
          }
          if (isError) {
            return <ErrorView onPress={refetch} title={error.message} />;
          }
          return <DataNull title={Strings.Not_update_yet} />;
        }}
      />
    </View>
  );
};

export default List;
