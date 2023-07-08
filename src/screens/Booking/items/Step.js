import React from 'react';
import {View} from 'react-native';
import {AppImage, AppText} from '../../../elements';
import {Sizes, useAppLanguage, useAppTheme} from '../../../utils';
import {
  step_1_2_3_4,
  step_2_1_3_4,
  step_3_1_2_4,
  step_4_1_2_3,
} from '../../../utils/icons';

const Step = ({screen}) => {
  const {Strings} = useAppLanguage();
  const {code} = useAppTheme()

  let source = step_1_2_3_4;

  if (screen === 'Booking_2') {
    source = step_2_1_3_4;
  }
  if (screen === 'Services' || screen === 'Add_services') {
    source = step_3_1_2_4;
  }
  if (screen === 'Cost' || screen === 'PromotionList') {
    source = step_4_1_2_3;
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
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {['Information', 'Booking_2', 'Service', 'Cost'].map(item => {
          return (
            <AppText
              key={`${item}`}
              style={{color: code ==='dark' ? 'white' :'#535353' , width: '25%', textAlign: 'center'}}>
              {Strings[item]}
            </AppText>
          );
        })}
      </View>
    </View>
  );
};

export default Step;
