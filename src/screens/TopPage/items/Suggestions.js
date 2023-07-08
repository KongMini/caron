import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import { Size } from 'react-native-ui-lib/src/components/skeletonView';
import {useQuery} from 'react-query';

import {AppButton, AppImage, AppText, TouchableCo} from '../../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme} from '../../../utils';

const Suggestions = ({isRefreshing}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const navigation = useNavigation();
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`getListMaybeYouLike-${1}`],
    () => FetchApi.getListMaybeYouLike(),
  );

  useEffect(() => {
    if (isRefreshing) {
      refetch();
    }
  }, [isRefreshing]);

  if (isLoading || isFetching) {
    return <View />;
  }

  return (
    <View>
      <AppText
        style={{
          fontWeight: 'bold',
          paddingHorizontal: Sizes.padding,
          paddingTop: 12,
        }}>
        {Strings.Maybe_you_like}
      </AppText>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {(Array.isArray(data) ? data : []).map((item, index) => {
          if (item.data_type === 'product') {
            return (
              <TouchableCo
                key={`${index}`}
                style={{width: Sizes.width((Sizes.device_width < Sizes.device_height) ? 49 : 24), marginTop: 10}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <AppImage
                    source={{
                      uri:
                        item.image ||
                        'https://chonthuonghieu.com/wp-content/uploads/listing-uploads/gallery/2020/12/cau_nang.jpg',
                    }}
                    style={{
                      width: Sizes.width((Sizes.device_width < Sizes.device_height) ? 46 : 23),
                      height: Sizes.width((Sizes.device_width < Sizes.device_height) ? 46 : 23),
                      marginVertical: 4,
                    }}
                    resizeMode="cover"
                  />
                  <AppText
                    style={{
                      alignSelf: 'flex-start',
                      marginLeft: 10,
                      paddingHorizontal: 8,
                      fontSize: (Sizes.device_width < Sizes.device_height) ? Sizes.h5 :  Sizes.h8,
                    }}>
                    {item.title}
                  </AppText>
                </View>
              </TouchableCo>
            );
          }
          if (item.data_type === 'danhSachTin') {
            return (
              <TouchableCo
                onPress={() =>
                  navigation.navigate('NewAndBlogDetail', {dataProps: item})
                }
                key={`${index}`}
                style={{width: Sizes.width((Sizes.device_width < Sizes.device_height) ? 49 : 25), marginTop: 10}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <AppImage
                    source={{
                      uri:
                        item.file_name ||
                        'https://chonthuonghieu.com/wp-content/uploads/listing-uploads/gallery/2020/12/cau_nang.jpg',
                    }}
                    style={{
                      width: Sizes.width((Sizes.device_width < Sizes.device_height) ? 46 : 23),
                      height: Sizes.width((Sizes.device_width < Sizes.device_height) ? 46 : 23),
                      marginVertical: 4,
                    }}
                    resizeMode="cover"
                  />
                  <AppText
                    style={{
                      alignSelf: 'flex-start',
                      paddingHorizontal: 8,
                      fontSize: (Sizes.device_width < Sizes.device_height) ? Sizes.h5 :  Sizes.h8,
                    }}>
                    {item.title}
                  </AppText>
                </View>
              </TouchableCo>
            );
          }
          if (item.data_type === 'danhSachKhuyenMai') {
            return (
              <TouchableCo
                onPress={() =>
                  navigation.navigate('PromotionDetail', {data: item})
                }
                key={`${index}`}
                style={{width: Sizes.width((Sizes.device_width < Sizes.device_height) ? 49 : 24), marginTop: 10}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <AppImage
                    source={{
                      uri:
                        item.image ||
                        'https://chonthuonghieu.com/wp-content/uploads/listing-uploads/gallery/2020/12/cau_nang.jpg',
                    }}
                    style={{
                      width: Sizes.width((Sizes.device_width < Sizes.device_height) ? 46 : 23),
                      height: Sizes.width((Sizes.device_width < Sizes.device_height) ? 46 : 23),
                      marginVertical: 4,
                    }}
                    resizeMode="cover"
                  />
                  <AppText
                    style={{
                      alignSelf: 'flex-start',
                      color: 'black',
                      paddingHorizontal: 8,
                      fontSize: (Sizes.device_width < Sizes.device_height) ? Sizes.h5 :  Sizes.h8,
                    }}>
                    {item.title}
                  </AppText>
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      borderWidth: 1,
                      borderRadius: Sizes.border_radius,
                      borderColor: '#FBF4DF',
                      backgroundColor: '#FBF4DF',
                      paddingHorizontal: 10,
                      marginVertical: 10,
                      marginLeft: 6,
                    }}>
                    <AppText style={{color: 'black'}}>
                      Còn{' '}
                      {dayjs(dayjs().diff(dayjs(item.end_time))).format('h')}{' '}
                      giờ
                    </AppText>
                  </View>
                </View>
              </TouchableCo>
            );
          }
        })}
      </View>
    </View>
  );
};

export default Suggestions;
