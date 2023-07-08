import React, {useEffect, useState} from 'react';
import {Image, Linking, TouchableOpacity, View} from 'react-native';
import {AppImage} from '../../elements';
import {CheckLogic, ModalCustomServices, Sizes, useAppTheme} from '../../utils';

export default function PopupHome({data, navigation}) {
  const {Colors} = useAppTheme();
  const [size, setSize] = useState({width: Sizes.width(70), height: 0});

  useEffect(() => {
    if(data?._data?.image){ Image.getSize(data._data.image, (width, height) => {
      const ratio = width / height;
      setSize(prev => ({...prev, height: prev.width / ratio}));
    });}
   
  }, []);

  const onPressBanner = () => {
    try {
      const {is_type, screen_code, url_site} = {...data._data};
      if (is_type == 1) {
        Linking.canOpenURL(url_site)
          .then(supported => {
            if (supported) {
              return Linking.openURL(url_site);
            }
          })
          .catch(err => console.log(err));
        ModalCustomServices.close();
        return;
      }
      if (screen_code) {
        navigation.navigate(CheckLogic.Screen_code[screen_code], {});
        ModalCustomServices.close();
      }
    } catch (error) {}
  };

  return (
    <View>
      {!!data?._data?.image && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={{backgroundColor: 'transparent'}}
          onPress={onPressBanner}>
          <AppImage
            style={{
              width:(Sizes.device_width < Sizes.device_height) ? size.width : size.width,
              height: (Sizes.device_width < Sizes.device_height) ? size.height : size.height * 0.4,
              backgroundColor: 'transparent',
            }}
            source={{uri: data._data.image}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
