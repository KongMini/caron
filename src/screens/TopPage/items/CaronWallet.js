import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {AppImage, AppText} from '../../../elements';
import {Convert, Sizes, useAppLanguage, useAppTheme} from '../../../utils';

import {useGetInfoUser} from '../../../hooks';
import {eye, eyeOff} from '../../../utils/icons';

const CaronWallet = ({isRefreshing}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const [hidden, setHidden] = useState(true);
  const {profile, refetchProfile} = useGetInfoUser();

  useEffect(() => {
    if (isRefreshing) {
      refetchProfile();
    }
  }, [isRefreshing]);

  const balance = Convert.point(profile?.balance);
  // const total_money = Convert.vnd(profile?.total_money || 0, true);

  return (
    <View
      style={{
        height: (Sizes.device_width < Sizes.device_height) ? Sizes.device_height * 0.05 : Sizes.device_height * 0.08,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.padding,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderColor: Colors.borderColorGrey,
      }}>
      <View style={{flex: 1,  flexDirection: "row",}}>
        <TouchableOpacity
          style={{
            paddingVertical: (Sizes.device_width < Sizes.device_height) ? 15 : 0,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}
          onPress={() => {
            setHidden(prev => !prev);
          }}>
            
          {hidden ? (
            <AppImage
              source={eye}
              style={{width: 25, height: 25}}
              resizeMode="contain"
            />
          ) : (
            <AppImage
              source={eyeOff}
              style={{width: 25, height: 25}}
              resizeMode="contain"
            />
          )}
          <AppText style={{fontWeight: 'bold'}}>{" " + Strings.Caron_wallet}</AppText>
        </TouchableOpacity>
        
      </View>
      <AppText
        style={{
          marginTop: hidden ? Sizes.height(2) : Sizes.height(1),
          fontSize: hidden ? Sizes.h6 : Sizes.h6,
          fontWeight: '500',
          alignSelf: 'center',
        }}>
        {hidden ? '********************' : balance}
      </AppText>
    </View>
  );
};

export default CaronWallet;
