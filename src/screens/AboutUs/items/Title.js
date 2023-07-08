//import liraries
import React from 'react';
import {View} from 'react-native';
import {AppText} from '../../../elements';
import {ComonStyle, Sizes, useAppTheme} from '../../../utils';

// create a component
const Title = () => {
  const {Colors} = useAppTheme();

  return (
    <View>
      <AppText
        style={[
          ComonStyle.bold,
          {
            fontSize: Sizes.h1,
            textAlign: 'center',
            color: Colors.primary,
          },
        ]}>
        Lupe-a product of
      </AppText>
      <View
        style={[
          ComonStyle.center,
          {
            width: Sizes.device_width,
          },
        ]}>
        <View>
          <AppText
            style={[
              ComonStyle.bold,
              {fontSize: Sizes.h1 * 3, textAlign: 'left'},
            ]}>
            Fres
          </AppText>
          <AppText
            style={[
              ComonStyle.bold,
              {
                fontSize: Sizes.h1 * 3,
                top: -Sizes.h1 * 2,
                paddingLeft: Sizes.h1 * 4,
              },
            ]}>
            Co
          </AppText>
        </View>
      </View>
    </View>
  );
};

export {Title};
