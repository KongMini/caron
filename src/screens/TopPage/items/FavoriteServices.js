import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';

import {AppButton, AppImage, AppText, AppWeb} from '../../../elements';
import {Sizes, Svgs, useAppLanguage, useAppTheme} from '../../../utils';
import {useFavoriteServices} from '../../FavoriteCustomization/services/CustomizeFavoriteServices';
import {configure} from '../../../utils/icons';

const FavoriteServices = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {navigate} = useNavigation();
  const {favoriteServices} = useFavoriteServices();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: Sizes.padding,
          paddingVertical: 6,
          // borderBottomWidth: 0.8,
          // borderColor: Colors.superGrey,
        }}>
        
        <AppText style={{fontWeight: 'bold'}}>{Strings.Care_car}</AppText>
        <TouchableOpacity
          onPress={() => {
            navigate('FavoriteCustomization');
          }}>
          <AppImage
            source={configure}
            style={{width: 25, height: 25}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: Sizes.padding,
        }}>
        {favoriteServices.official.map((item, index) => {
          return (
            <AppButton
              onPress={() => {
                if (item.onPress?.type === 'navigate') {
                  navigation.navigate(item.onPress.screen);
                }
              }}
              key={`${item.key}`}
              style={{
                width: (Sizes.device_width < Sizes.device_height) ? Sizes.width(100 / 3) : Sizes.width(100 / 4.1),
                marginTop: Sizes.padding,
              }}
              renderItem={() => {
                return (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    {Svgs[item.icon]()}
                    <AppText style={{marginTop: 6, textAlign: 'center', fontSize:(Sizes.device_width < Sizes.device_height) ? Sizes.h6 : Sizes.h8}}>
                      {Strings[item.key]}
                    </AppText>
                  </View>
                );
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default FavoriteServices;
