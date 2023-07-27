
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
  const [isOff, SetIsOff] = useState( false)
  const [isUpdate, SetIsUpdate] = useState(data_api?.data_search?.NgayHetBaoHanh ? true : false)
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
  

  // Qrcode
  async function Scan(dataScan){

    console.log("Data: ", dataScan)
    console.log("qrcode", data_api)
    // const elementToFind = "8a584593-9f53-4723-be8d-7307f1d3bfd3";
    // const dataScan = dataScan;

    // const foundElement = data_api.data_api.find(element => element.SerialBaoHanh === elementToFind);

    const api = 'http://apicaron.cibos.vn/api/bss/baohanh/GetMaBaoHanh?SerialBaoHanh='+dataScan;
    console.log("API", api);

    let response = await fetch(api, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data_api)
        }
      );
    let data = await response.json();
    console.log("Data", data)

    if(data.Status == 1){
      let result = data.Results;
      if(result.length > 0){
        console.log("result", result)
        console.log("SerialBaoHanh", result[0].SerialBaoHanh)
        const item = result[0];

        setValue('Code', item?.MaSoSanPham);
        setValue('ProductName',item?.TenSanPham);
        setValue('thoigian', "" +item?.SoThangBaoHanh || 0);
        setValue('hanbaohanh', item?.NgayHetBaoHanh || Strings.NotActivated)
        SetIsOff(true);
        SetIsUpdate(item?.NgayHetBaoHanh ? true : false);
        SetSerialBaoHanh(item?.SerialBaoHanh);

      }
    }else{
      console.log("Element not found");
      ModalBase.success("Mã không đúng, vui lòng quét lại");
    }
  }

  // Submit
  const Submit =  async e => {
    console.log("aaaaaaaa", e);

     // api kích hoạt bảo hành điện tử =======================
     const phone = account.user_info.phone;
     console.log("Data diện thoại", phone)

     // dữ liệu từ form
     const TenNguoiSuDung = e.name;
     const DiaChiNSD = e.address;
     const email = e.email;
     const bienSoXe = e.biensoxe;
     const khuVucNSD = e.area;

     console.log("area", khuVucNSD)

     const paramsApi = 'email='+ email + 
                      '&TenNguoiSuDung='+ TenNguoiSuDung + 
                      '&khuVucNSD='+ khuVucNSD  + 
                      '&DiaChiNSD='+ DiaChiNSD +  
                      '&bienSoXe='+ bienSoXe + 
                      '&dienThoai='+ phone+
                      '&SerialBaoHanh=' + serialBaoHanh + 
                      '&ThongSo=' + thongSo +
                      '&khacThongSo=' + data_api.khacTS;
                    ;
     
     // kích hoạt bảo hành điện tử
     console.log("api", 'http://apicaron.cibos.vn/api/bss/baohanh/KichHoatBaoHanh?' + paramsApi)

     const response = await fetch('http://apicaron.cibos.vn/api/bss/baohanh/KichHoatBaoHanh?' + paramsApi, 
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
      SetIsUpdate(true)
      // navigate('CsBaoHanh', )
    }else{
      ModalBase.success("Thất bại");
    }
  }
  
  // Update
  const Update =  async e => {
    console.log("aaaaaaaa222");

    // Lấy data từ form
    const TenNguoiSuDung = e.name;
    const DiaChiNSD = e.address;
    const DienThoaiNSD = e.phone;
    const email = e.email;
    const bienSoXe = e.biensoxe;
    const khuVucNSD = e.area;

    console.log("area", khuVucNSD)

    
    const paramsApi = 'email='+ email + 
                      '&khuVucNSD='+ khuVucNSD +  
                      '&bienSoXe='+ bienSoXe + 
                      '&TenNguoiSuDung='+ TenNguoiSuDung+
                      '&SerialBaoHanh=' + serialBaoHanh + 
                      '&DiaChiNSD=' + DiaChiNSD + 
                      '&DienThoaiNSD=' + DienThoaiNSD;
     // Update bảo hành điện tử
     console.log("api", 'http://apicaron.cibos.vn/api/bss/baohanh/UpdateNguoiSuDung?' + paramsApi)

     const response = await fetch('http://apicaron.cibos.vn/api/bss/baohanh/UpdateNguoiSuDung?' + paramsApi, 
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
      // required: {
      //   required: {value: true, message: Strings.This_field_is_required},
      // },
      // isPrimary: true,
      disabled: true,
    },

    {
      type: 'TEXT_INPUT',
      name: 'ProductName',
      label: Strings.ProductName,
      // required: {
      //   required: {value: true, message: Strings.This_field_is_required},
      // },
      // isPrimary: true,
      disabled: true,
    },
    {
      type: 'TEXT_INPUT',
      name: 'thoigian',
      label: Strings.WarrantyPeriod,
      disabled: true,
    },
    {
        type: 'TEXT_INPUT',
        name: 'hanbaohanh',
        label: Strings.EndOfWarranty,
        disabled: true,
      },
      {
        type: 'TEXT_INPUT',
        name: 'name',
        label: Strings.Name,
        defaultValue: account.user_info.first_name + " " + account.user_info.last_name,
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
    // {
    //   type: 'TEXT_INPUT',
    //   name: 'biensoxe',
    //   label: Strings.License_plates,
    //   required: {
    //     required: {value: true, message: Strings.This_field_is_required},
    //   },
    // //   isPrimary: true,
    // },
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
         required: {value: true, message: Strings.This_field_is_required},
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
                      keyResult={item.keyValueDropdown}
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

                  {isUpdate? 
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
