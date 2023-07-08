import React from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit';
import {AppText} from './AppText';
import {Sizes, useAppTheme} from '../utils';

const Loading = ({style, color, sizeSpinner, loadingText}) => {
  const {Colors} = useAppTheme();

  return (
    <View
      style={[
        {
          marginTop: 40,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
        style,
      ]}>
      <Spinner
        size={sizeSpinner || 24}
        type={'Circle'}
        color={color || Colors.primary}
      />
      {!!loadingText && (
        <AppText style={{color, paddingRight: Sizes.padding / 2}}>
          {loadingText}
        </AppText>
      )}
    </View>
  );
};
export {Loading};
