import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-ui-lib';

import {
  AppButton,
  AppCheckbox,
  AppContainer,
  AppDateInput,
  AppDropdown,
  AppHeader,
  AppImagePickerList,
  AppInput,
  AppText,
} from '../../elements';
import {
  Convert,
  FetchApi,
  ModalBase,
  Sizes,
  useAppAccount,
  useAppLanguage,
  useAppTheme,
} from '../../utils';
import {YEARS} from '../MyCar/items/constants';
import {
  useGetAllManufacture,
  useGetDistrictOld,
  useGetListCaronGarage,
  useGetListCityOld,
  useGetMyCar,
  useGetTypeCarById,
} from '../../hooks';
import {useQuery} from 'react-query';

const CarAppraisal = ({navigation}) => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const [account] = useAppAccount();

  const [submiting, setSubmiting] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  const {control, handleSubmit, trigger, reset, setValue, getValues, watch} =
    useForm({
      mode: 'all',
      defaultValue: {},
    });
  const {myCar} = useGetMyCar();
  const watchCar = watch('id_xe');
  const gara_id = watch('gara_id');
  const listCity = useGetListCityOld();
  const {listDistrict} = useGetDistrictOld(control);
  const {allManufacture} = useGetAllManufacture();
  const {allTypeCarByID} = useGetTypeCarById(control);
  const {listCaronGarage} = useGetListCaronGarage();

  const {data, isLoading} = useQuery(`expertisePriceList`, () =>
    FetchApi.expertisePriceList(),
  );

  useEffect(() => {
    setValue('isMe', true);
    setValue(
      'name',
      account?.user_info?.first_name + ' ' + account?.user_info?.last_name,
    );
    setValue('phone', account?.user_info?.phone || '');
    setValue('email', account?.user_info?.user_email);
  }, []);
  useEffect(() => {
    if (watchCar) {
      const selectedCar = (myCar?._data || []).find(itm => itm.id == watchCar);
      setValue('licensePlates', selectedCar?.license_plates);
      setValue('type', selectedCar?.type);
      setValue('manufacturer', selectedCar?.manufacturer);
      setValue('yearOfManuFacture', selectedCar?.year_of_manufacture);
      setValue('color', selectedCar?.color);
      if (watchCar) {
        setValue('isAnotherCar', false);
      }
    }
  }, [watchCar]);
  useEffect(() => {
    if (gara_id) {
      trigger('address');
    }
  }, [gara_id]);

  const estimatedVehicleValue = watch('estimatedVehicleValue');

  const tempAppraisalCost =
    (data?._data || []).find(item => item.id == estimatedVehicleValue)?.price ||
    0;

  const FIELD = [
    {
      type: 'TEXT_INPUT',
      name: 'name',
      label: Strings.Who_bring_car,
      col: 2,
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
      col: 2,
      label: Strings.Phone,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      dataDropDown: [],
      keyboardType: 'number-pad',
    },
    {
      type: 'DROPDOWN',
      name: 'gara_id',
      label: Strings.Choose_gara,
      dataDropDown: listCaronGarage?._data || [],
      keyValueDropdown: 'title',
      keyResult: 'id',
      key: JSON.stringify(listCaronGarage),
      col: 2,
      styleItemContainer: {width: Sizes.width(88.5)},
    },
    {
      type: 'TEXT_INPUT',
      name: 'address',
      label: Strings.Place_action,
      required: !getValues('gara_id')
        ? {
            validate: value =>
              getValues('gara_id') || value
                ? true
                : Strings.This_field_is_required,
          }
        : undefined,
      col: 2,
    },
    {
      type: 'DROPDOWN',
      name: 'city',
      col: 1,
      dataDropDown: listCity?.data?.Data || [],
      col: 1,
      keyValueDropdown: 'ten_thanhpho',
      keyResult: 'ma_thanhpho',
      onPressChange: () => setValue('district', ''),
    },
    {
      type: 'DROPDOWN',
      defaultValue: watch('district'),
      name: 'district',
      col: 1,
      styleItemContainer: {left: Sizes.width(52)},
      dataDropDown: listDistrict?.Data || [],
      keyValueDropdown: 'ten_quanhuyen',
      keyResult: 'ma_quanhuyen',
    },
    {
      type: 'DROPDOWN',
      name: 'estimatedVehicleValue',
      label: Strings.Estimated_vehicle_value,
      col: 1,
      dataDropDown: data?._data || [],
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      keyValueDropdown: 'title',
      keyResult: 'id',
    },
    {
      type: 'TEXT',
      label: Strings.Provisional_appraisal_fee,
      name: 'provisionalFee',
      data: tempAppraisalCost,
      col: 1,
    },
    {
      type: 'DROPDOWN',
      name: 'id_xe',
      label: Strings.My_car,
      styleItemContainer: {width: Sizes.width(88.5)},
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
          setValue('id_xe', '');
        }
        setTimeout(() => {
          trigger(['id_xe']);
        }, 100);
      },
      col: 2,
      key: watchCar,
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
      onPressChange: () => setValue('type', ''),
    },
    {
      defaultValue: watch('type'),
      type: 'DROPDOWN',
      name: 'type',
      label: Strings.Type_car,
      col: 1,
      styleItemContainer: {left: Sizes.width(51.5)},
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
      defaultValue: watch('yearOfManuFacture'),
      name: 'yearOfManuFacture',
      label: Strings.Year_of_manufacture,
      dataDropDown: YEARS,
      data: '',
    },
    {
      type: 'TEXT_INPUT',
      name: 'color',
      label: Strings.Car_color,
    },
    {
      type: 'IMAGE_PICKER',
      name: 'file_name',
      label: Strings.Image,
      col: 2,
      inputSize: '100%',
    },
    {
      type: 'TEXT_AREA',
      name: 'note',
      label: Strings.Note,
      col: 2,
      inputSize: '100%',
    },
    {
      type: 'DATE_PICKER',
      name: 'date_at',
      label: Strings.Expected_time,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      col: 2,
    },
  ];

  const onSubmit = async e => {
    try {
      const file_name = e.file_name[0] == '' ? null : e.file_name;
      const item = {
        ...e,
        imageNotes: file_name,
        image: file_name,
        images: file_name,
        is_type: 1, //if tham dinh then = 1 else 0
        id_thamdinh: e.estimatedVehicleValue,
        tempAppraisalCost: tempAppraisalCost,
        total: tempAppraisalCost,
        appraisal_name: (data?._data || []).find(
          item => item.id == estimatedVehicleValue,
        )?.title,
        isAnotherCar: true,
        note: e.note,
        gara_id: e.gara_id,
        name: e.name,
        biensoxe: e.licensePlates,
        address: `${e.address ? e.address + ', ' : ''} ${
          e.ten_quanhuyen ? e.ten_quanhuyen + ', ' : ''
        } ${e.ten_thanhpho || ''}`,
        file_name: file_name,
      };

      setSubmiting(true);
      const result = await FetchApi.addBooking(item);
      if (result._msg_code === 1) {
        setResetForm(true);
        reset();
        ModalBase.success('Đặt hẹn thành công');
        setSubmiting(false);
        setResetForm(false);
      } else {
        ModalBase.error({result: result});
        setSubmiting(false);
      }
    } catch (error) {
      setSubmiting(false);
      ModalBase.error({message: Strings.something_wrong});
    }
  };

  return (
    <AppContainer>
      <AppHeader
        leftGoBack
        isChild
        title={Strings.Appraisal_car_title.toUpperCase()}
      />
      {!resetForm && (
        <KeyboardAwareScrollView
          contentContainerStyle={{paddingBottom: 100}}
          automaticallyAdjustContentInsets={false}
          showVerticalIndicator={false}>
          <View style={{borderBottomWidth: 1, borderColor: Colors.primary}}>
            <AppText
              style={{
                paddingVertical: Sizes.padding / 2,
                fontSize: Sizes.h6,
                paddingLeft: Sizes.padding,
                color: 'blue',
                fontWeight: 'bold',
              }}>
              {Strings.Appraisal_car_des}
            </AppText>
          </View>

          <View
            style={{
              marginTop: Sizes.padding,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              marginHorizontal: Sizes.padding,
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
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: item.col !== 2 ? inputSize : '97%',
                      alignSelf: 'center',
                    }}>
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
                        defaultValue={item.data}
                        control={control}
                        name={item.name}
                        rules={item.required}
                        containerStyle={{paddingHorizontal: 0}}
                        inputStyle={{
                          borderRadius: Sizes.border_radius,
                          paddingVertical: 10,
                        }}
                        style={{
                          borderColor: Colors.greyLight,
                        }}
                      />
                    )}
                    {item.type === 'TEXT' && (
                      <AppText
                        style={{
                          height: 40,
                          paddingTop: 10,
                          paddingLeft: Sizes.padding,
                          color: Colors.primary,
                        }}>
                        {Convert.vnd(item.data)}
                      </AppText>
                    )}
                    {item.type === 'DROPDOWN' && (
                      <AppDropdown
                        key={item.key}
                        rules={item.required}
                        control={control}
                        name={item.name}
                        placeholder={item.placeholder}
                        dataDropDown={item.dataDropDown}
                        defaultValue={item.defaultValue || ''}
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
                        defaultValue={item.data || ['']}
                        length={3}
                      />
                    )}
                    {item.type === 'TEXT_AREA' && (
                      <AppInput
                        containerStyle={{paddingHorizontal: 0, width: '100%'}}
                        control={control}
                        name={item.name}
                        placeholder={Strings.Placeholder_thamdinh}
                        rules={item.required}
                        multiline={true}
                        style={{
                          borderColor: Colors.greyLight,
                          alignItems: 'flex-start',
                          paddingVertical: 10,
                        }}
                        inputStyle={{paddingTop: 0, height: 70}}
                      />
                    )}
                    {item.type === 'DATE_PICKER' && (
                      <AppDateInput
                        control={control}
                        name={item.name}
                        rules={item.required}
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
                  </View>
                </View>
              );
            })}
          </View>
          <AppButton
            control={control}
            title={Strings.Appointment_appraisal}
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
      )}
    </AppContainer>
  );
};

export default CarAppraisal;
