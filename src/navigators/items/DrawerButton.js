import React from 'react';

import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native';
import {AppImage} from '../../elements';
import {menu} from '../../utils/icons';

export function DrawerButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.toggleDrawer();
      }}>
      <AppImage source={menu} style={{width: 24, height: 24}} />
    </TouchableOpacity>
  );
}
