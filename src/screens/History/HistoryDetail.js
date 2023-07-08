import React from 'react';
import {View, Alert, ScrollView, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {useQuery} from 'react-query';

import {
  AppContainer,
  AppHeader,
  AppIcon,
  AppImage,
  AppText,
  ErrorView,
  Loading,
} from '../../elements';
import {
  Convert,
  FetchApi,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../utils';
import dayjs from 'dayjs';

const HistoryDetail = ({navigation, route}) => {
  const {ma_donhang} = route.params.data;
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {data, isLoading} = useQuery([`history-detail-${ma_donhang}`], () =>
    FetchApi.detailHistory(ma_donhang),
  );

  const renderContent = () => {
    return (
      <>
        {(data.ServiceList || []).map((item, index) => {
          return (
            <View
              key={`${item.ma_vattu}-${index}`}
              style={{
                flexDirection: 'row',
                height: Sizes.width(34),
                borderBottomWidth: 0.8,
                borderColor: Colors.greyThin,
                alignItems: 'center',
              }}>
              <AppImage
                source={
                  item.image
                    ? {uri: item.image}
                    : require('../../utils/images/caron_placeholder.jpeg')
                }
                style={{
                  borderWidth: 1,
                  borderColor: Colors.greyThin,
                  width: Sizes.width(25),
                  height: Sizes.width(25),
                  marginHorizontal: 10,
                }}
              />
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                  alignSelf: 'flex-start',
                  marginTop: Sizes.width(3.5),
                }}>
                <AppText style={{flex: 1}}>{item.ten_vattu}</AppText>
                <View
                  style={{
                    alignSelf: 'flex-end',
                    marginBottom: Sizes.width(3.5),
                  }}>
                  {/* <AppText style={{color: Colors.primary, textAlign: 'right'}}>
                    {Strings.Accessary}: {Convert.vnd(item.accessoryCost)}
                  </AppText> */}
                  <AppText style={{color: Colors.primary, textAlign: 'right'}}>
                    {Convert.vnd(item.thanhtien)}
                  </AppText>
                </View>
              </View>
            </View>
          );
        })}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText>{Strings.All_pricce_of_services}</AppText>
          <AppText>{Convert.vnd(data?.Data?.[0]?.tongcongdichvu)}</AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText>{Strings.All_accessary}</AppText>
          <AppText>{Convert.vnd(data?.Data?.[0]?.tongphutung)}</AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText>{Strings.Sales_by_voucher}</AppText>
          <AppText>-{Convert.vnd(data?.Data?.[0]?.tienchietkhau)}</AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText>{Strings.Use_caron_wallet}</AppText>
          <AppText>-{Convert.vnd(data?.Data?.[0]?.tienvi || 0)}</AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText style={{color: Colors.primary}}>
            {Strings.Total_cost}
          </AppText>
          <AppText style={{color: Colors.primary}}>
            {Convert.vnd(data?.Data?.[0]?.tongtienthanhtoan)}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 3,
            borderBottomWidth: 3,
            borderColor: Colors.greyThin,
            paddingVertical: 20,
          }}>
          <View
            style={{
              marginLeft: 10,
              width: 20,
              height: 20,
              borderRadius: 10,
              marginRight: 4,
              borderColor: Colors.primary,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AppText
              style={{fontSize: 14, lineHeight: 16, color: Colors.primary}}>
              $
            </AppText>
          </View>
          <View style={{marginLeft: 10}}>
            <AppText style={{fontWeight: '600'}}>
              {Strings.Payment_method}
            </AppText>
            <AppText style={{marginTop: 10}}>
              {Strings[data?.Data?.[0]?.tongtienthanhtoan] || Strings.Cash}
            </AppText>
          </View>
        </View>
        <View style={{borderBottomWidth: 0.8, borderColor: Colors.greyThin}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <AppText style={{fontWeight: '600'}}>{Strings.Code_orders}</AppText>
            <AppText>
              {data?.Data?.[0]?.ma_donhang}
              <AppText
                style={{color: '#c1c1e1'}}
                onPress={() => {
                  Clipboard.setString(data?.Data?.[0]?.ma_donhang);
                  Alert.alert('', Strings.Coppied);
                }}>
                {' '}
                {Strings.Copy}
              </AppText>
            </AppText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <AppText style={{fontWeight: '600'}}>{Strings.Time}</AppText>
            <AppText>
              {data?.Data?.[0]?.giosuachua}{' '}
              {dayjs(data?.Data?.[0]?.ngaysuachua).format('DD/MM/YYYY')}
            </AppText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <AppText style={{fontWeight: '600'}}>
              {Strings.Payment_time}
            </AppText>
            <AppText>{data?.timePay}</AppText>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CaronGarages')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '47%',
              borderWidth: 0.8,
              paddingHorizontal: 10,
              paddingVertical: 6,
            }}>
            <AppIcon
              icon="questioncircleo"
              type="AntDesign"
              color={Colors.primary}
            />
            <AppText style={{marginLeft: 12}}>{Strings.Qa}</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ServiceRating', {data: data})}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '47%',
              borderWidth: 0.8,
              paddingHorizontal: 10,
              paddingVertical: 6,
            }}>
            <AppIcon icon="star" type="Entypo" color={Colors.success} />
            <AppText style={{marginLeft: 12}}>{Strings.See_review}</AppText>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const renderBeforeCall = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (data?._error_code == 1) {
      return <ErrorView title={data?.message} />;
    }
    return renderContent();
  };

  return (
    <AppContainer>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <AppHeader isChild title={Strings.Information_services} leftGoBack />
        {renderBeforeCall()}
      </ScrollView>
    </AppContainer>
  );
};

export default HistoryDetail;
