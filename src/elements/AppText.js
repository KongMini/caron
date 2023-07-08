import React from 'react';
import {Text, TextPropTypes} from 'react-native';
import {Sizes, useAppTheme} from '../utils';

const AppText = props => {
  const {children, style, onPress} = props;
  const {Colors} = useAppTheme();

  return (
    <Text
      {...props}
      style={[{color: Colors.text, fontSize: Sizes.h5}, style]}
      onPress={onPress}>
      {children}
    </Text>
  );
};

AppText.propTypes = {
  ...TextPropTypes,
};

export {AppText};
