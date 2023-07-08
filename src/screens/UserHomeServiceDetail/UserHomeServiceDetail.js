import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';

import {
  AppContainer,
  AppHeader,
  AppIcon,
  Loading,
  AppText,
} from '../../elements';
import {FetchApi, useAppLanguage, useAppTheme} from '../../utils';

import {useQuery} from 'react-query';
import {useGetDistrictOld, useGetListCityOld} from '../../hooks';
import {useForm} from 'react-hook-form';

export default UserHomeServiceDetail = ({navigation, route}) => {
  const dataPass = route.params.data;
  const {control} = useForm({
    mode: 'all',
    defaultValues: {city: dataPass.city},
  });
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const listCity = useGetListCityOld();
  const {listDistrict} = useGetDistrictOld(control);

  const {data, isLoading} = useQuery(`detail-booking-${dataPass.id}`, () =>
    FetchApi.detailHomeService(dataPass.id),
  );

  const city = (listCity?.data?.Data || []).find(
    item => item.ma_thanhpho == dataPass.city,
  )?.ten_thanhpho;

  const district = (listDistrict?.Data || []).find(
    item => item.ma_quanhuyen == dataPass.district,
  )?.ten_quanhuyen;

  const renderContent = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText>{Strings.License_plates}</AppText>
          <AppText>{dataPass.license_plates}</AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText>{Strings.Owner_car_name}</AppText>
          <AppText>{dataPass.name}</AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText>{Strings.Phone}</AppText>
          <AppText>{dataPass.phone}</AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText style={{flex: 1}}>{Strings.Note}</AppText>
          <AppText style={{flex: 1, textAlign: 'right'}}>
            {dataPass.note}
          </AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText style={{flex: 1}}>{'Địa điểm thực hiện'}</AppText>
          <AppText style={{flex: 1, textAlign: 'right'}}>
            {`${city ? city + ', ' : ''}${district ? district : ''}`}
          </AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText style={{flex: 1}}>{Strings.Service}</AppText>
          <AppText style={{flex: 1, textAlign: 'right'}}>
            {dataPass.service_text}
          </AppText>
        </View>

        <View style={{borderTopWidth: 10, borderColor: Colors.greyThin}}></View>
        <View style={{borderBottomWidth: 0.8, borderColor: Colors.greyThin}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <AppText style={{fontWeight: '600'}}>{Strings.Time_create}</AppText>
            <AppText>{dataPass.created_at}</AppText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <AppText style={{fontWeight: '600'}}>
              {Strings.Service_use_time}
            </AppText>
            <AppText>{dataPass?.date_at}</AppText>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CaronGarages')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '47%',
              borderWidth: 0.8,
              paddingHorizontal: 10,
              paddingVertical: 6,
            }}>
            <AppIcon
              icon="questioncircleo"
              type="AntDesign"
              color={Colors.primary}
            />
            <AppText style={{marginLeft: 12}}>{Strings.Qa}</AppText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderBeforeCall = () => {
    if (isLoading) {
      return <Loading />;
    }
    return renderContent();
  };

  return (
    <AppContainer>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <AppHeader isChild title={Strings.Information_services} leftGoBack />
        {renderBeforeCall()}
      </ScrollView>
    </AppContainer>
  );
};
