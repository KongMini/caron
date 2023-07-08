import dayjs from 'dayjs';
import React, {useState} from 'react';
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
    'useGetNotificationMaintain',
    ({pageParam = 1}) => {
      return FetchApi.getPagingNotification({
        pageIndex: pageParam,
        screen_code: 'baoduong',
      });
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
        contentContainerStyle={{paddingBottom: 100}}
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

const Item = ({item, navigation}) => {
  const {Colors} = useAppTheme();
  const [isRead, setIsRead] = useState(item.status);

  const onPress = async () => {
    navigation.navigate('NotificationDetail', {dataProps: item});
    setIsRead(true);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderColor: Colors.greyThin,
        backgroundColor: isRead ? Colors.background : Colors.superGrey,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <View style={{flex: 1}}>
          <AppText>{item.title}</AppText>
          <AppText
            style={{color: Colors.greyBold, marginTop: 10, fontSize: Sizes.h6}}>
            {item.sub_title}
          </AppText>
        </View>
        <View>
          <AppText style={{color: Colors.greyBold, fontSize: Sizes.h6}}>
            {item.created_at ? item.created_at.slice(0, -3) : ''}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default List;
