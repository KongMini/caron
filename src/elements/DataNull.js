import React from 'react';
import {View, Text} from 'react-native';

import {Icons, IconTypes, Sizes, useAppLanguage, useAppTheme} from '../utils';
import {AppIcon} from './AppIcon';
import {TouchableCo} from './TouchableCo';

const DataNull = ({onPress, title, style}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  return (
    <TouchableCo onPress={onPress}>
      <View
        style={[
          {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Sizes.padding,
          },
          style,
        ]}>
        <AppIcon icon={'refresh'} size={Sizes.h1 * 2} type={'MaterialIcons'} />
        <Text
          style={{
            // fontWeight: '500',
            fontSize: Sizes.h4,
            color: Colors.text,
          }}>
          {title || Strings.Empty_data}
        </Text>
      </View>
    </TouchableCo>
  );
};
export {DataNull};
