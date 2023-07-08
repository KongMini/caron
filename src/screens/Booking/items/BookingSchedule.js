import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-ui-lib';

import {
  AppButton,
  AppDateInput,
  AppDropdown,
  AppInput,
  AppText,
} from '../../../elements';
import {Sizes, useAppLanguage, useAppTheme} from '../../../utils';
import {
  useGetAdviser,
  useGetDistrict,
  useGetListCaronGarage,
  useGetListCity,
} from '../../../hooks';

const BookingSchedule = ({
  control,
  setScreen,
  getValues,
  handleSubmit,
  watch,
  setValue,
  trigger,
}) => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const {listCaronGarage} = useGetListCaronGarage();
  const {listCity} = useGetListCity();
  const {listDistrict} = useGetDistrict(control);

  const [submiting, setSubmiting] = useState(false);
  const city = watch('city');
  const district = watch('district');
  const gara_id = watch('gara_id');

  useEffect(() => {
    const newAddr = (listCaronGarage?._data || []).find(
      itm => itm.id == gara_id,
    );
    if (city) {
      return;
    }
    setValue('city', newAddr?.province);
    setValue('district', newAddr?.district);
  }, [gara_id]);

  // const {advisers} = useGetAdviser(gara_id);

  let newGarages = listCaronGarage?._data || [];
  if (city && district) {
    newGarages = newGarages.filter(
      item => item.district == district && item.province == city,
    );
  }

  const FIELD = [
    {
      type: 'RADIO',
      name: 'where',
      label: Strings.Where,
    },
    {
      key: JSON.stringify(city),
      type: 'DROPDOWN',
      name: 'city',
      defaultValue: city,
      dataDropDown: listCity?._data
        ? [{ten_thanhpho: Strings.All, ma_thanhpho: ''}, ...listCity?._data]
        : [],
      col: 1,
      keyValueDropdown: 'ten_thanhpho',
      keyResult: 'ma_thanhpho',
      onPressChange: e => {
        const ten_thanhpho = (listCity?._data || []).find(
          item => item.ma_thanhpho == e,
        )?.ten_thanhpho;
        setValue('ten_thanhpho', ten_thanhpho);
        setValue('district', '');
      },
    },
    {
      type: 'DROPDOWN',
      name: 'district',
      dataDropDown: listDistrict?._data || [],
      col: 1,
      styleItemContainer: {left: Sizes.width(52)},
      keyValueDropdown: 'ten_quanhuyen',
      keyResult: 'ma_quanhuyen',
      key: JSON.stringify(listDistrict?._data),
      onPressChange: e => {
        const ten_quanhuyen = (listDistrict?._data || []).find(
          item => item.ma_quanhuyen == e,
        )?.ten_quanhuyen;
        setValue('ten_quanhuyen', ten_quanhuyen);
        setValue('gara_id', '');
      },
    },
    {
      type: 'DROPDOWN',
      name: 'gara_id',
      label: Strings.Choose_gara,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      dataDropDown: newGarages,
      keyValueDropdown: 'title',
      keyResult: 'id',
      key: JSON.stringify(listCaronGarage) + gara_id,
      onPressChange: e => {
        if (gara_id === null || gara_id === getValues().gara_id) {
          return;
        }
        setValue('promotion_id', null);
        setValue('is_type_promotion', null);
        setValue('promotion_title', null);
        setValue('promotion_price', 0);
        setValue('is_mode', null);
      },
    },
    // {
    //   type: 'DROPDOWN',
    //   name: 'adviser_id',
    //   label: Strings.Choose_advisor,
    //   dataDropDown: advisers,
    //   keyValueDropdown: 'name',
    //   keyResult: 'id',
    //   key: JSON.stringify(advisers),
    // },
    {
      type: 'DATE_PICKER',
      name: 'date_at',
      label: Strings.Expected_time,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
    },
  ];

  const onSubmit = e => {
    console.log('object', e);
    setScreen('Services');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{paddingBottom: 200}}
      automaticallyAdjustContentInsets={false}
      showVerticalIndicator={false}>
      <View
        style={{
          marginHorizontal: 30,
          marginTop: Sizes.padding,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        {FIELD.map((item, index) => {
          return (
            <View
              key={`${index}`}
              style={{
                justifyContent: 'center',
                marginBottom: Sizes.padding,
                width: item.col === 1 ? '48%' : '100%',
              }}>
              <View>
                {!!item.label && (
                  <AppText style={{marginBottom: 6, color: Colors.greyBold}}>
                    {item.label}
                    {!!item.required && ' *'}
                  </AppText>
                )}
                {item.type === 'TEXT_INPUT' && (
                  <AppInput
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
                    defaultValue={item.data || ''}
                    styleInput={{
                      borderWidth: Sizes.border,
                      borderRadius: Sizes.border_radius,
                      borderColor: Colors.greyLight,
                      height: 40,
                      marginTop: 0,
                      backgroundColor: Colors.background,
                    }}
                    itemTextStyle={{fontSize: Sizes.h5}}
                    styleValue={{fontSize: Sizes.h5}}
                    styleItemContainer={{
                      width: item.col === 1 ? '40%' : Sizes.width(100) - 61,
                      ...item.styleItemContainer,
                    }}
                    keyValueDropdown={item.keyValueDropdown}
                    keyResult={item.keyResult}
                    onPressChange={item.onPressChange}
                  />
                )}
                {item.type === 'DATE_PICKER' && (
                  <AppDateInput
                    control={control}
                    name={item.name}
                    rules={item.rules}
                    style={{
                      height: 40,
                      borderColor: Colors.greyThin,
                      alignSelf: 'center',
                      marginBottom: Sizes.padding,
                      backgroundColor: Colors.background,
                    }}
                    mode="datetime"
                    maxDate={new Date('2100')}
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

export default BookingSchedule;
