import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, TouchableOpacity, Linking, Platform} from 'react-native';
import {useQuery} from 'react-query';
import {
  AppIcon,
  AppText,
  Loading,
  ErrorView,
  AppDropdown,
} from '../../../elements';
import {useGetListCity} from '../../../hooks';
import {
  FetchApi,
  isIOS,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

const List = ({}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {control, watch} = useForm({mode: 'all'});
  const idTinhThanh = watch('idTinhThanh');

  const {data, isLoading} = useQuery([`getListRescue-${idTinhThanh}`], () =>
    FetchApi.listRescue(idTinhThanh),
  );

  const cities = useQuery(
    [`useGetListCityOld-${1}`],
    FetchApi.getAlltinhthanhOld,
  );

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
      label: Strings.Contact,
      onPress: e => onCall(e),
      icon: 'phone-call',
      type: 'Feather',
    },
    {label: Strings.Guide, onPress: e => openMap(e), icon: 'arrowright'},
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (data?._error_code === 1) {
    return <ErrorView title={data.message} />;
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
          paddingHorizontal: Sizes.padding,
          borderBottomWidth: 1,
          borderColor: Colors.greyThin,
          marginBottom: Sizes.padding,
          paddingBottom: 10,
        }}>
        <AppText style={{marginTop: 10, marginRight: 20}}>
          {Strings.Filter_city}
        </AppText>
        <View style={{flex: 1}}>
          <AppDropdown
            control={control}
            name="idTinhThanh"
            dataDropDown={cities?.data?.Data || []}
            keyValueDropdown="ten_thanhpho"
            keyResult="ma_thanhpho"
            styleItemContainer={{
              width: Sizes.device_width - Sizes.width(28) - 3 * Sizes.padding,
            }}
          />
        </View>
      </View>

      {(data._data || []).map((e, i) => {
        return (
          <View
            key={`${e.id}`}
            style={{marginBottom: Sizes.padding, paddingHorizontal: 10}}>
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
};

export default List;
