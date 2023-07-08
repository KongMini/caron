import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-ui-lib';

import {
  AppButton,
  AppCheckbox,
  AppDropdown,
  AppInput,
  AppText,
} from '../../../elements';
import {
  useGetAllManufacture,
  useGetMyCar,
  useGetTypeCarById,
} from '../../../hooks';
import {
  Sizes,
  useAppAccount,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';
import {YEARS} from '../../MyCar/items/constants';

const Information = ({
  control,
  setScreen,
  handleSubmit,
  getValues,
  setValue,
  trigger,
  watch,
}) => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const {allManufacture} = useGetAllManufacture();
  const {allTypeCarByID} = useGetTypeCarById(control);
  const [account] = useAppAccount();
  const {myCar} = useGetMyCar();
  const watchCar = watch('id_xe');

  const [submiting, setSubmiting] = useState(false);

  const FIELD = [
    {
      type: 'TEXT_INPUT',
      name: 'name',
      label: Strings.Who_bring_car,
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
          trigger(['name', 'phone']);
        }, 100);
      },
    },
    {
      type: 'TEXT_INPUT',
      name: 'phone',
      label: Strings.Phone,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      dataDropDown: [],
      keyboardType: 'number-pad',
    },
    {
      type: 'DROPDOWN',
      name: 'id_xe',
      label: Strings.My_car,
      keyValueDropdown: 'name',
      keyResult: 'id',
      required: {
        validate: value =>
          getValues('isAnotherCar') || value
            ? true
            : Strings.This_field_is_required,
      },
      checkBoxLabel: Strings.Another_car,
      checkBoxName: 'isAnotherCar',
      dataDropDown: myCar?._data || [],
      onChangeData: async e => {
        if (e) {
          await setValue('id_xe', '');
        }
        setTimeout(() => {
          trigger(['id_xe']);
        }, 100);
      },
      key: watchCar,
    },
    {
      type: 'TEXT_INPUT',
      name: 'licensePlates',
      label: Strings.License_plates,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      autoCapitalize: 'characters',
    },
    {
      defaultValue: watch('manufacturer'),
      type: 'DROPDOWN',
      name: 'manufacturer',
      label: Strings.Manufacturer,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      dataDropDown: allManufacture?.Data || [],
      keyValueDropdown: 'ten_hangxe',
      keyResult: 'ma_hangxe',
    },
    {
      defaultValue: watch('type'),
      type: 'DROPDOWN',
      name: 'type',
      label: Strings.Type_car,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      keyValueDropdown: 'ten_dongxe',
      keyResult: 'ma_dongxe',
      dataDropDown: allTypeCarByID?.Data || [],
      required: {
        required: {value: true, message: Strings.This_field_is_required},
        validate: value =>
          getValues('manufacturer') || value
            ? true
            : Strings.This_field_is_required,
      },
    },
    {
      type: 'DROPDOWN',
      name: 'yearOfManuFacture',
      label: Strings.Year_of_manufacture,
      dataDropDown: YEARS,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      defaultValue: watch('yearOfManuFacture'),
    },
    {
      type: 'TEXT_AREA',
      name: 'note',
      label: Strings.Note,
    },
  ];

  useEffect(() => {
    if (watchCar) {
      const selectedCar = (myCar?._data || []).find(itm => itm.id == watchCar);
      setValue('licensePlates', selectedCar?.license_plates);
      setValue('type', selectedCar?.type);
      setValue('manufacturer', selectedCar?.manufacturer);
      setValue('yearOfManuFacture', selectedCar?.year_of_manufacture);
      if (watchCar) {
        setValue('isAnotherCar', false);
      }
    }
  }, [watchCar]);

  const onSubmit = e => {
    setScreen('Booking_2');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{paddingBottom: 200}}
      automaticallyAdjustContentInsets={false}
      showVerticalIndicator={false}>
      <View style={{marginHorizontal: 30, marginTop: Sizes.padding}}>
        {FIELD.map((item, index) => {
          return (
            <View
              key={`${index}`}
              style={{
                justifyContent: 'center',
                marginBottom: Sizes.padding,
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <AppText style={{marginBottom: 6, color: Colors.greyBold}}>
                    {item.label}
                    {!!item.required && ' *'}
                  </AppText>
                  {!!item.checkBoxLabel && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    autoCapitalize={item.autoCapitalize}
                    defaultValue={item.data}
                    control={control}
                    name={item.name}
                    rules={item.required}
                    containerStyle={{paddingHorizontal: 0, width: '100%'}}
                    inputStyle={{paddingVertical: 10}}
                    style={{
                      borderRadius: Sizes.border_radius,
                      borderColor: Colors.greyLight,
                    }}
                    keyboardType={item.keyboardType}
                  />
                )}
                {item.type === 'TEXT_AREA' && (
                  <AppInput
                    containerStyle={{paddingHorizontal: 0, width: '100%'}}
                    control={control}
                    name={item.name}
                    rules={item.required}
                    multiline={true}
                    style={{
                      paddingTop: 4,
                      alignItems: 'flex-start',
                      borderRadius: Sizes.border_radius,
                      borderColor: Colors.greyLight,
                      height: 100,
                    }}
                  />
                )}
                {item.type === 'DROPDOWN' && (
                  <AppDropdown
                    key={item.key}
                    control={control}
                    name={item.name}
                    rules={item.required}
                    dataDropDown={item.dataDropDown}
                    defaultValue={item.defaultValue || ''}
                    styleInput={{
                      borderWidth: Sizes.border,
                      borderRadius: Sizes.border_radius,
                      borderColor: Colors.greyLight,
                      // height: 40,
                      marginTop: 0,
                      backgroundColor: Colors.background,
                    }}
                    // itemTextStyle={{fontSize: Sizes.h5}}
                    // styleValue={{fontSize: Sizes.h5}}
                    styleItemContainer={{
                      width: Sizes.width(100) - 61,
                    }}
                    keyValueDropdown={item.keyValueDropdown}
                    keyResult={item.keyResult}
                  />
                )}
              </View>
              {item.label === Strings.Phone && (
                <View
                  style={{
                    borderBottomWidth: 1,
                    paddingBottom: 16,
                    borderColor: Colors.greyThin,
                    marginHorizontal: 10,
                  }}
                />
              )}
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
        submiting={submiting}
      />
    </KeyboardAwareScrollView>
  );
};

export default Information;
