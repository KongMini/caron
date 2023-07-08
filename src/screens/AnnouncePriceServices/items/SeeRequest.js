import React, {useState} from 'react';
import {View, ScrollView, TextInput, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  AppButton,
  AppDropdown,
  AppHTML,
  AppImagePickerList,
  AppInput,
  AppText,
  Loading,
} from '../../../elements';
import {
  Convert,
  FetchApi,
  ModalBase,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';
import {useQuery} from 'react-query';
import {useGetMyCar, useGetListProduct, useGetAdviser} from '../../../hooks';

const SeeRequest = ({setScreen, control, setValue, refetch, getValues}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {navigate} = useNavigation();
  const {listProduct, isLoadingListProduct} = useGetListProduct();
  const {data, isLoading} = useQuery(`detail-baogia-${getValues('id')}`, () =>
    FetchApi.detailBaoGia(getValues('id')),
  );
  const {myCar} = useGetMyCar();
  const {advisers} = useGetAdviser();
  const [submiting, setSubmiting] = useState(false);

  const status = {
    1: Strings.Seen,
    0: Strings.Not_have,
    2: Strings.Cancel,
  };

  if (isLoadingListProduct || isLoading) {
    return <Loading />;
  }

  const request = data?._data || {};

  const onCancel = async () => {
    const id = getValues('id');
    setSubmiting(true);
    const result = await FetchApi.cancelBaoGia(id);
    setSubmiting(false);
    if (result._msg_code === 1) {
      refetch();
      ModalBase.success('Hủy thành công');
      setScreen('Request_announce_service');
    } else {
      ModalBase.success(Strings.something_wrong);
    }
  };

  const filterSpare_parts = () => {
    const arrLaborCosts = request?.spare_parts
      ? request?.spare_parts.split(',')
      : [];

    if (!arrLaborCosts.length) {
      return {listPicked: [], totalServicesPiked: [], totalCost: 0};
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

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 100, alignItems: 'center'}}>
      <AppDropdown
        control={control}
        name="car_id"
        disabled={true}
        defaultValue={request?.car_id || getValues('carIdSelected')}
        dataDropDown={myCar?._data || []}
        styleInput={{
          width: Sizes.device_width - Sizes.padding * 2,
          borderWidth: Sizes.border,
          borderColor: Colors.greyLight,
          height: 40,
          marginTop: Sizes.padding,
          marginBottom: Sizes.padding,
        }}
        itemTextStyle={{fontSize: Sizes.h5}}
        styleValue={{fontSize: Sizes.h5}}
        keyValueDropdown="name"
        keyResult="id"
      />
      {/* <AppInput
        name="content"
        control={control}
        editable={false}
        defaultValue={request?.content || getValues('contentSelected')}
        containerStyle={{paddingHorizontal: 0, width: '100%'}}
        multiline={true}
        style={{
          paddingTop: 4,
          marginHorizontal: Sizes.padding,
          alignItems: 'flex-start',
          borderRadius: Sizes.border_radius,
          borderColor: Colors.greyLight,
          height: 120,
        }}
      /> */}
      <View
        style={{
          padding: 8,
          marginHorizontal: Sizes.padding,
          alignItems: 'flex-start',
          borderRadius: Sizes.border_radius,
          borderColor: Colors.greyLight,
          width: Sizes.device_width - Sizes.padding * 2,
          borderWidth: StyleSheet.hairlineWidth,
          minHeight: 100,
        }}>
        <AppHTML
          source={{
            html: request?.content || getValues('contentSelected'),
          }}
        />
      </View>

      <AppText
        style={{
          paddingLeft: Sizes.padding,
          alignSelf: 'flex-start',
          marginVertical: 10,
          fontWeight: '500',
        }}>
        {Strings.Image}
      </AppText>
      <AppImagePickerList
        style={{alignSelf: 'flex-start', paddingHorizontal: Sizes.padding}}
        name="images"
        control={control}
        defaultValue={null}
      />
      <AppButton
        disabled={submiting}
        title={Strings.Cancel}
        type="primary"
        style={{
          marginTop: 10,
          paddingVertical: 4,
          paddingHorizontal: 10,
          alignSelf: 'center',
          marginHorizontal: 0,
          marginRight: Sizes.width(2),
        }}
        onPress={onCancel}
      />
      <View
        style={{
          height: 6,
          width: '100%',
          backgroundColor: '#F5F7FB',
          marginVertical: Sizes.padding,
        }}
      />

      {request?.status == 1 && (
        <>
          <AppText
            style={{
              fontSize: Sizes.h4,
              fontWeight: '500',
              alignSelf: 'flex-start',
              marginHorizontal: Sizes.padding,
            }}>
            {Strings.Announce_price_service.toUpperCase()}
          </AppText>
          <AppText
            style={{
              marginHorizontal: Sizes.padding,
              alignSelf: 'flex-start',
              marginVertical: 16,
            }}>
            <AppText style={{fontWeight: '500'}}>{Strings.Time}</AppText>:{' '}
            <AppText style={{color: Colors.greyBold}}>
              {request?.updated_at}
            </AppText>
          </AppText>
          <View
            style={{
              paddingHorizontal: Sizes.padding,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            {[
              {label: Strings.Service_advisor, data: request?.name_adviser},
              {label: Strings.Phone, data: request?.phone},
            ].map((item, index) => {
              return (
                <View
                  style={{flex: 1, marginRight: index === 0 ? 12 : 0}}
                  key={item.label}>
                  <AppText
                    style={{
                      fontWeight: '500',
                      alignSelf: 'flex-start',
                      marginBottom: 4,
                    }}>
                    {item.label}
                  </AppText>
                  <TextInput
                    editable={false}
                    style={{
                      borderRadius: Sizes.border_radius,
                      width: '100%',
                      borderWidth: 1,
                      borderColor: Colors.greyThin,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      color: Colors.text,
                    }}>
                    {item.data}
                  </TextInput>
                </View>
              );
            })}
          </View>
          <View
            style={{
              borderWidth: 1,
              width: Sizes.device_width - Sizes.padding * 2,
              borderColor: Colors.greyThin,
              marginVertical: Sizes.padding,
              borderRadius: Sizes.border_radius,
              padding: 10,
              color: Colors.greyBold,
            }}>
            <AppHTML source={{html: request?.confirm}} />
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: Colors.primary,
              marginVertical: Sizes.padding,
            }}
          />
          <View style={{width: '100%'}}>
            <AppText
              style={{fontWeight: '500', paddingHorizontal: Sizes.padding}}>
              {Strings.Service}
            </AppText>
            {(listPicked || []).map((item, index, arr) => {
              return (
                <View
                  key={item.ma_vattu}
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderColor: Colors.greyThin,
                    paddingHorizontal: Sizes.padding,
                    paddingVertical: 8,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <AppText>{item.ten_vattu}</AppText>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 8,
              }}>
              <AppText
                style={{
                  fontWeight: 'bold',
                  paddingHorizontal: Sizes.padding,
                  color: Colors.primary,
                }}>
                {Strings.Estimated_total_cost}
              </AppText>
              <AppText
                style={{
                  fontWeight: 'bold',
                  paddingHorizontal: Sizes.padding,
                  color: Colors.primary,
                }}>
                {Convert.vnd(totalCost)}
              </AppText>
            </View>
          </View>
          <AppButton
            title={Strings.Booking}
            type="primary"
            style={{
              marginTop: 10,
              paddingVertical: 4,
              paddingHorizontal: 10,
              alignSelf: 'center',
              marginHorizontal: 0,
              marginRight: Sizes.width(2),
            }}
            onPress={() => {
              navigate('Booking', {
                dataBooking: {
                  ...request,
                  id_xe: request.car_id,
                  // note: request.content,
                  imageNotes: request.images,
                  image: request.images,
                  listPicked: listPicked,
                  totalServicesPiked: totalServicesPiked,
                  totalCost: totalCost,
                  date_at: request?.updated_at,
                  adviser_id: advisers.find(
                    itm => itm.name == request?.name_adviser,
                  )?.id,
                },
              });
            }}
          />
        </>
      )}
    </ScrollView>
  );
};

export default SeeRequest;
