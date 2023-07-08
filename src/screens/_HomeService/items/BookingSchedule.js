import React, {useState} from 'react';
import {View, Image, Alert} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-ui-lib';

import {
  AppButton,
  AppDateInput,
  AppDropdown,
  AppIcon,
  AppInput,
  AppText,
  PickImageWithResize,
} from '../../../elements';
import {
  FetchApi,
  ModalBase,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';
import {
  useGetDistrict,
  useGetDistrictOld,
  useGetListCity,
  useGetListCityOld,
} from '../../../hooks';
import CheckboxServices from '../modules/CheckboxServices';
import {Controller, useWatch} from 'react-hook-form';

const BookingSchedule = ({
  control,
  setScreen,
  reset,
  getValues,
  setValue,
  handleSubmit,
  watch,
}) => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const listCity = useGetListCityOld();
  const {listDistrict} = useGetDistrictOld(control);

  const [submiting, setSubmiting] = useState(false);

  const FIELD = [
    {
      type: 'TEXT_INPUT',
      name: 'address',
      label: Strings.Home_address,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
    },
    {
      type: 'DROPDOWN',
      name: 'city',
      dataDropDown: listCity?.data?.Data || [],
      col: 1,
      required: {
        validate: value =>
          getValues('city') || value ? true : Strings.This_field_is_required,
      },
      keyValueDropdown: 'ten_thanhpho',
      keyResult: 'ma_thanhpho',
      onPressChange: () => setValue('district', ''),
    },
    {
      defaultValue: watch('district'),
      type: 'DROPDOWN',
      name: 'district',
      dataDropDown: listDistrict?.Data || [],
      col: 1,
      styleItemContainer: {left: Sizes.width(52)},
      required: {
        validate: value =>
          getValues('city') || value ? true : Strings.This_field_is_required,
      },
      keyValueDropdown: 'ten_quanhuyen',
      keyResult: 'ma_quanhuyen',
    },
    {
      type: 'DATE_PICKER',
      name: 'date_at',
      label: Strings.Expected_time,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
    },
    {type: 'CHECK_BOX_SERVICE', name: 'service_text'},
  ];

  const onSubmit = async e => {
    setSubmiting(true);
    const service_text = (e.service_text || []).join(', ');
    const item = {...e, service_text: service_text};
    const res = await FetchApi.addHomeService(item);
    setSubmiting(false);
    if (res._msg_code == 1) {
      ModalBase.success('Đặt hẹn thành công');
      reset();
      setValue('address', '');
      setValue('city', '');
      setValue('district', '');
      setValue('note', '');
      setScreen('Information');
    } else {
      ModalBase.error({result: res});
    }
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
                  <AppText
                    style={{
                      marginBottom: 6,
                      color: Colors.greyBold,
                    }}>
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
                    defaultValue={item.defaultValue || ''}
                    styleInput={{
                      borderWidth: Sizes.border,
                      borderColor: Colors.greyLight,
                      // height: 40,
                      marginTop: 0,
                    }}
                    // itemTextStyle={{fontSize: Sizes.h5}}
                    // styleValue={{fontSize: Sizes.h5}}
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
                      // height: 40,
                      borderColor: Colors.greyThin,
                      alignSelf: 'center',
                      marginBottom: Sizes.padding,
                      backgroundColor: Colors.background,
                    }}
                    mode="datetime"
                    maxDate={new Date('2100')}
                  />
                )}
                {item.type === 'CHECK_BOX_SERVICE' && (
                  <CheckboxServices
                    name={item.name}
                    control={control}
                    getValues={getValues}
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
      <View
        style={{marginBottom: Sizes.padding, marginHorizontal: Sizes.padding}}>
        <Images control={control} name="file_name" setValue={setValue} />
        <AppInput
          control={control}
          name={'note'}
          multiline={true}
          style={{
            paddingTop: 4,
            alignItems: 'flex-start',
            borderRadius: Sizes.border_radius,
            borderColor: Colors.greyLight,
            height: 100,
          }}
        />
      </View>
      <AppButton
        control={control}
        title={Strings.Booking_2}
        type="primary"
        style={{
          paddingVertical: 4,
          paddingHorizontal: 10,
          alignSelf: 'center',
          marginHorizontal: 0,
          marginRight: Sizes.width(2),
        }}
        onPress={handleSubmit(onSubmit)}
        disabled={submiting}
      />
    </KeyboardAwareScrollView>
  );
};

const Images = ({control, name, setValue}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const watchAll = useWatch({control});

  const onPressChooseImage = onChange => () => {
    PickImageWithResize.fromGallery(result => {
      try {
        if (result && result.err) {
          if (result.err === 'permission') {
            Alert.alert(
              Strings.Permission_not_granted,
              '',
              [
                {text: Strings.Cancel},
                {
                  text: Strings.Ok,
                  onPress: () => {
                    Linking.openSettings();
                  },
                },
              ],
              {cancelable: true},
            );
            return;
          }
          Alert.alert(result.err);
          return;
        }
        if (result && result.uri) {
          console.log('result.uri', result.uri);
          const list = watchAll[name] || [];
          list.push(result.uri);
          onChange(list);
        }
      } catch (error) {}
    });
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}}) => (
          <View
            style={{
              paddingHorizontal: Sizes.padding,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <AppText style={{marginBottom: 6}}>{Strings.Note}</AppText>
            <AppIcon
              disabled={watchAll?.[name]?.length > 2}
              icon="attachment"
              type="Entypo"
              style={{
                textAlign: 'center',
                color: Colors.greybold,
                fontSize: Sizes.h3,
              }}
              hitSlop
              onPress={onPressChooseImage(onChange)}
            />
          </View>
        )}
      />
      <View style={{flexDirection: 'row', paddingHorizontal: 6}}>
        {watchAll?.[name]?.length > 0 &&
          watchAll?.[name].map((item, index) => {
            return (
              <View key={`${index}`} style={{paddingRight: 18}}>
                <Image
                  style={{
                    width: Sizes.width(27.2),
                    height: Sizes.width(27.2),
                    borderRadius: 5,
                    marginBottom: 10,
                    marginTop: 20,
                  }}
                  source={{uri: item}}
                  resizeMode="stretch"
                />
                <AppIcon
                  styleTouch={{
                    backgroundColor: 'white',
                    borderRadius: 100,
                    position: 'absolute',
                    right: 10,
                    top: 10,
                  }}
                  icon={'closecircleo'}
                  type={'AntDesign'}
                  color={Colors.love}
                  size={Sizes.h1}
                  onPress={() => {
                    const list = watchAll[name];
                    list.splice(index, 1);
                    setValue(name, list, {shouldDirty: true});
                  }}
                />
              </View>
            );
          })}
      </View>
    </>
  );
};

export default BookingSchedule;
