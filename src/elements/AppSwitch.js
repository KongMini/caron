//import liraries
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Controller} from 'react-hook-form';

import {Sizes, useAppTheme} from '../utils';

export function AppSwitch({control, name, label, defaultValue, ...props}) {
  const {Colors} = useAppTheme();

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      render={({field: {onChange, value}}) => (
        <TouchableOpacity
          onPress={() => onChange(!value)}
          style={{
            backgroundColor: Colors.greyThin,
            height: 12,
            width: 32,
            borderRadius: 10,
            justifyContent: 'center',
          }}>
          {!value && (
            <View
              style={{
                backgroundColor: Colors.greyBold,
                width: 20,
                height: 20,
                borderRadius: 10,
              }}
            />
          )}
          {value && (
            <View
              style={{
                backgroundColor: Colors.primary,
                width: 20,
                height: 20,
                borderRadius: 10,
                alignSelf: 'flex-end',
              }}
            />
          )}
        </TouchableOpacity>
      )}
    />
  );
}
