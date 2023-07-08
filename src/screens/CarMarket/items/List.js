import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {View, TouchableOpacity, FlatList, Linking} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {
  AppIcon,
  AppImage,
  AppText,
  DataNull,
  ErrorView,
  Loading,
} from '../../../elements';
import {
  Convert,
  FetchApi,
  isIOS,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';
import Filter from './Filter';

const List = ({watch, control, setValue}) => {
  const {Strings} = useAppLanguage();
  const navigation = useNavigation();
  const timeout = useRef();
  const hangxe = watch('manufacturer');
  const dongxe = watch('type');
  const keywords = watch('keywords');

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
    `listCarMarket-${hangxe}-${dongxe}`,
    ({pageParam = 0}) => {
      return FetchApi.listCarMarket({
        hangxe: hangxe || '',
        dongxe: dongxe || '',
        keywords: keywords || '',
      });
    },
    {
      getNextPageParam: lastGroup => {
        return lastGroup?.nextPage;
      },
    },
  );

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      refetch();
    }, 1000);
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [keywords]);

  const news = Convert.dataQueryToList(data);
  const length = news.length;

  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 100}}
      keyExtractor={(item, index) => `${item.ROWNUM}-${index}`}
      ListHeaderComponent={
        <Filter control={control} watch={watch} setValue={setValue} />
      }
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
              pages: [data.pages[0]],
              pageParams: [data.pageParams[0]],
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

const Item = ({item, navigation}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const onCall = e => {
    const phone = e.phone;
    let phoneNumber = phone;
    if (isIOS) {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          console.log('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };
  console.log('first', item);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CarMarketDetail', {data: item})}
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderColor: Colors.greyThin,
      }}>
      <AppText style={{fontWeight: 'bold', color: '#5603fc', marginBottom: 10}}>
        {item.tenxe}
      </AppText>
      <AppText
        style={{color: Colors.primary, fontWeight: 'bold', marginBottom: 10}}>
        {Strings.price}: {Convert.vnd(item.giaxe, true)}
      </AppText>
      <View style={{flexDirection: 'row'}}>
        <AppImage
          style={{width: Sizes.width(30), height: Sizes.width(30)}}
          resizeMode="contain"
          source={{
            uri: item.image || item.image2 || item.image3 || item.image4,
          }}
        />

        <View style={{padding: 10, flex: 1}}>
          <AppText>
            - {Strings.Car_color}: {item.mausac || '--'}
          </AppText>
          <AppText style={{paddingVertical: 4}}>
            - {Strings.Nam_dang_ky}: {item.namdangky || '--'}
          </AppText>
          {!!item.phone && (
            <AppText>
              - {Strings.Phone}: {item.phone}
            </AppText>
          )}
          {!!item.name && (
            <AppText style={{paddingVertical: 4}} numberOfLines={2}>
              - {Strings.Owner_car_name}: {item.name}
            </AppText>
          )}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 6,
        }}>
        <View style={{flex: 1}}>
          {!!item.name && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AppIcon
                icon={'user'}
                type={'AntDesign'}
                size={Sizes.h5}
                color={'#5603fc'}
                hitSlop={{
                  top: Sizes.padding,
                  left: Sizes.padding,
                  bottom: Sizes.padding,
                  right: Sizes.padding * 2,
                }}
              />
              <AppText style={{fontWeight: 'bold', marginLeft: 6}}>
                {item.name}
              </AppText>
            </View>
          )}
          {!!item.phone && (
            <TouchableOpacity
              onPress={() => onCall(item.phone)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 6,
              }}>
              <AppIcon
                icon={'phone'}
                type={'AntDesign'}
                size={Sizes.h5}
                color={'#5603fc'}
                hitSlop={{
                  top: Sizes.padding,
                  left: Sizes.padding,
                  bottom: Sizes.padding,
                  right: Sizes.padding * 2,
                }}
              />
              <AppText style={{fontWeight: 'bold', marginLeft: 6}}>
                {item.phone}
              </AppText>
            </TouchableOpacity>
          )}
        </View>
        <AppText style={{fontWeight: 'bold', color: Colors.primary}}>
          {item.status == 1 ? Strings.Chua_ban : ''}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default List;
