import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-ui-lib';
import moment from 'moment';
import { AccountService } from '../../../utils';

import {
  AppButton,
  AppDateInput,
  AppDropdown,
  AppImagePickerList,
  AppInput,
  AppText,
  Loading,
} from '../../../elements';
import {
  FetchApi,
  Sizes,
  useAppLanguage,
  useAppTheme,
  ModalBase,
} from '../../../utils';
import {YEARS} from './constants';
import {useGetAllManufacture, useGetTypeCarById} from '../../../hooks';

const MyCarForm = ({selectedCar, setSelectedCar, refetch}) => {
  const {control, handleSubmit, reset, setValue, trigger, getValues} = useForm({
    mode: 'all',
  });
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const {allManufacture, isLoadingAllManufacture} = useGetAllManufacture();
  const {allTypeCarByID, isLoadingAllTypeCarByID, isFetchingAllTypeCarByID} =
    useGetTypeCarById(control);
  // const {carColors} = useGetCarColors();

  const [submiting, setSubmiting] = useState(false);

  useEffect(() => {
    const convert = param => {
      return param ? moment(param, 'YYYY-MM-DD').format('DD-MM-YYYY') : null;
    };

    setValue('manufacturer', selectedCar?.manufacturer);
    setValue('type', selectedCar?.type);

    reset({
      ...selectedCar,
      registry_deadline: convert(selectedCar?.registry_deadline),
      civil_liability_insurance_deadline: convert(
        selectedCar?.civil_liability_insurance_deadline,
      ),
      physical_insurance_deadline: convert(
        selectedCar?.physical_insurance_deadline,
      ),
      previous_maintenance_time: convert(
        selectedCar?.previous_maintenance_time,
      ),
    });
  }, [selectedCar]);

  const FIELD = [
    {
      type: 'TEXT_INPUT',
      name: 'name',
      label: Strings.Car_name,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      col: 1,
    },
    {
      type: 'TEXT_INPUT',
      name: 'license_plates',
      label: Strings.License_plates,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      col: 1,
      autoCapitalize: 'characters',
    },
    {
      type: 'DROPDOWN',
      name: 'manufacturer',
      label: Strings.Manufacturer,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      col: 1,
      dataDropDown: allManufacture?.Data,
      keyValueDropdown: 'ten_hangxe',
      keyResult: 'ma_hangxe',
      loading: isLoadingAllManufacture,
      defaultValue: getValues().manufacturer,
      onPressChange: () => setValue('type', ''),
    },
    {
      type: 'DROPDOWN',
      name: 'type',
      label: Strings.Type_car,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      col: 1,
      styleItemContainer: {left: Sizes.width(52)},
      keyValueDropdown: 'ten_dongxe',
      keyResult: 'ma_dongxe',
      dataDropDown: allTypeCarByID?.Data || [],
      loading: isLoadingAllTypeCarByID || isFetchingAllTypeCarByID,
      defaultValue: getValues().type,
    },
    {
      type: 'DROPDOWN',
      name: 'year_of_manufacture',
      label: Strings.Year_of_manufacture,
      col: 1,
      dataDropDown: YEARS,
      defaultValue: getValues().year_of_manufacture,
    },
    {
      type: 'TEXT_INPUT',
      name: 'color',
      label: Strings.Car_color,
      col: 1,
    },
    {
      type: 'IMAGE_PICKER',
      name: 'images',
      label: Strings.Image,
      col: 2,
      inputSize: '100%',
    },
    {
      type: 'DATE_PICKER',
      name: 'registry_deadline',
      label: Strings.Registry_deadline,
    },
    {
      type: 'DATE_PICKER',
      name: 'civil_liability_insurance_deadline',
      label: Strings.Civil_liability_insurance_deadline,
    },
    {
      type: 'DATE_PICKER',
      name: 'physical_insurance_deadline',
      label: Strings.Physical_insurance_deadline,
    },
    {
      type: 'DATE_PICKER',
      name: 'previous_maintenance_time',
      label: Strings.Previous_maintenance_time,
    },
    {
      type: 'TEXT_INPUT',
      name: 'km_previous_maintenance_time',
      label: Strings.Km_previous_maintenance_time,
      styleLabel: {fontSize: Sizes.h7},
    },
  ];

  const onSubmit = async e => {
    try {
      setSubmiting(true);
      const clone = {
        ...e,
        id: selectedCar?.id,
        licensePlates: e.license_plates,
        yearOfManufacture: e.year_of_manufacture,
        registryDeadline: e.registry_deadline,
        civilLiabilityInsuranceDeadline: e.civil_liability_insurance_deadline,
        physicalInsuranceDeadline: e.physical_insurance_deadline,
        previousMaintenanceTime: e.previous_maintenance_time,
        kmPreviousMaintenanceTime: e.km_previous_maintenance_time,
      };
      if (selectedCar?.id) {
        const result = await FetchApi.updateMyCar(clone);
        console.log("result update xe:", result)
        console.log("biển số xe:", selectedCar?.license_plates)
        setSubmiting(false);
        if (result._msg_code == 1) {

          //Login
          const account = AccountService.get();


          // api Login ==============================
          const data_api1 = new URLSearchParams();
          // data_api1.append('email', account.user_info.username+ "@Caron.vn");
          data_api1.append('email', account.user_info.username);
          data_api1.append('password', account.user_info.username);

          // data_api1.append('email','tainh02@gmail.com' );
          // data_api1.append('password', 'tainh01');

          const response1 = await fetch('http://150.95.115.93:8082/api/session', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: data_api1.toString()
            }
          );
          const data1 = await response1.json();
          console.log("Login", data1)

          // Lấy list car
          const response = await fetch('http://150.95.115.93:8082/api/devices');
          const data = await response.json();
          console.log("data xe:", data)


          const elementToFind = selectedCar?.license_plates;

          const foundElement = data.find(element => element.uniqueId === elementToFind);

          if (foundElement) {
            console.log("Element found: ", foundElement);
            // Cập nhật xe
            // console.log("Element not found: ");
            // Thêm xe
            const data_api = {
              "id":foundElement?.id,
              "attributes": {"77A-123.49\\deviceImage":"device.jpeg"},
              "groupId": 0,
              "name": e.name,
              "uniqueId": e.license_plates,
              "status": "offline",
              "lastUpdate": null,
              "positionId": 0,
              "phone": account.user_info.username,
              "model": "XV20",
              "contact": "455 HQV",
              "category": "car",
              "disabled": false,
              "expirationTime": null
            };
            console.log("Data xe cập nhật", data_api)
  
            // đăng ký xe 
            const response = await fetch('http://150.95.115.93:8082/api/devices/'+ foundElement?.id, 
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data_api)
              }
            );
            const data = await response.text();
            console.log("Xe cập nhật thành công", data)

          }else{
            console.log("Element not found: ");
            // Thêm xe
            const data_api = {
              "attributes": {"77A-123.49\\deviceImage":"device.jpeg"},
              "groupId": 0,
              "name": e.name,
              "uniqueId": e.license_plates,
              "status": "offline",
              "lastUpdate": null,
              "positionId": 0,
              "phone": account.user_info.username,
              "model": "XV20",
              "contact": "455 HQV",
              "category": "car",
              "disabled": false,
              "expirationTime": null
            };
            console.log("Data xe đăng kí", data_api)
  
            // đăng ký xe 
            const response = await fetch('http://150.95.115.93:8082/api/devices', 
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data_api)
              }
            );
            const data = await response.text();
            console.log("Xe đăng ký thành công", data)
          }




          refetch();
          setSelectedCar(result._data || selectedCar);
          ModalBase.success(Strings.Edit_success);
        } else if (result.message === Strings.Car_existed) {
          ModalBase.error({message: Strings.Car_existed});
        } else {
          ModalBase.error({result: result});
        }
      } else {
        // Add xe Tracking
        const result = await FetchApi.addMyCar(clone);
        console.log("result add xe:", result)
        if (result._msg_code == 1) {
          const account = AccountService.get();


          // api Login ==============================
          const data_api1 = new URLSearchParams();
          // data_api1.append('email', account.user_info.username+ "@Caron.vn");
          data_api1.append('email', account.user_info.username);
          data_api1.append('password', account.user_info.username);

          // data_api1.append('email','tainh02@gmail.com' );
          // data_api1.append('password', 'tainh01');

          const response1 = await fetch('http://150.95.115.93:8082/api/session', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: data_api1.toString()
            }
          );
          const data1 = await response1.json();
          console.log("Login", data1)


          // api get token ======================
          const date = new Date(); // current date and time
          date.setDate(date.getDate() + 3);
          const isoString = date.toISOString();
          console.log("isoString", isoString); 

          const data_api2 = new URLSearchParams();
          data_api2.append('expiration', isoString);

          // First API call completed successfully
          const url = `http://150.95.115.93:8082/api/session/token`;
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data_api2.toString()
          };
          const response2 = await fetch(url, options);
          const data2 = await response2.text();
  



          // đata api add =======================
           const data_api = {
            "attributes": {"77A-123.49\\deviceImage":"device.jpeg"},
            "groupId": 0,
            "name": e.name,
            "uniqueId": e.license_plates,
            "status": "offline",
            "lastUpdate": null,
            "positionId": 0,
            "phone": account.user_info.username,
            "model": "XV20",
            "contact": "455 HQV",
            "category": "car",
            "disabled": false,
            "expirationTime": null
          };
          console.log("Data xe đăng kí", data_api)

          // đăng ký xe 
          const response = await fetch('http://150.95.115.93:8082/api/devices', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data_api)
            }
          );
          const data = await response.text();
          console.log("Xe đăng ký thành công", data)

          refetch();
          ModalBase.success(Strings.Add_car_success);
        } else {
          ModalBase.error({result: result});
        }
      }
    } catch (error) {
      setSubmiting(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{paddingBottom: 200}}
      automaticallyAdjustContentInsets={false}
      showVerticalIndicator={false}>
      <View style={{borderBottomWidth: 1, borderColor: Colors.primary}}>
        <AppText
          style={{
            paddingVertical: Sizes.padding / 2,
            fontSize: Sizes.h3,
            paddingLeft: Sizes.padding,
            color: Colors.greyBold,
            fontWeight: 'bold',
          }}>
          {Strings.Manage_my_car.toUpperCase()}
        </AppText>
      </View>

      <View
        style={{
          marginTop: Sizes.padding,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}>
        {FIELD.map((item, index) => {
          const inputSize = item.inputSize || Sizes.width(46);
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
                  width: inputSize,
                  alignSelf: item.col === 2 ? 'flex-start' : 'center',
                  marginLeft: item.col === 2 ? Sizes.width(2) : null,
                }}>
                <AppText style={{marginBottom: 6, ...item.styleLabel}}>
                  {item.label}
                  {!!item.required && ' *'}
                </AppText>
                {item.type === 'TEXT_INPUT' && (
                  <AppInput
                    autoCapitalize={item.autoCapitalize}
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
                {item.type === 'DATE_PICKER' && (
                  <AppDateInput
                    // defaultValue={item.data ? moment(item.data, 'DD-MM-YYYY'): ""}
                    control={control}
                    name={item.name}
                    style={{
                      // height: 38,
                      backgroundColor: Colors.background,
                      borderColor: Colors.greyLight,
                    }}
                    maxDate={new Date(moment('20-12-2099', 'DD-MM-YYYY'))}
                  />
                )}
                {item.type === 'DROPDOWN' && (
                  <AppDropdown
                    control={control}
                    name={item.name}
                    placeholder={Strings.Not_update_yet}
                    dataDropDown={item.dataDropDown}
                    defaultValue={item.defaultValue}
                    styleInput={{
                      borderWidth: Sizes.border,
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
                    rules={item.required}
                    loading={item.loading}
                    onPressChange={item.onPressChange}
                  />
                )}
                {item.type === 'IMAGE_PICKER' && (
                  <AppImagePickerList
                    control={control}
                    name={item.name}
                    length={3}
                  />
                )}
              </View>
            </View>
          );
        })}
      </View>
      <AppButton
        control={control}
        title={selectedCar ? Strings.Update_car : Strings.Create_new_car}
        type="primary"
        style={{paddingHorizontal: Sizes.padding, alignSelf: 'center'}}
        onPress={handleSubmit(onSubmit)}
        disabled={submiting}
      />
    </KeyboardAwareScrollView>
  );
};

export default MyCarForm;
