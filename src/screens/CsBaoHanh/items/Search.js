import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, TouchableOpacity, Linking, Platform} from 'react-native';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
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

  // const {data, isLoading} = useQuery([`getListRescue-${idTinhThanh}`], () =>
  //   FetchApi.listRescue(idTinhThanh),
  // );


  console.log("data_api Search", data_api)

  // const cities = useQuery(
  //   [`useGetListCityOld-${1}`],
  //   FetchApi.getAlltinhthanhOld,
  // );

  // const onCall = e => {
  //   const phone = e.phone;
  //   let phoneNumber = phone;
  //   if (isIOS) {
  //     phoneNumber = `telprompt:${phone}`;
  //   } else {
  //     phoneNumber = `tel:${phone}`;
  //   }
  //   Linking.canOpenURL(phoneNumber)
  //     .then(supported => {
  //       if (!supported) {
  //         console.log('Phone number is not available');
  //       } else {
  //         return Linking.openURL(phoneNumber);
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };

  // const openMap = e => {
  //   const {latitude, longitude} = e;
  //   const destination = `${latitude}+${longitude}`;
  //   const url = Platform.select({
  //     android: `google.navigation:q=${destination}`,
  //     ios: `maps://app?daddr=${destination}`,
  //   });
  //   Linking.openURL(url).catch(() => {});
  // };

  // const func = [
  //   {
  //     label: Strings.Contact,
  //     onPress: e => onCall(e),
  //     icon: 'phone-call',
  //     type: 'Feather',
  //   },
  //   {label: Strings.Guide, onPress: e => openMap(e), icon: 'arrowright'},
  // ];

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (data?._error_code === 1) {
  //   return <ErrorView title={data.message} />;
  // }


  // Data start
  const [dataSearch, SetDataSearch] = useState([]) 
  // const dataSearch = []

  const onSearch = async () => {
    const value_ServicesSearchText = getValues().servicesSearchText;

    if(value_ServicesSearchText !== ""){
      console.log("servicesSearchText: ", getValues().servicesSearchText)

      // const elementToFind = "8a584593-9f53-4723-be8d-7307f1d3bfd3";
      const elementToFind = value_ServicesSearchText;

      const foundElement = data_api.find(element => element.SerialBaoHanh === elementToFind);

      if (foundElement) {
        console.log("Element found: ", foundElement);
        // SetDataSearch(foundElement)
        navigate('KhBaoHanh',{type: "add", data_api: data_api, data_search: foundElement})
      } else {
        
        console.log("Element not found");
        ModalBase.success("Không tìm thấy");
        // Alert("Không tìm thấy sản phẩm")
        SetDataSearch([])
      }

    }else{
      console.log("servicesSearchText: ", "nulll")
      ModalBase.success("Không tìm thấy");
      SetDataSearch([])
    }
    

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
