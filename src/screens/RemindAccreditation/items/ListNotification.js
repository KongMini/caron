// import React, {useEffect} from 'react';
// import {useForm, useWatch} from 'react-hook-form';
// import {View} from 'react-native';
// import {AppButton, AppCheckbox, AppHeader, AppText} from '../../../elements';
// import {
//   FetchApi,
//   ModalBase,
//   Sizes,
//   useAppLanguage,
//   useAppTheme,
// } from '../../../utils';

// const ListNotification = () => {
//   const {Strings} = useAppLanguage();
//   const {Colors} = useAppTheme();

//   const {control, handleSubmit, reset} = useForm({
//     mode: 'all',
//   });
//   const watchAll = useWatch({control});

//   useEffect(() => {
//     // alert(watchAll);
//   }, [watchAll]);

//   const DATA = [
//     {label: Strings.Noti_by_app, data: false, name: 'byApp'},
//     {label: Strings.Noti_by_email, data: false, name: 'byEmail'},
//     {label: Strings.Noti_by_sms, data: false, name: 'bySMS'},
//     {label: Strings.Noti_by_zalo, data: false, name: 'byZalo'},
//   ];

//   const onUpdate = async e => {
//     let notification_config = '';
//     Object.values(e).forEach((item, index, arr) => {
//       if (item === true) {
//         notification_config = `${notification_config}${index + 1}${
//           index !== arr.length - 1 ? ',' : ''
//         }`;
//       }
//     });

//     const result = await FetchApi.configNoti({notification_config});
//     if (result._msg_code == 1) {
//       ModalBase.success(Strings.Save_success);
//     } else {
//       ModalBase.error({result});
//     }
//   };

//   return (
//     <View>
//       <AppHeader
//         isChild
//         title={Strings.Receive_noti.toUpperCase()}
//         type="primary"
//       />

//       {DATA.map((item, index) => {
//         return (
//           <View
//             key={`${index}`}
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginVertical: 8,
//               paddingLeft: Sizes.padding / 2,
//             }}>
//             <AppText>{item.label}</AppText>
//             <AppCheckbox
//               activeColor={Colors.greyLight}
//               inactiveColor={Colors.greyLight}
//               name={item.name}
//               defaultValue={item.data}
//               control={control}
//               icon="ios-checkbox-outline"
//               iconInactive="ios-square-outline"
//               type="Ionicons"
//             />
//           </View>
//         );
//       })}
//       <AppButton
//         title={Strings.Update}
//         type="primary"
//         style={{
//           paddingVertical: 6,
//           paddingHorizontal: 14,
//           alignSelf: 'center',
//           marginTop: 6,
//         }}
//         onPress={handleSubmit(onUpdate)}
//       />
//     </View>
//   );
// };

// export default ListNotification;

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
import ListCar from './ListCar';

export default ListNotification = ({navigation}) => {
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
    'useGetNotificationInsurance',
    ({pageParam = 1}) => {
      return FetchApi.getPagingNotification({
        pageIndex: pageParam,
        screen_code: 'kiemdinh',
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
        ListHeaderComponent={<ListCar navigation={navigation} />}
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
