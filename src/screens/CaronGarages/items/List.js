import React from 'react';
import {View, TouchableOpacity, Linking, Platform} from 'react-native';
import {useQuery} from 'react-query';
import {AppIcon, AppText, Loading, ErrorView} from '../../../elements';
import {
  FetchApi,
  isIOS,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

const List = ({navigation}) => {
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`getListCaronGarages-${1}`],
    () => FetchApi.getListCaronGarage(),
  );
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

  const openMap = e => {
    const {latitude, longitude} = e;
    const destination = `${latitude}+${longitude}`;
    const url = Platform.select({
      android: `google.navigation:q=${destination}`,
      ios: `maps://app?daddr=${destination}`,
    });
    Linking.openURL(url).catch(() => {});
  };

  const func = [
    {
      label: Strings.Booking_2,
      onPress: e =>
        navigation.navigate('Booking', {dataBooking: {gara_id: e.id}}),
      icon: 'calendar',
    },
    {
      label: Strings.Contact,
      onPress: e => onCall(e),
      icon: 'phone-call',
      type: 'Feather',
    },
    {label: Strings.Guide, onPress: e => openMap(e), icon: 'arrowright'},
  ];

  console.log('dsadsa', data);

  if (isLoading) {
    return <Loading />;
  }

  if (data?._error_code === 1) {
    return <ErrorView title={data.message} />;
  }

  return (
    <View style={{padding: 10}}>
      {(data._data || []).map((e, i) => {
        return (
          <View key={`${e.id}`} style={{marginBottom: 6}}>
            <AppText>
              <AppText style={{fontWeight: 'bold'}}>{e.title}: </AppText>
              <AppText>{e.address}</AppText>
            </AppText>
            <AppText style={{marginVertical: 4}}>
              {Strings.Phone}: {e.phone}
            </AppText>
            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
              {func.map((btn, btnIndex) => {
                return (
                  <TouchableOpacity
                    key={`${btnIndex}`}
                    onPress={() => btn.onPress(e)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: Colors.primary,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      marginLeft: 6,
                      borderRadius: Sizes.border_radius,
                    }}>
                    <AppText style={{color: 'white', marginRight: 6}}>
                      {btn.label}
                    </AppText>
                    <AppIcon
                      icon={btn.icon}
                      type={btn.type || 'AntDesign'}
                      size={Sizes.h5}
                      color="white"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );

  // return (
  //   <View style={{padding: 10}}>
  //     {Object.keys(data).map(item => {
  //       return (
  //         <View style={{marginBottom: 20}}>
  //           <AppText
  //             style={{
  //               color: Colors.greyBold,
  //               fontWeight: 'bold',
  //               marginBottom: 10,
  //             }}>
  //             {Strings[item].toUpperCase()}
  //           </AppText>
  //           {data[item].map((e, i) => {
  //             return (
  //               <View style={{marginBottom: 6}}>
  //                 <AppText>
  //                   <AppText style={{fontWeight: 'bold'}}>
  //                     {Strings.Facilities + ' ' + (i + 1)}:{' '}
  //                   </AppText>
  //                   <AppText>{e.address}</AppText>
  //                 </AppText>
  //                 <AppText style={{marginVertical: 4}}>
  //                   {Strings.Phone}: {e.phoneNumber}
  //                 </AppText>
  //                 <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
  //                   {func.map(btn => {
  //                     return (
  //                       <TouchableOpacity
  //                         onPress={() => btn.onPress(e)}
  //                         style={{
  //                           flexDirection: 'row',
  //                           alignItems: 'center',
  //                           backgroundColor: Colors.primary,
  //                           paddingHorizontal: 10,
  //                           paddingVertical: 4,
  //                           marginLeft: 6,
  //                           borderRadius: Sizes.border_radius,
  //                         }}>
  //                         <AppText style={{color: 'white', marginRight: 6}}>
  //                           {btn.label}
  //                         </AppText>
  //                         <AppIcon
  //                           icon={btn.icon}
  //                           type={btn.type || 'AntDesign'}
  //                           size={Sizes.h5}
  //                           color="white"
  //                         />
  //                       </TouchableOpacity>
  //                     );
  //                   })}
  //                 </View>
  //               </View>
  //             );
  //           })}
  //         </View>
  //       );
  //     })}
  //   </View>
  // );
};

export default List;
