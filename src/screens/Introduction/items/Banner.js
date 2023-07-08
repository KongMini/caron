//import liraries
import React from 'react';
import {View, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {useQuery} from 'react-query';

import {AppImage, TouchableCo} from '../../../elements';
import {Sizes, useAppTheme, FetchApi, CheckLogic} from '../../../utils';

export default function Banner({refreshing}) {
  const {navigate} = useNavigation();
  const {data} = useQuery('banner', FetchApi.getListBanner);
  const {Colors} = useAppTheme();

  const onPressBanner = item => () => {
    if (item.is_type == 1) {
      Linking.canOpenURL(item.url_site)
        .then(supported => {
          if (supported) {
            return Linking.openURL(item.url_site);
          }
        })
        .catch(err => console.log(err));
      return;
    }
    if (item?.screen_code) {
      navigate(CheckLogic.Screen_code[item.screen_code], {});
      return;
    }
  };

  return (
    <View
      style={{
        borderColor: Colors.greyThin,
        borderTopWidth: 4,
        borderBottomWidth: 4,
        height: Sizes.width((100 * 9) / 20),
      }}>
      <Swiper
        horizontal
        height={Sizes.width((100 * 9) / 20)}
        loop
        autoplayTimeout={4}
        autoplay
        activeDotColor={Colors.primary}
        dotColor={Colors.background}
        removeClippedSubviews={false}
        showsPagination>
        {(data?._data || []).map((item, index) => {
          return (
            <TouchableCo
              key={`${index}`}
              activeOpacity={1}
              onPress={onPressBanner(item)}>
              <AppImage
                style={{
                  width: Sizes.device_width,
                  height: Sizes.width((100 * 9) / 20),
                }}
                source={{uri: item?.image}}
              />
            </TouchableCo>
          );
        })}
      </Swiper>
    </View>
  );
}
