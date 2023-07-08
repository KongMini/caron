import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';

import {
  AppContainer,
  AppHeader,
  AppIcon,
  Loading,
  AppText,
} from '../../elements';
import {
  Convert,
  FetchApi,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../utils';

import {useGetAdviser, useGetListProduct} from '../../hooks';
import {useQuery} from 'react-query';

const UserBookingHistoryDetail = ({navigation, route}) => {
  const dataPass = route.params.data;
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {listProduct, isLoadingListProduct} = useGetListProduct();
  const {advisers} = useGetAdviser();
  const {data, isLoading} = useQuery(`detail-booking-${dataPass.id}`, () =>
    FetchApi.detailBooking(dataPass.id),
  );

  const filterSpare_parts = () => {
    const arrLaborCosts = dataPass?.spare_parts
      ? dataPass?.spare_parts.split(',')
      : [];
    if (!arrLaborCosts.length) {
      return {
        listPicked: [],
        totalServicesPiked: [],
        totalCost: 0,
      };
    }
    const totalServicesPiked = (listProduct?.Data || []).filter(function (
      array_el,
    ) {
      return (
        arrLaborCosts.filter(function (anotherOne_el) {
          return anotherOne_el != array_el.ma_vattu;
        }).length == 0
      );
    });

    return {
      listPicked: totalServicesPiked,
      totalServicesPiked: totalServicesPiked.map(itm => itm.id),
      totalCost: totalServicesPiked.reduce((n, {Gia2}) => n + Gia2, 0),
    };
  };

  const {listPicked, totalServicesPiked, totalCost} = filterSpare_parts();

  const renderContent = () => {
    return (
      <View>
        {(listPicked || []).map((item, index, arr) => {
          return (
            <View
              key={`${item.ma_vattu}${index}`}
              style={{
                width: Sizes.device_width,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: Colors.greyThin,
                paddingHorizontal: Sizes.padding,
                paddingVertical: 8,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <AppText style={{width: '65%'}}>{item.ten_vattu}</AppText>
              <View style={{alignItems: 'flex-end', flex: 1}}>
                <AppText>
                  {Strings.price}: {Convert.vnd(item.Gia2)}
                </AppText>
              </View>
            </View>
          );
        })}
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
          <AppText>{Strings.Service_advisor}</AppText>
          <AppText>
            {advisers.find(item => item.id == dataPass.adviser_id)?.name ||
              '--'}
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
            {dataPass.address === 'undefined, undefined'
              ? '--'
              : dataPass.address}
          </AppText>
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText>{Strings.All_accessary}</AppText>
          <AppText>{Convert.vnd(data?._data?.giagoc || 0)}</AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText>{Strings.Sales_by_voucher}</AppText>
          <AppText>-{Convert.vnd(data?._data?.giakm || 0)}</AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText>{Strings.Use_caron_wallet}</AppText>
          <AppText>
            -{Convert.vnd(dataPass.pay_type ? dataPass.total : 0)}
          </AppText>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText style={{color: Colors.primary}}>
            {Strings.Total_cost}
          </AppText>
          <AppText style={{color: Colors.primary}}>
            {dataPass?.total ? Convert.vnd(dataPass?.total) : '--'}
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

export default UserBookingHistoryDetail;
