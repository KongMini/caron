import React, {useEffect} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-ui-lib';
import {
  AppContainer,
  AppDateInput,
  AppHeader,
  AppImagePickerList,
  AppRadio,
} from '../../elements';
import {Sizes, useAppLanguage, useAppTheme, useAppAccount} from '../../utils';
import {
  AppButton,
  AppCheckbox,
  AppDropdown,
  AppInput,
  AppText,
} from '../../elements';
import {useForm} from 'react-hook-form';
import moment from 'moment';
import {useGetDistrictOld, useGetListCityOld, useGetMyCar} from '../../hooks';

const BuyInsurance = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const {control, handleSubmit, trigger, setValue, watch, getValues} = useForm({
    mode: 'all',
    defaultValues: {
      // isMe: true,
      // name:
      //   account?.user_info?.first_name + ' ' + account?.user_info?.last_name,
      // phone: account?.user_info?.phone || '',
      // email: account?.user_info?.user_email,
    },
  });
  const listCity = useGetListCityOld();
  const {listDistrict} = useGetDistrictOld(control);
  const {myCar} = useGetMyCar();
  const watchCar = watch('car_id');
  const [account] = useAppAccount();

  useEffect(() => {
    setValue('isMe', true);
    setValue(
      'name',
      account?.user_info?.first_name + ' ' + account?.user_info?.last_name,
    );
    setValue('phone', account?.user_info?.phone || '');
    setValue('email', account?.user_info?.user_email);
  }, []);

  const FIELD = [
    {
      type: 'TEXT_INPUT',
      name: 'name',
      label: Strings.Person_buy_insurance,
      required: {
        validate: value =>
          getValues('isMe') || value ? true : Strings.This_field_is_required,
      },
      checkBoxLabel: Strings.Me,
      checkBoxName: 'isMe',
      onChangeData: async e => {
        if (e) {
          setValue(
            'name',
            account?.user_info?.first_name +
              ' ' +
              account?.user_info?.last_name,
          );
          setValue('phone', account?.user_info?.phone || '');
          setValue('email', account?.user_info?.user_email);
        }
        setTimeout(() => {
          trigger(['name']);
        }, 100);
      },
      col: 2,
    },
    {
      type: 'TEXT_INPUT',
      name: 'phone',
      label: Strings.Phone,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      keyboardType: 'number-pad',
      col: 2,
    },
    {
      type: 'TEXT_INPUT',
      name: 'email',
      label: Strings.Email,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      col: 2,
    },
    {
      type: 'TEXT_INPUT',
      name: 'address',
      label: Strings.Address,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      col: 2,
    },
    {
      type: 'DROPDOWN',
      name: 'city',
      dataDropDown: listCity?.data?.Data || [],
      col: 1,
      keyValueDropdown: 'ten_thanhpho',
      keyResult: 'ma_thanhpho',
      onPressChange: () => setValue('district', ''),
    },
    {
      type: 'DROPDOWN',
      name: 'district',
      defaultValue: watch('district'),
      dataDropDown: listDistrict?.Data || [],
      col: 1,
      styleItemContainer: {left: Sizes.width(52)},
      required: {
        validate: value =>
          getValues('city') || value ? true : Strings.This_field_is_required,
      },
      keyValueDropdown: 'ten_quanhuyen',
      keyResult: 'ma_quanhuyen',
      styleItemContainer: {left: Sizes.width(52)},
    },
    {
      type: 'DROPDOWN',
      name: 'car_id',
      label: Strings.My_car,
      required: {
        validate: value =>
          getValues('isAnotherCar') || value
            ? true
            : Strings.This_field_is_required,
      },
      dataDropDown: myCar?._data || [],
      keyValueDropdown: 'name',
      keyResult: 'id',
      checkBoxLabel: Strings.Another_car,
      checkBoxName: 'isAnotherCar',
      onChangeData: async e => {
        if (e) {
          setValue('car_id', '');
        }
        setTimeout(() => {
          trigger(['car_id']);
        }, 100);
      },
      key: watchCar,
      col: 2,
    },
    {
      type: 'TEXT_INPUT',
      name: 'purpose',
      label: Strings.Intended_use,
      col: 2,
    },
    {
      type: 'RADIO',
      name: 'is_pickup',
      label: Strings.Car_pickup_minivan + '?',
      dataRadio: [
        {value: 0, title: Strings.No},
        {value: 1, title: Strings.Yes},
      ],
      defaultValue: 0,
      col: 2,
    },
    {
      type: 'CHECKBOX',
      name: 'people',
      labelInside: Strings.Accident_insurance_for_drivers_and_occupants,
      dataRadio: [
        {value: 0, title: Strings.No},
        {value: 1, title: Strings.Yes},
      ],
      col: 2,
    },
    {
      type: 'DATE_PICKER',
      name: 'date_at',
      label: Strings.Duration_of_insurance,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      col: 2,
    },
    {
      type: 'IMAGE_PICKER',
      name: 'image',
      label: Strings.Image,
      inputSize: '100%',
      col: 2,
    },
  ];

  const onSubmit = e => {
    const license_plates = (myCar?._data || []).find(
      itm => itm.id == e.car_id,
    )?.license_plates;
    const cityName = (listCity?._data || []).find(
      itm => itm.ma_thanhpho == e.city,
    )?.ten_thanhpho;
    const districtName = (listDistrict?._data || []).find(
      itm => itm.ma_quanhuyen == e.district,
    )?.ten_quanhuyen;

    try {
      const item = {
        name: e.name,
        phone: e.phone,
        email: e.email,
        address: e.address,
        city: e.city,
        district: e.district,
        license_plates: license_plates,
        districtName: districtName,
        cityName: cityName,
        car_id: e.car_id,
        id_xe: e.car_id,
        is_another_car: e.isAnotherCar ? 1 : 0,
        purpose: e.purpose,
        is_pickup: e.is_pickup,
        people: e.people,
        date_at: moment(e.date_at).format('HH:mm DD-MM-YYYY'),
        image: e.image,
      };
      navigation.navigate('BuyInsuranceDetail', {data: item});
    } catch (e) {
      console.log('dsadsa', e.message);
    }
  };

  return (
    <AppContainer>
      <AppHeader
        isChild
        title={Strings.Buy_insurance.toUpperCase()}
        leftGoBack
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{paddingBottom: 200}}
        automaticallyAdjustContentInsets={false}
        showVerticalIndicator={false}>
        <View
          style={{
            margin: Sizes.padding,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}>
          {FIELD.map((item, index) => {
            const inputSize = item.inputSize || Sizes.width(43);
            return (
              <View
                key={`${index}`}
                style={{
                  justifyContent: 'center',
                  marginBottom: Sizes.padding,
                  width: item.col === 2 ? '100%' : '50%',
                }}>
                <View
                  style={{
                    width: item.col !== 2 ? inputSize : '96%',
                    alignSelf: item.col === 2 ? 'flex-start' : 'center',
                    marginLeft: item.col === 2 ? Sizes.width(2) : null,
                  }}>
                  {item.label === Strings.My_car && (
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: Colors.greyThin,
                        marginHorizontal: 10,
                        marginBottom: 10,
                      }}
                    />
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    {!!item.label && (
                      <AppText
                        style={{marginBottom: 6, color: Colors.greyBold}}>
                        {item.label}
                        {!!item.required && ' *'}
                      </AppText>
                    )}
                    {!!item.checkBoxLabel && (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AppText style={{color: Colors.greyBold}}>
                          {item.checkBoxLabel}
                        </AppText>
                        <AppCheckbox
                          control={control}
                          name={item.checkBoxName}
                          iconInactive={'checkmark-circle'}
                          onChangeData={item.onChangeData}
                        />
                      </View>
                    )}
                  </View>
                  {item.type === 'TEXT_INPUT' && (
                    <AppInput
                      control={control}
                      name={item.name}
                      rules={item.required}
                      containerStyle={{paddingHorizontal: 0}}
                      inputStyle={{
                        paddingVertical: 10,
                      }}
                      style={{
                        borderRadius: Sizes.border_radius,
                        borderColor: Colors.greyLight,
                      }}
                    />
                  )}
                  {item.type === 'DROPDOWN' && (
                    <AppDropdown
                      key={item.key}
                      rules={item.required}
                      control={control}
                      name={item.name}
                      placeholder={item.placeholder}
                      dataDropDown={item.dataDropDown}
                      defaultValue={item.defaultValue}
                      styleInput={{
                        borderWidth: Sizes.border,
                        borderRadius: Sizes.border_radius,
                        borderColor: Colors.greyLight,
                        // height: 40,
                        marginTop: 0,
                      }}
                      // itemTextStyle={{fontSize: Sizes.h5}}
                      // styleValue={{fontSize: Sizes.h5}}
                      styleItemContainer={{
                        width: inputSize,
                        ...item.styleItemContainer,
                      }}
                      keyValueDropdown={item.keyValueDropdown}
                      keyResult={item.keyResult}
                      onPressChange={item.onPressChange}
                    />
                  )}
                  {item.type === 'IMAGE_PICKER' && (
                    <AppImagePickerList
                      control={control}
                      name={item.name}
                      defaultValue={['']}
                      length={3}
                    />
                  )}
                  {item.type === 'RADIO' && (
                    <AppRadio
                      control={control}
                      name={item.name}
                      defaultValue={item.defaultValue}
                      dataRadio={item.dataRadio}
                      style={{width: '60%'}}
                    />
                  )}
                  {item.type === 'CHECKBOX' && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <AppCheckbox
                        activeColor={Colors.greyLight}
                        inactiveColor={Colors.greyLight}
                        name={item.name}
                        control={control}
                        icon="ios-checkbox-outline"
                        iconInactive="ios-square-outline"
                        type="Ionicons"
                        style={{width: undefined, paddingRight: 4}}
                      />
                      <AppText style={{color: Colors.greyBold}}>
                        {item.labelInside}
                      </AppText>
                    </View>
                  )}
                  {item.type === 'DATE_PICKER' && (
                    <AppDateInput
                      control={control}
                      name={item.name}
                      rules={item.rules}
                      style={{
                        // height: 40,
                        borderColor: Colors.greyThin,
                        alignSelf: 'center',
                        backgroundColor: Colors.background,
                      }}
                      mode="datetime"
                      maxDate={new Date('2100')}
                    />
                  )}
                </View>
              </View>
            );
          })}
        </View>
        <AppButton
          control={control}
          title={Strings.Next}
          type="primary"
          style={{
            paddingVertical: 4,
            paddingHorizontal: 10,
            alignSelf: 'center',
            marginHorizontal: 0,
            marginRight: Sizes.width(2),
          }}
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAwareScrollView>
    </AppContainer>
  );
};

export default BuyInsurance;
