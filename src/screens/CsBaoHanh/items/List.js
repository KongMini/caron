import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {AppIcon, AppText} from '../../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme} from '../../../utils';
import { DataNull, Loading } from '../../../elements';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { Dimensions } from 'react-native';



const List = ({ data, loading}) => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const {navigate} = useNavigation();

  const Item = ({item, index, last}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomWidth: last ? 3 : 1,
          borderColor: last ? '#f5f7fb' : Colors.greyThin,
          
        }}>
        <TouchableOpacity
          onPress={() =>{

            if(item?.NgayHetBaoHanh){
              navigate('KhBaoHanh',{type: "add", data_api: data, data_search: item})
            }
            
          }}
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: Sizes.padding,
            paddingHorizontal: Sizes.padding,
          }}>
          <AppText
            style={{
              fontWeight: null,
              color:Colors.text,
            }}>
            {index + 1}. {item?.TenSanPham}
          </AppText>
          <AppText
            style={{
              fontWeight: null,
              color: Colors.text,
            }}>
            {item?.NgayHetBaoHanh ? item?.NgayHetBaoHanh.substring(10, -1) : "Chưa kích hoạt" }
          </AppText>
        </TouchableOpacity>
        {item?.NgayHetBaoHanh ? null : 
        <AppIcon
          onPress={() => {
            
            
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
              const capacity = (DeviceInfo.getTotalDiskCapacitySync() / (1000 * 1000 * 1000)).toFixed(0);
              console.log('ROM: Tổng dung lượng đĩa(GB):', capacity);

              // Lấy thông tin RAM
              const totalMemorySync = (DeviceInfo.getTotalMemorySync() / (1000 * 1000 * 1000)).toFixed(0);
              console.log('RAM: Tổng dung lượng bộ nhớ (đồng bộ) (GB):', totalMemorySync);

              // Kiểm tra thiết bị có phải tablet
              const isTablet = (Sizes.device_width > Sizes.device_height);
              console.log("isTablet: ", isTablet)

              const thongSo = "Ram:" + totalMemorySync + ",Rom:"+ capacity + ",Tablet:" + isTablet;
              console.log("Thông số", thongSo)

              if(ram == totalMemorySync && rom == capacity && isTablet){
                Alert.alert('Bạn có chắc chắn muốn kích hoạt sản phẩm ' + item?.TenSanPham + ' không?', '', [
                  {
                    text: 'Huỷ',
                    style: 'cancel',
                  },
                  {
                    text: 'Kích hoạt',
                    onPress: async () => {
                      console.log("Item", item);
                      navigate('KhBaoHanh',{type: "add" ,thongSo: thongSo ,data_api: data, data_search: item})
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
                      navigate('KhBaoHanh',{type: "add" ,thongSo: thongSo , data_api: data, data_search: item})
                      // const result = await FetchApi.deleteMyCar(item.id);
                      // if (result._msg_code == 1) {
                      //   refetch();
                      // } else {
                      //   ModalCustomServices.set({
                      //     title: Strings.Error,
                      //     titleStyle: {color: 'red'},
                      //     description: result?.message || Strings.something_wrong,
                      //   });
                      // }
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
                    navigate('KhBaoHanh',{type: "add" ,thongSo: "" , data_api: data, data_search: item})
                  },
                },
              ]);
            }
          }
        
        }
          icon="edit"
          type="FontAwesome"
          color={Colors.greyThin}
          size={Sizes.h3}
          style={{marginRight: 10}}
        />
        }
        
      </View>
    );
  };

  return (
    <View style={{paddingBottom: 50}}>
      <View style={{borderTopWidth: 1, borderColor: Colors.greyBold,}}>
        <AppText
          style={{
            paddingVertical: Sizes.padding / 2,
            fontSize: Sizes.isMobile ? Sizes.h3 : Sizes.h6,
            paddingLeft: Sizes.padding,
            color: Colors.greyBold,
            fontWeight: 'bold',
          }}>
          {Strings.Warranty_Period.toUpperCase()}
        </AppText>
      </View>

      {
      loading ? 
        <Loading />
      :
      
      (data?.length > 0) ? data.map((item, index) => {
        return (
          <Item
            key={`${item?._ukid}`}
            index={index}
            item={item}
            last={index === data.length - 1}
          />
        );
      }) : 
      <DataNull title={Strings.Not_update_yet} /> }
    </View>
  );
};

export default List;
