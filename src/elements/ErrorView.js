import React from 'react';
import {View, Text} from 'react-native';

import {Sizes, useAppTheme} from '../utils';
import {TouchableCo} from './TouchableCo';

const ErrorView = ({onPress, title, style}) => {
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
        <Text
          style={{
            // fontWeight: '500',
            fontSize: Sizes.h5,
            paddingHorizontal: Sizes.padding,
            color: Colors.error,
          }}>
          {title}
        </Text>
      </View>
    </TouchableCo>
  );
};
export {ErrorView};
