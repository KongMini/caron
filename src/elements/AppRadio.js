//import liraries
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Controller} from 'react-hook-form';

import {Sizes, useAppTheme} from '../utils';
import {AppText} from '.';

const AppRadio = ({
  control,
  name,
  label,
  defaultValue,
  dataRadio,
  style,
  ...props
}) => {
  const {Colors} = useAppTheme();
  const [data, setData] = React.useState(defaultValue);
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      render={({field: {onChange, value}}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              ...style,
            }}>
            {dataRadio.map(item => {
              return (
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  key={item.value}
                  onPress={() => {
                    setData(item.value);
                    onChange(item.value);
                  }}>
                  <View
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 7,
                      borderWidth: 0.8,
                      marginRight: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item.value === data && (
                      <View
                        style={{
                          backgroundColor: 'black',
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                        }}
                      />
                    )}
                  </View>
                  <AppText>{item.title}</AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}
    />
  );
};

export {AppRadio};
