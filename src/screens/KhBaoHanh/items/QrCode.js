
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, TouchableOpacity, Linking, Platform} from 'react-native';
import {useQuery} from 'react-query';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useGetListCityOld } from '../../../hooks';
import {AppText, AppButton,AppInput, AppDropdown, AppDateInput} from '../../../elements';
import { useAppLanguage, Sizes, Colors,AccountService, ModalBase } from '../../../utils';
import {KeyboardAwareScrollView} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';

const QrCode = ({data_api, data_search}) => {
  console.log(data_api)
  const [isOff, SetIsOff] = useState(false)
  const {control, setValue, handleSubmit} = useForm({mode: 'all'});
  const {Strings} = useAppLanguage();
  const listCity = useGetListCityOld();
  const [api, SetApi] = useState("")
  const {navigate} = useNavigation();

  const [serialBaoHanh, SetSerialBaoHanh] = useState(data_api?.data_search?.SerialBaoHanh || "")

  const [thongSo, SetThongSo] = useState(data_api?.thongSo || "")

  const account = AccountService.get();
  console.log("account ", account)
  useEffect(() => {
    setValue(
      'name',
      account?.user_info?.first_name + ' ' + account?.user_info?.last_name,
    );
    setValue('phone', account?.user_info?.phone || '');
    setValue('email', account?.user_info?.user_email);

    setValue('Code', data_api?.data_search?.MaSoSanPham);
    setValue('ProductName', data_api?.data_search?.TenSanPham);
    setValue('thoigian', "" + data_api?.data_search?.SoThangBaoHanh || 0);
    setValue('hanbaohanh', data_api?.data_search?.NgayHetBaoHanh || Strings.NotActivated);
  }, []);
  
  function Scan(data){

    console.log("Data: ", data)
    console.log("qrcode", data_api)
    // const elementToFind = "8a584593-9f53-4723-be8d-7307f1d3bfd3";
    const elementToFind = data;

    const foundElement = data_api.data_api.find(element => element.SerialBaoHanh === elementToFind);

    if (foundElement) {
      console.log("Element found: ", foundElement);
      // SetDataSearch(foundElement)
      // navigate('KhBaoHanh',{type: "add", data_api: data_api, data_search: foundElement})

      // useEffect(() => {
        setValue('Code', foundElement?.MaSoSanPham);
        setValue('ProductName',foundElement?.TenSanPham);
        setValue('thoigian', "" +foundElement?.SoThangBaoHanh || 0);
        setValue('hanbaohanh', foundElement?.NgayHetBaoHanh || Strings.NotActivated)
        SetIsOff(true)
        SetSerialBaoHanh(foundElement?.SerialBaoHanh)
      // }, []);

    } else {
      
      console.log("Element not found");
      ModalBase.success("Mã không đúng, vui lòng quét lại");
      // Alert("Không tìm thấy sản phẩm")
      // SetDataSearch([])
    }
  }

  // Submit
  const Submit =  async e => {
    console.log("aaaaaaaa");

     // api kích hoạt bảo hành điện tử =======================
     const phone = account.user_info.phone;
     console.log("Data diện thoại", phone)
     // kích hoạt bảo hành điện tử
     console.log("api", 'http://apicaron.cibos.vn/api/bss/baohanh/KichHoatBaoHanh?phone='+ phone+'&SerialBaoHanh=' + serialBaoHanh + '&ThongSo=' + thongSo)

     const response = await fetch('http://apicaron.cibos.vn/api/bss/baohanh/KichHoatBaoHanh?phone='+ phone+'&SerialBaoHanh=' + serialBaoHanh + '&ThongSo=' + thongSo, 
       {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(data_api)
       }
     );
     const data = await response.json();
     console.log("Data bao hanh: ", data)
     if(data.Status == 1){
      console.log("Success=========Success")
      ModalBase.success("Thành công");
      // navigate('CsBaoHanh', )
    }else{
      ModalBase.success("Thất bại");
    }
  }
  
  // Update
  const Update =  async e => {
    console.log("aaaaaaaa");

    // Lấy data từ form
    const TenNguoiSuDung = e.name;
    const DiaChiNSD = e.address;
    const DienThoaiNSD = e.phone;
     
     // Update bảo hành điện tử
     console.log("api", 'http://apicaron.cibos.vn/api/bss/baohanh/UpdateNguoiSuDung?TenNguoiSuDung='+ TenNguoiSuDung+'&SerialBaoHanh=' + serialBaoHanh + '&DiaChiNSD=' + DiaChiNSD + '&DienThoaiNSD=' + DienThoaiNSD)

     const response = await fetch('http://apicaron.cibos.vn/api/bss/baohanh/UpdateNguoiSuDung?TenNguoiSuDung='+ TenNguoiSuDung+'&SerialBaoHanh=' + serialBaoHanh + '&DiaChiNSD=' + DiaChiNSD + '&DienThoaiNSD=' + DienThoaiNSD, 
       {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(data_api)
       }
     );
     const data = await response.json();
     console.log("Data bao hanh: ", data)
     if(data.Status == 1){
      console.log("Success=========Success")
      ModalBase.success("Thành công");
      // navigate('CsBaoHanh', )
    }else{
      ModalBase.success("Thất bại");
    }
  }


  const FIELD = [
    {
      type: 'TEXT_INPUT',
      name: 'Code',
      label: Strings.ProductCode,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      isPrimary: true,
    },

    {
      type: 'TEXT_INPUT',
      name: 'ProductName',
      label: Strings.ProductName,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      isPrimary: true,
    },
    {
      type: 'TEXT_INPUT',
      name: 'model',
      label: Strings.Model,
    },
    {
      type: 'TEXT_INPUT',
      name: 'thoigian',
      label: Strings.WarrantyPeriod,
    },
    {
        type: 'TEXT_INPUT',
        name: 'hanbaohanh',
        label: Strings.EndOfWarranty,
      //   dataDropDown: [
      //     {label: 'Nam', value: 1},
      //     {label: 'Nữ', value: 0},
      //   ],
      //   keyValueDropdown: 'label',
      //   keyResult: 'value',
        // required: {
        //   required: {value: true, message: Strings.This_field_is_required},
        // },
        // isPrimary: true,
      },
      {
        type: 'TEXT_INPUT',
        name: 'name',
        label: Strings.Name,
        defaultValue: account.user_info.first_name + " " + account.user_info.last_name,
      //   dataDropDown: [
      //     {label: 'Nam', value: 1},
      //     {label: 'Nữ', value: 0},
      //   ],
      //   keyValueDropdown: 'label',
      //   keyResult: 'value',
        // required: {
        //   required: {value: true, message: Strings.This_field_is_required},
        // },
        // isPrimary: true,
      },
    {
      type: 'DROPDOWN',
      name: 'area',
      label: Strings.City,
      dataDropDown: listCity?.data?.Data || [],
      keyValueDropdown: 'ten_thanhpho',
      keyResult: 'ma_thanhpho',
    },
    {
      type: 'TEXT_INPUT',
      name: 'address',
      label: Strings.Address,
    },
    {
      type: 'TEXT_INPUT',
      name: 'phone',
      label: Strings.Phone_number,
      disabled: true,
      defaultValue: account.user_info.phone,
    //   required: {
    //     required: {value: true, message: Strings.This_field_is_required},
    //   },
    //   isPrimary: true,
    },
    {
      type: 'TEXT_INPUT',
      name: 'biensoxe',
      label: Strings.License_plates,
    //   required: {
    //     required: {value: true, message: Strings.This_field_is_required},
    //   },
    //   isPrimary: true,
    },
    {
      type: 'TEXT_INPUT',
      name: 'email',
      label: Strings.Email,
      required: {
        pattern: {
          value:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: Strings.Email_is_not_valid,
        },
      },
    },
  ];

    return (


        <View style={{ justifyContent: 'flex-start',alignItems: 'center',flex: 1,}}>

            {/* <AppWeb 
                title="Webview"
                source={'https://www.google.com/'}
               /> */}

            {(data_api.type === 'add' || isOff) ?
            null
            :
            <QRCodeScanner
            onRead={({data}) => Scan(data)}
            flashMode={RNCamera.Constants.FlashMode.auto}
            reactnative={true}
            reactnativeTimeout={500}
            cameraTimeout={10000}
            showMarker={true}
            
            />}
             {/* <AppText >{data_api.type}</AppText> */}
             {(data_api?.data_search?.MaSoSanPham || isOff) ? <KeyboardAwareScrollView
              automaticallyAdjustContentInsets={false}
              contentContainerStyle={{paddingHorizontal: Sizes.isMobile ? Sizes.padding * 1.5 : Sizes.padding * 5, marginTop:20}}
              showVerticalIndicator={false}>
              {FIELD.map((item, index) => {
              //console.log(item, index);
              return (
              <View key={`${index}`} style={{paddingBottom: 18}}>
                  <AppText
                  style={{
                      fontSize: Sizes.h4,
                      marginBottom: 6,
                      color: item.isPrimary ? Colors.primary : Colors.text,
                      fontWeight: item.isPrimary ? 'bold' : null,
                  }}>
                  {item.label}
                  {!!item.required?.required && ' *'}
                  </AppText>
                  {item.type === 'TEXT_INPUT' && (
                  <AppInput
                      control={control}
                      name={item.name}
                      rules={item.required}
                      defaultValue={item.data}
                      placeholder={item.placeholder}
                      style={{
                      borderWidth: 1,
                      borderRadius: Sizes.border_radius,
                      borderColor: item.isPrimary ? Colors.primary : Colors.text,
                      }}
                      containerStyle={{
                      paddingLeft: 0,
                      paddingRight: 0,
                      paddingVertical: 0,
                      }}
                      inputStyle={{
                      backgroundColor: Colors.background_2,
                      borderRadius: Sizes.border_radius,
                      paddingVertical: 0,
                      color: Colors.text,
                      paddingHorizontal: Sizes.padding * 1.5
                      }}
                      secureTextEntry={item.secureTextEntry}
                      editable={!item.disabled}
                  />
                  )}
                  
                  {item.type === 'DROPDOWN' && (
                  <AppDropdown
                      control={control}
                      name={item.name}
                      dataDropDown={item.dataDropDown}
                      keyValueDropdown={item.keyValueDropdown}
                      keyResult={item.keyResult}
                      styleInput={{
                      backgroundColor: Colors.background_2,
                      borderColor: item.isPrimary ? Colors.primary : Colors.text,
                      marginTop: 0,
                      }}
                      style={{borderWidth: 1}}
                      rules={item.required}
                  />
                  )}
              </View>
                      );
                  })}

                  {/* {!!errMessage && (
                      <AppText style={{textAlign: 'center', color: 'red'}}>
                      {errMessage}
                      </AppText>
                  )} */}

                  {data_api?.data_search?.NgayHetBaoHanh ? 
                   <AppButton
                   style={{marginTop: 6}}
                   control={control}
                   title={Strings.Update}
                   type="primary"
                   onPress={handleSubmit(Update)}
                   // submiting={submiting}
               />
                  : 
                  <AppButton
                      style={{marginTop: 6}}
                      control={control}
                      title={Strings.Activated}
                      type="primary"
                      onPress={handleSubmit(Submit)}
                      // submiting={submiting}
                  />
                  }
              </KeyboardAwareScrollView> : null
              }
            </View>
       
    )
}

export default QrCode;
