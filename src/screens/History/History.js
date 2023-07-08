import dayjs from 'dayjs';
import React from 'react';
import {useForm} from 'react-hook-form';
import {FlatList} from 'react-native';
import {View} from 'react-native';
import StarRating from 'react-native-star-rating';
import {useInfiniteQuery, useQueryClient} from 'react-query';
import {
  AppButton,
  AppContainer,
  AppDropdown,
  AppHeader,
  AppText,
  DataNull,
  ErrorView,
  Loading,
} from '../../elements';
import {useGetMyCar} from '../../hooks';
import {
  Convert,
  FetchApi,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../utils';

const History = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {control, watch, setValue} = useForm({mode: 'all'});
  const queryClient = useQueryClient();
  const {myCar, isLoading1} = useGetMyCar(1);
  const license_plates = watch('license_plates');

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
    isRefetching,
  } = useInfiniteQuery(
    `useHistory-${license_plates}`,
    ({pageParam = 0}) => {
      return FetchApi.getPaginglichsusuachua({
        pageIndex: pageParam,
        sort: 'ngaysuachua',
        sortType: 'dsc',
        ma_xe: license_plates,
      });
    },
    {
      getNextPageParam: lastGroup => {
        return lastGroup?.nextPage;
      },
      enabled: license_plates ? true : false,
    },
  );

  React.useEffect(() => {
    if (myCar?._data) {
      setValue('license_plates', myCar._data?.[0]?.license_plates);
    }
  }, [myCar]);

  const news = Convert.dataQueryToList(data);
  const length = news.length;

  const renderContent = () => {
    return (
      <FlatList
        contentContainerStyle={{padding: Sizes.padding, paddingBottom: 100}}
        keyExtractor={(item, index) => `${item.ROWNUM}-${index}`}
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
        onRefresh={() => {
          if (!isRefetching) {
            queryClient.setQueryData('useHistory', data => {
              return {
                pages: data?.pages ? [data.pages[0]] : [[]],
                pageParams: data?.pageParams ? [data.pageParams[0]] : [[]],
              };
            });
            refetch();
          }
        }}
        onEndReached={() => {
          if (hasNextPage && !isFetching && !isLoading) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.8}
        data={news || []}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return <Loading style={{marginBottom: 30, marginTop: 10}} />;
          }
          return null;
        }}
        ListEmptyComponent={() => {
          if (isLoading) {
            return <Loading />;
          }
          if (isError) {
            return (
              <ErrorView
                onPress={refetch}
                title={error.Message || error.message}
              />
            );
          }
          return <DataNull title={Strings.Not_update_yet} />;
        }}
      />
    );
  };
  const renderBeforeCall = () => {
    if (isLoading1) {
      return <Loading />;
    }
    return (
      <View>
        <AppDropdown
          styleInput={{
            width: '90%',
            alignSelf: 'center',
          }}
          styleItemContainer={{width: '89.8%'}}
          dataDropDown={myCar?._data || []}
          control={control}
          name={'license_plates'}
          keyValueDropdown="name"
          keyResult="license_plates"
        />
        {renderContent()}
      </View>
    );
  };

  return (
    <AppContainer>
      <AppHeader isChild title={Strings.History_service} />
      {renderBeforeCall()}
    </AppContainer>
  );
};

const Item = ({item, navigation}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  return (
    <View
      key={item.code}
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderColor: Colors.greyThin,
      }}>
      <View style={{flexDirection: 'row'}}>
        <AppText style={{flex: 1, fontSize: Sizes.h6}}>
          {item.dien_giai || item.ma_donhang}
        </AppText>
        <AppText
          style={{
            flex: 1,
            fontSize: Sizes.h6,
            color: Colors.primary,
            textAlign: 'right',
          }}>
          {Strings.Date}: {dayjs(item.ngaysuachua).format('DD/MM/YYYY')}
        </AppText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 6,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            marginRight: 4,
            borderColor: Colors.primary,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AppText
            style={{
              lineHeight: 16,
              fontSize: 12,
              color: Colors.primary,
              textAlign: 'center',
            }}>
            $
          </AppText>
        </View>
        <AppText style={{fontSize: Sizes.h6, color: Colors.primary}}>
          {Strings.All_cost}:{' '}
          {item.tongtienthanhtoan ? Convert.vnd(item.tongtienthanhtoan) : 'đ '}
        </AppText>
      </View>

      {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <AppText style={{fontSize: Sizes.h6}}>{Strings.Service_review}</AppText>
        <StarRating
          disabled={true}
          maxStars={5}
          starSize={Sizes.h4}
          containerStyle={{
            marginLeft: 14,
          }}
          fullStarColor={Colors.success}
          emptyStarColor={Colors.sub_text}
          rating={item.rating}
        />
      </View> */}

      <AppButton
        onPress={() => navigation.navigate('HistoryDetail', {data: item})}
        title={Strings.Detail}
        type="primary"
        style={{marginTop: 10, paddingHorizontal: 14, marginHorizontal: 0}}
        textStyle={{fontSize: Sizes.h5, fontWeight: '400'}}
        wrapperStyle={{alignSelf: 'flex-end'}}
      />
    </View>
  );
};
export default History;
