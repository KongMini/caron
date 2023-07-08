import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, TouchableOpacity, Linking, Platform} from 'react-native';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {
  TouchableCo,
  AppInput,
  AppIcon,
  AppText,
  Loading,
  ErrorView,
  AppDropdown,
  AppImage,
  AppButton
} from '../../../elements';
import {useGetListCity} from '../../../hooks';
import {
  FetchApi,
  isIOS,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

const Search = ({}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {control, watch} = useForm({mode: 'all'});
  const idTinhThanh = watch('idTinhThanh');
  const {navigate} = useNavigation();

  const {data, isLoading} = useQuery([`getListRescue-${idTinhThanh}`], () =>
    FetchApi.listRescue(idTinhThanh),
  );

  const cities = useQuery(
    [`useGetListCityOld-${1}`],
    FetchApi.getAlltinhthanhOld,
  );

  const onCall = e => {
    const phone = e.phone;
    let phoneNumber = phone;
    if (isIOS) {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          console.log('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  const openMap = e => {
    const {latitude, longitude} = e;
    const destination = `${latitude}+${longitude}`;
    const url = Platform.select({
      android: `google.navigation:q=${destination}`,
      ios: `maps://app?daddr=${destination}`,
    });
    Linking.openURL(url).catch(() => {});
  };

  const func = [
    {
      label: Strings.Contact,
      onPress: e => onCall(e),
      icon: 'phone-call',
      type: 'Feather',
    },
    {label: Strings.Guide, onPress: e => openMap(e), icon: 'arrowright'},
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (data?._error_code === 1) {
    return <ErrorView title={data.message} />;
  }
  const LOGO = require('../../../utils/images/qrcode_scan.png');
  const api = 
    {"code": "ADasdsafdsaf",
     "name": "Màn hình ô tô", 
     "model": "2022CHCM",
      "id": 1, 
      "map": "", 
      "phone": "0246666666", 
      "updated_at": "2022-03-01 18:39:17", 
      "user_created_id": "3", 
      "user_updated_id": "3"};
  

  // const [data1, SetData1] = useState({})
  // const [dp, SetDp] = useState('false')
  const onSearch = () => {
    SetData1(api)
    SetDp('true')
    console.log(data1)
    // data._data1 = api;
    // if (!getValues().servicesSearchText) {
    //   queryClient.refetchQueries(`useGetListProduct-${1}`);
    //   return;
    // }
    // const result = await FetchApi.searchProduct(getValues().servicesSearchText);
    // if (Array.isArray(result.Data)) {
    //   queryClient.setQueryData(`useGetListProduct-${1}`, result);
    // }
  };
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20}}>
        
        <TouchableCo onPress={() => navigate('KhBaoHanh')}>
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
          hitSlop
          onPress={onSearch}
        />
      </View>

      {/* {(data._data1 || []).map((e, i) => {
        return ( */}
          <View
           
            style={{marginBottom: Sizes.padding, paddingHorizontal: 10}}>
            {/* <AppText>
              <AppText style={{fontWeight: 'bold'}}>{e.title}: </AppText>
              <AppText>{e.address}</AppText>
            </AppText>
            <AppText style={{marginVertical: 4}}>
              {Strings.Phone}: {e.phone}
            </AppText> */}
            
            <AppText>
              <AppText style={{fontWeight: 'bold'}}>Mã sản phẩm: </AppText>
              <AppText>{data1.code}</AppText>
            </AppText>
            
            <AppText>
              <AppText style={{fontWeight: 'bold'}}>Tên sản phẩm: </AppText>
              <AppText>{data1.name}</AppText>
            </AppText>

            <AppText>
              <AppText style={{fontWeight: 'bold'}}>Modal sản phẩm: </AppText>
              <AppText>{data1.model}</AppText>
            </AppText>

            <AppText>
              <AppText style={{fontWeight: 'bold'}}>Thời hạn bảo hành: </AppText>
              <AppText>{data1.address}</AppText>
            </AppText>
            
            <AppText>
              <AppText style={{fontWeight: 'bold'}}>Hạn Bảo hành: </AppText>
              <AppText>{data1.address}</AppText>
            </AppText>


          </View>
        {/* );
      })} */}
      {(dp !== '') ? <AppButton
        control={control}
        title="Kích hoạt bảo hành"
        type="primary"
        style={{paddingHorizontal: Sizes.padding, alignSelf: 'center'}}
        // onPress={handleSubmit(onSubmit)}
      
      /> : null}
    </View>
  );
};

export default Search;
