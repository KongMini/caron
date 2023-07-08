import React from 'react';
import {View} from 'react-native';
import {AppImage, AppText} from '../../../elements';
import {Sizes, useAppLanguage} from '../../../utils';
import {step_1_2, step_2_1} from '../../../utils/icons';

const Step = ({screen}) => {
  const {Strings} = useAppLanguage();

  let source = step_1_2;

  if (screen === 'Booking') {
    source = step_2_1;
  }

  return (
    <View
      style={{
        alignSelf: 'center',
        width: Sizes.width(80),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Sizes.padding,
      }}>
      <AppImage
        style={{width: Sizes.width(80), height: (Sizes.width(80) * 570) / 3267}}
        source={source}
        resizeMode="contain"
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {['Information', 'Booking'].map(item => {
          return (
            <AppText
              key={`${item}`}
              style={{color: '#535353', width: '25%', textAlign: 'center'}}>
              {Strings[item]}
            </AppText>
          );
        })}
      </View>
    </View>
  );
};

export default Step;
