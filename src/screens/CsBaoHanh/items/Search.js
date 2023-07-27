import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, TouchableOpacity, Linking, Platform, Alert} from 'react-native';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {
  TouchableCo,
  AppInput,
  AppIcon,
  AppImage,
} from '../../../elements';
import {useGetListCity} from '../../../hooks';
import {
  FetchApi,
  isIOS,
  Sizes,
  useAppLanguage,
  useAppTheme,
  ModalBase,
} from '../../../utils';

const Search = ({data_api}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {control, watch, handleSubmit, setValue, getValues} = useForm({mode: 'all'});
  // const idTinhThanh = watch('idTinhThanh');
  const {navigate} = useNavigation();

  console.log("data_api Search", data_api)

  // Data start
  const [romDevice, SetRomDevice] = useState() 
  // const dataSearch = []

  const onSearch = async () => {
    const value_ServicesSearchText = getValues().servicesSearchText;
    const api = 'http://apicaron.cibos.vn/api/bss/baohanh/GetMaBaoHanh?SerialBaoHanh='+value_ServicesSearchText;
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
          console.log("item", item)
          if(item?.SerialBaoHanh.indexOf("MH") !== -1) {
              
            var StrSerialBaoHanh = item?.SerialBaoHanh;
            
            // Cắt chuỗi
            const ma          = StrSerialBaoHanh.slice(0, 2) ;
            const ram         = StrSerialBaoHanh.slice(2, 4) * 1.0;
            const rom         = StrSerialBaoHanh.slice(4, 7) * 1.0;
            const doPhanGiai  = StrSerialBaoHanh.slice(7, 9) * 1.0;
            const sizeManHinh = StrSerialBaoHanh.slice(9, 11) * 1.0;
            const hotro360    = StrSerialBaoHanh.slice(9, 11) * 1.0;

            // Lấy thông tin ROM
            const capacity =  Number ((DeviceInfo.getTotalDiskCapacitySync() / (1000 * 1000 * 1000)).toFixed(0));
            console.log('ROM: Tổng dung lượng đĩa(GB):', capacity);
            
            let romDevice = 0;
            if(capacity < 32) romDevice = 32;
            else if(capacity < 64) romDevice = 64;
            else if(capacity < 128) romDevice = 128;
            else romDevice = 256;
            
            console.log('SetRomDevice:', romDevice);

            // Lấy thông tin RAM
            const totalMemorySync = (DeviceInfo.getTotalMemorySync() / (1000 * 1000 * 1000)).toFixed(0);
            console.log('RAM: Tổng dung lượng bộ nhớ (đồng bộ) (GB):', totalMemorySync);

            // Kiểm tra thiết bị có phải tablet
            const isTablet = (Sizes.device_width > Sizes.device_height);
            console.log("isTablet: ", isTablet)
            

            const thongSo = "Ram:" + totalMemorySync + ",Rom:"+ romDevice + ",Tablet:" + isTablet + ",width:" + Sizes.device_width.toFixed(0)  + ",height:" + Sizes.device_height.toFixed(0);
            console.log("Thông số", thongSo)

            

            if(ram == totalMemorySync && rom == romDevice && isTablet){
              Alert.alert('Bạn có chắc chắn muốn kích hoạt sản phẩm ' + item?.TenSanPham + ' không?', '', [
                {
                  text: 'Huỷ',
                  style: 'cancel',
                },
                {
                  text: 'Kích hoạt',
                  onPress: async () => {
                    console.log("Item", item);
                    navigate('KhBaoHanh',{type: "add" ,thongSo: thongSo , data_search: item, khacTS:0})
                  },
                },
              ]);
            }else{

              Alert.alert('Bạn có chắc chắn muốn kích hoạt sản phẩm màn hình này trên khi không đúng thông số kĩ thuật không?', '', [
                {
                  text: 'Huỷ',
                  style: 'cancel',
                },
                {
                  text: 'Kích hoạt',
                  onPress: async () => {
                    console.log("Item", item);
                    navigate('KhBaoHanh',{type: "add" ,thongSo: thongSo , data_search: item, khacTS:1})
                  },
                },
              ]);
            }
          }else{
            Alert.alert('Bạn có chắc chắn muốn kích hoạt sản phẩm ' + item?.TenSanPham + ' không?', '', [
              {
                text: 'Huỷ',
                style: 'cancel',
              },
              {
                text: 'Kích hoạt',
                onPress: async () => {
                  console.log("Item", item);
                  navigate('KhBaoHanh',{type: "add" ,thongSo: "" , data_search: item})
                },
              },
            ]);
          }


        }else{
          console.log("Element not found");
          ModalBase.success("Không tìm thấy");
        }
      }else{
        console.log("Element not found");
        ModalBase.error("Không tìm thấy");
      }
      // console.log("Re")

    // if(value_ServicesSearchText !== ""){
    //   console.log("servicesSearchText: ", getValues().servicesSearchText)

    //   // const elementToFind = "8a584593-9f53-4723-be8d-7307f1d3bfd3";
    //   const elementToFind = value_ServicesSearchText;

    //   const foundElement = data_api.find(element => element.SerialBaoHanh === elementToFind);

    //   if (foundElement) {
    //     console.log("Element found: ", foundElement);
    //     // SetDataSearch(foundElement)
    //     navigate('KhBaoHanh',{type: "add", data_api: data_api, data_search: foundElement})
    //   } else {
        
        // console.log("Element not found");
        // ModalBase.success("Không tìm thấy");
        // // Alert("Không tìm thấy sản phẩm")
    //     SetDataSearch([])
    //   }

    // }else{
    //   console.log("servicesSearchText: ", "nulll")
    //   ModalBase.success("Không tìm thấy");
    //   SetDataSearch([])
    // }
    

    // if (!getValues().servicesSearchText) {
    //   queryClient.refetchQueries(`useGetListProduct-${1}`);
    //   return;
    // }
    // const result = await FetchApi.searchProduct(getValues().servicesSearchText);
    // if (Array.isArray(result.Data)) {
    //   queryClient.setQueryData(`useGetListProduct-${1}`, result);
    // }
  };

  const LOGO = require('../../../utils/images/qrcode_scan.png');
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20}}>
        
        <TouchableCo onPress={() => navigate('KhBaoHanh', {type: "qrcode", data_api: data_api, data_search: []})}>
        <AppImage
          
          source={LOGO}
          style={{
            width: 34,
            height: 34,
          }}
        />
        </TouchableCo>
        <AppInput
          style={{borderColor: Colors.greyThin}}
          control={control}
          name="servicesSearchText"
          containerStyle={{paddingHorizontal: 10, width: Sizes.width(75)}}
          inputStyle={{height: 34, paddingVertical: 0}}
          
        />
        <AppIcon
          icon={'search'}
          type={'Fontisto'}
          styleTouch={{flex: 1, alignItems: 'flex-start'}}
          style={{
            textAlign: 'center',
            color: '#c1c1c1',
            fontSize: Sizes.isMobile ? Sizes.h2 : Sizes.h1 * 0.6 ,
          }}
          // hitSlop
          onPress={onSearch}
        />
      </View>

      {/* {(dataSearch|| []).map((e, i) => { */}
        {/* return ( */}
          <View
            // key={`${e.id}`}
            style={{marginBottom: Sizes.padding, paddingHorizontal: 10}}>
            {/* <AppText>
              <AppText style={{fontWeight: 'bold'}}>{e.title}: </AppText>
              <AppText>{e.address}</AppText>
            </AppText>
            <AppText style={{marginVertical: 4}}>
              {Strings.Phone}: {e.phone}
            </AppText> */}
            
            {/* <AppText>
              <AppText style={{fontWeight: 'bold'}}>Mã sản phẩm: </AppText>
              <AppText>{dataSearch ? dataSearch.MaSanPham : null}</AppText>
            </AppText>
            
            <AppText>
              <AppText style={{fontWeight: 'bold'}}>Tên sản phẩm: </AppText>
              <AppText>{dataSearch ? dataSearch.TenSanPham : null}</AppText>
            </AppText>

            <AppText>
              <AppText style={{fontWeight: 'bold'}}>Modal sản phẩm: </AppText>
              <AppText>{dataSearch ? dataSearch.address : null}</AppText>
            </AppText>

            <AppText>
              <AppText style={{fontWeight: 'bold'}}>Thời hạn bảo hành: </AppText>
              <AppText>{dataSearch ? dataSearch.SoThangBaoHanh : null} </AppText>
            </AppText>
            
            <AppText>
              <AppText style={{fontWeight: 'bold'}}>Hạn Bảo hành: </AppText>
              <AppText>{dataSearch ? dataSearch.SoThangBaoHanh : null}</AppText>
            </AppText> */}

            {/* <AppButton
              // control={control}
              title="Kích hoạt bảo hành"
              type="primary"
              style={{paddingHorizontal: Sizes.padding, alignSelf: 'center'}}
              // onPress={navigate('KhBaoHanh',{type: "add", data_api: dataSearch})}
              // disabled={submiting}
            /> */}
          </View>
        {/* ); 
      // })}*/}
     
    </View>
  );
};

export default Search;
