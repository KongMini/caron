import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {
  appVersion,
  ComonStyle,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';
import {AppButton, AppText} from '../../../elements';

const MenuExtraItem = ({data}) => {
  const {Colors} = useAppTheme();
  return (
    <AppButton
      {...data}
      style={[
        ComonStyle.borderBottom(Colors.placeholder),
        {
          paddingVertical: Sizes.padding,
          marginHorizontal: Sizes.padding,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: Sizes.device_width - Sizes.padding * 2,
        },
        data.style,
      ]}
    />
  );
};
const MenuExtra = () => {
  const navigation = useNavigation();
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const menuList = [
    // {
    //   title: Strings.User_feedback,
    //   icon: {
    //     iconName: Icons.MaterialCommunityIcons_cellphone_message,
    //     iconType: IconTypes.MaterialCommunityIcons,
    //     iconColor: Colors.hash_color,
    //     iconSize: Sizes.h2,
    //   },
    //   onPress: () => {
    //     navigation.navigate('Web', {
    //       title: Strings.App_name,
    //       source: {
    //         uri: 'https://docs.google.com/forms/d/e/1FAIpQLSdDwss583vX0sismDVPDB-gsPAJEc7LahUyQ1XTgds_qIVbkA/viewform?usp=sf_link',
    //       },
    //     });
    //   },
    // },
    // {
    //   title: Strings.About_us,
    //   icon: {
    //     iconName: Icons.AntDesign_questioncircleo,
    //     iconType: IconTypes.AntDesign,
    //     iconSize: Sizes.h2,
    //   },
    //   onPress: () => {
    //     navigation.navigate('AboutUs');
    //   },
    // },
  ];

  return (
    <View>
      {menuList.map((item, index) => {
        return <MenuExtraItem data={item} key={`${index}`} />;
      })}
      <AppText style={{padding: Sizes.padding, color: Colors.placeholder}}>
        {Strings.Current_version} : {appVersion}
      </AppText>
    </View>
  );
};

export {MenuExtra};
