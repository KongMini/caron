import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {
  AccountService,
  FetchApi,
  ResetFunction,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';
import {TouchableCo, AppIcon, AppText} from '../../../elements';
import MMKVStorage from 'react-native-mmkv-storage';

const MenuFunctionItem = ({data}) => {
  const {Colors} = useAppTheme();

  return (
    <TouchableCo onPress={data.onPress}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: Sizes.padding * 1.2,
          marginHorizontal: Sizes.padding,
          borderBottomColor: Colors.border,
          borderBottomWidth: StyleSheet.hairlineWidth,
          justifyContent: 'space-between',
        }}>
        <AppText style={{fontSize: Sizes.h6}}>{data.label}</AppText>
        <AppIcon
          color={Colors.text}
          icon={'right'}
          type={'AntDesign'}
          size={Sizes.h8}
        />
      </View>
    </TouchableCo>
  );
};
const MenuFunction = () => {
  const navigation = useNavigation();
  const {Strings} = useAppLanguage();

  const menuList = [
    {
      label: Strings.Introduction,
      onPress: () => navigation.navigate('Introduction'),
    },
    {
      label: Strings.Find_caron_gara,
      onPress: () => navigation.navigate('CaronGarages'),
    },
    {
      label: Strings.Language,
      onPress: () => {
        navigation.navigate('LanguageSetting');
      },
    },
    {
      label: Strings.Mode,
      onPress: () => {
        navigation.navigate('ModeSetting');
      },
    },
    {
      label: Strings.Logout,
      onPress: () => {
        try {
          FetchApi.logout();
          ResetFunction.resetToLogin();
          // AccountService.set({});
          // const tag = 'fcmToken';

          // const mmkvId = `mmkv-${tag}`;
          // const mmkvKey = `key-${tag}`;

          // const MMKVwithID = new MMKVStorage.Loader()
          //   .withInstanceID(mmkvId)
          //   .initialize();

          // MMKVwithID.setMap(mmkvKey, {});
        } catch (error) {}
      },
    },
  ];

  return (
    <View>
      {menuList.map(item => {
        return <MenuFunctionItem data={item} key={item.label} />;
      })}
    </View>
  );
};

export {MenuFunction};
