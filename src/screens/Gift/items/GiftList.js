// import dayjs from 'dayjs';
// import React from 'react';
// import {View, TouchableOpacity} from 'react-native';
// import {useQuery} from 'react-query';
// import {AppImage, AppText} from '../../../elements';
// import {
//   Convert,
//   FetchApi,
//   Sizes,
//   useAppLanguage,
//   useAppTheme,
// } from '../../../utils';

// const GiftList = ({navigation}) => {
//   const {Strings} = useAppLanguage();
//   const {Colors} = useAppTheme();
//   const {data, isLoading, refetch, isFetching} = useQuery(
//     [`Promotion-${1}`],
//     () => FetchApi.getPromotion(),
//   );

//   const onUseNow = (id, is_type, title, price) => () => {
//     navigation.navigate('Booking', {
//       dataBooking: {
//         promotion_id: id,
//         is_type_promotion: is_type,
//         promotion_title: title,
//         promotion_price: price,
//       },
//     });
//   };

//   return (
//     <View
//       style={{
//         paddingTop: Sizes.padding,
//         width: Sizes.width(94),
//         alignSelf: 'center',
//       }}>
//       {(data?._data?.dsKM || []).map(item => {
//         return (
//           <TouchableOpacity
//             onPress={() => navigation.navigate('PromotionDetail', {data: item})}
//             activeOpacity={0.9}
//             key={item.id}
//             style={{
//               height: Sizes.height(20),
//               padding: 10,
//               backgroundColor: 'white',
//               marginBottom: Sizes.padding,
//               borderWidth: 1,
//               borderRadius: Sizes.border_radius,
//               borderColor: Colors.greyLight,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               overflow: 'hidden',
//             }}>
//             <View
//               style={{
//                 height: Sizes.height(19),
//                 width: Sizes.height(18.5),
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <AppImage
//                 style={{
//                   height: Sizes.height(16),
//                   width: Sizes.height(16),
//                   borderRadius: 30,
//                   marginRight: 10,
//                 }}
//                 source={{
//                   uri:
//                     item.image ||
//                     item.image ||
//                     'https://chonthuonghieu.com/wp-content/uploads/listing-uploads/gallery/2020/12/cau_nang.jpg',
//                 }}
//                 resizeMode="cover"
//               />
//               <View
//                 style={{height: Sizes.height(19), justifyContent: 'center'}}>
//                 {Array.from({length: 19}).map((item, index) => {
//                   return (
//                     <AppText
//                       key={`${index}`}
//                       style={{fontSize: 5, color: Colors.greyBold}}>
//                       I
//                     </AppText>
//                   );
//                 })}
//               </View>
//             </View>

//             <View
//               style={{
//                 height: Sizes.height(20),
//                 paddingVertical: 10,
//                 width: Sizes.width(94) - Sizes.height(22),
//               }}>
//               <View
//                 style={{
//                   flex: 1,
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                 }}>
//                 <AppText style={{flex: 1}}>
//                   <AppText
//                     ellipsizeMode="tail"
//                     numberOfLines={3}
//                     style={{
//                       padding: 1,
//                       fontSize: Sizes.h6,
//                       backgroundColor: 'red',
//                       color: 'white',
//                     }}>
//                     {Strings.Max}{' '}
//                     {item.is_type
//                       ? item.price + '%'
//                       : Convert.vnd(item.price, true)}
//                   </AppText>
//                   <AppText style={{fontSize: Sizes.h6}}> {item.title}</AppText>
//                 </AppText>

//                 <TouchableOpacity
//                   onPress={onUseNow(
//                     item.id,
//                     item.is_type,
//                     item.title,
//                     item.price,
//                   )}>
//                   <AppText style={{fontSize: Sizes.h6, color: 'red'}}>
//                     {Strings.Use_now}
//                   </AppText>
//                 </TouchableOpacity>
//               </View>

//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'flex-end',
//                   flex: 1,
//                 }}>
//                 <View style={{flex: 1}}>
//                   <AppText style={{fontSize: Sizes.h8, color: Colors.greyBold}}>
//                     {Strings.Effect}:{' '}
//                     {dayjs(item.start_time).format('DD/MM/YYYY')}
//                   </AppText>
//                   <AppText style={{fontSize: Sizes.h8, color: Colors.greyBold}}>
//                     {Strings.Due_date}:{' '}
//                     {dayjs(item.end_time).format('DD/MM/YYYY')}
//                   </AppText>
//                 </View>
//                 <TouchableOpacity>
//                   <AppText style={{fontSize: Sizes.h6, color: 'blue'}}>
//                     {Strings.Condition}
//                   </AppText>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// export default GiftList;

import React from 'react';
import {View, FlatList} from 'react-native';
import {useQuery} from 'react-query';
import {DataNull, ErrorView, Loading} from '../../../elements';
import {FetchApi, Sizes, useAppLanguage} from '../../../utils';
import PromotionItem from '../../Promotion/items/PromotionItem';

const GiftList = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {data, isLoading, refetch, isError, isFetching, isRefetching} =
    useQuery([`Gift`], () => FetchApi.getPromotion());

  return (
    <View
      style={{
        paddingTop: Sizes.padding,
        width: Sizes.width(94),
        alignSelf: 'center',
      }}>
      <FlatList
        data={data?._data?.dsKM || []}
        keyExtractor={(item, index) => `${item.id}`}
        contentContainerStyle={{paddingBottom: 100}}
        refreshing={isFetching || isRefetching}
        onRefresh={() => {
          refetch();
        }}
        ListEmptyComponent={() => {
          if (isLoading) {
            return <Loading />;
          }
          if (isError || data?._error_code == 1) {
            return (
              <ErrorView
                onPress={refetch}
                title={error.Message || error.message || error._message}
              />
            );
          }
          return <DataNull title={Strings.Not_update_yet} />;
        }}
        renderItem={({item, index}) => {
          return (
            <PromotionItem
              key={`${item.id}`}
              navigation={navigation}
              item={item}
              refetch={refetch}
            />
          );
        }}
      />
    </View>
  );
};

export default GiftList;
