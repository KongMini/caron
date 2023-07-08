import React, {useState} from 'react';
import {View, Alert, ScrollView} from 'react-native';

import {
  AppButton,
  AppText,
  AppImage,
  AppContainer,
  AppHeader,
} from '../../elements';
import {
  FetchApi,
  ModalBase,
  ResetFunction,
  Sizes,
  useAppLanguage,
} from '../../utils';

const Cost = ({navigation, route}) => {
  const {Strings} = useAppLanguage();
  const [submiting, setSubmiting] = useState(false);
  const {data} = route.params;

  const onSubmit = async () => {
    setSubmiting(true);
    const result = await FetchApi.buyInsurrance(data);
    setSubmiting(false);
    if (result._msg_code === 1) {
      Alert.alert('', Strings.Ordered_success, [
        {text: 'OK', onPress: () => ResetFunction.resetToHome()},
      ]);
    } else {
      ModalBase.error({
        message: 'Có lỗi xảy ra vui lòng thực hiện lại hoặc liên lạc với CarOn',
      });
    }
  };

  return (
    <AppContainer>
      <AppHeader isChild leftGoBack title={Strings.Buy_insurance} />
      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        automaticallyAdjustContentInsets={false}
        showVerticalIndicator={false}>
        {[
          {label: Strings.Name, value: data.name},
          {label: Strings.Phone, value: data.phone},
          {label: Strings.Email, value: data.email},
          {
            label: Strings.Address,
            value: `${data.address}${data.cityName ? '-' + data.cityName : ''}${
              data.districtName ? '-' + data.districtName : ''
            }`,
          },
          {
            label: Strings.Xe,
            value: data.license_plates,
          },
          {label: Strings.Intended_use, value: data.purpose},
          {
            label: Strings.Car_pickup_minivan,
            value: data.is_pickup ? Strings.Yes : Strings.No,
          },
          {
            label: Strings.Accident_insurance_for_drivers_and_occupants,
            value: data.people ? Strings.Yes : Strings.No,
          },
          {label: Strings.Duration_of_insurance, value: data.date_at},
        ].map((item, index) => {
          return (
            <View
              key={`${index}`}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: Sizes.padding,
                paddingBottom: 0,
              }}>
              <AppText style={{flex: 1}}>{item.label}</AppText>
              <AppText style={{flex: 2, textAlign: 'right'}}>
                {item.value}
              </AppText>
            </View>
          );
        })}

        {(data.image || []).map((item, index) => {
          return (
            <AppImage
              key={`${index}`}
              source={{uri: item}}
              style={{marginHorizontal: Sizes.padding, marginTop: 10}}
            />
          );
        })}

        <View
          style={{
            marginTop: 10,
            borderTopWidth: 6,
            borderBottomWidth: 6,
            borderColor: '#F5F7FB',
          }}
        />

        <AppButton
          disabled={submiting}
          title={Strings.Ordered}
          type="primary"
          style={{
            marginTop: 20,
            paddingVertical: 4,
            paddingHorizontal: 10,
            alignSelf: 'center',
            marginHorizontal: 0,
            marginRight: Sizes.width(2),
          }}
          onPress={onSubmit}
        />
      </ScrollView>
    </AppContainer>
  );
};

export default Cost;
