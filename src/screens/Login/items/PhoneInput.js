//import liraries
import React, {useRef} from 'react';
import {View} from 'react-native';
import {Controller, useFormState} from 'react-hook-form';
import PhoneNumberInput from 'react-native-phone-number-input';

import {ComonStyle, Sizes, useAppTheme} from '../../../utils';
import {AppText} from '../../../elements';

export function PhoneInput({
  control,
  name,
  label,
  defaultValue = '',
  rules,
  placeholder,
  containerStyle,
  defaultCode = 'SG',
}) {
  const {errors} = useFormState({control, name});
  const {Colors} = useAppTheme();

  const phoneRef = useRef(null);

  return (
    <View
      style={[
        {paddingHorizontal: Sizes.padding * 2},
        ComonStyle.center,
        containerStyle,
      ]}>
      {!!label && (
        <AppText style={{paddingBottom: Sizes.padding / 4}}>{label}</AppText>
      )}
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}}) => {
          return (
            <PhoneNumberInput
              ref={phoneRef}
              defaultCode={defaultCode}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={Colors.placeholder}
              placeholder={placeholder}
              // disableArrowIcon
              // disabled
              withShadow
              flagButtonStyle={{alignSelf: 'center'}}
              containerStyle={{width: '100%'}}
            />
          );
        }}
      />
      {errors[name] && errors[name].message && (
        <AppText
          style={{
            color: Colors.error,
            paddingTop: Sizes.padding / 4,
            fontSize: Sizes.h6,
            alignSelf: 'flex-start',
          }}>
          {errors[name].message}
        </AppText>
      )}
    </View>
  );
}
