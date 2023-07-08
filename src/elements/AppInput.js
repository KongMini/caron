//import liraries
import React, {useRef, useState} from 'react';
import {View, TextInput} from 'react-native';
import {Controller, useFormState} from 'react-hook-form';

import {Icons, IconTypes, Sizes, useAppTheme} from '../utils';

import {AppText} from './AppText';
import {AppIcon} from './AppIcon';
import {useEffect} from 'react';

export function AppInput({
  control,
  name,
  label,
  defaultValue = '',
  rules,
  placeholder,
  secureTextEntry,
  inputStyle,
  containerStyle,
  style,
  keyboardType,
  renderRight,
  editable,
  eyeStyle,
  autoCapitalize = 'none',
  focus = false,
  ...props
}) {
  const {Colors} = useAppTheme();
  const {errors} = useFormState({control, name});
  const [secure, setSecure] = useState(secureTextEntry);
  const ref = useRef();

  useEffect(() => {
    if (focus && ref.current) {
      ref.current.focus();
    }
  }, [ref.current]);

  const renderSecure = () => {
    if (!secureTextEntry) {
      return null;
    }
    let icon = Icons.Feather_eye;
    if (!secure) {
      icon = Icons.Feather_eye_off;
    }
    return (
      <AppIcon
        hitSlop
        onPress={() => {
          setSecure(!secure);
        }}
        icon={icon}
        type={IconTypes.Feather}
        style={{
          position: 'absolute',
          right: 12,
          bottom: -10,
          ...eyeStyle,
        }}
        size={Sizes.isMobile ? Sizes.h4 : Sizes.h7}
        color={Colors.primary}
      />
    );
  };
  return (
    <View style={[{paddingHorizontal: Sizes.padding}, containerStyle]}>
      {!!label && (
        <AppText style={{paddingBottom: Sizes.padding / (Sizes.isMobile ? 4 : 5)}}>{label}</AppText>
      )}
      <View
        style={[
          {
            flexDirection: 'row',
            borderWidth: Sizes.border,
            borderColor: Colors.border,
            borderRadius: Sizes.border_radius,
            alignItems: 'center',
          },
          style,
        ]}>
        <Controller
          defaultValue={defaultValue}
          name={name}
          control={control}
          rules={rules}
          render={({field: {onChange, value}}) => (
            <TextInput
              ref={ref}
              autoCapitalize={autoCapitalize}
              onChangeText={onChange}
              value={value}
              autoCorrect={false}
              spellCheck={false}
              style={[
                {
                  color: Colors.text,
                  fontSize: Sizes.isMobile ? Sizes.h5 : Sizes.h8,
                  flex: 1,
                  paddingHorizontal: Sizes.padding,
                  height:   Sizes.isMobile ? 40: 50,
                },
                inputStyle,
              ]}
              placeholderTextColor={Colors.placeholder}
              placeholder={placeholder}
              secureTextEntry={secure}
              keyboardType={keyboardType}
              editable={editable}
              {...props}
            />
          )}
        />
        {renderSecure()}
        {renderRight && renderRight()}
      </View>

      {errors[name] && errors[name].message && (
        <AppText
          style={{
            color: Colors.error,
            // paddingTop: Sizes.padding / 4,
            fontSize: Sizes.isMobile ? Sizes.h6 : Sizes.h8,
          }}>
          {errors[name].message}
        </AppText>
      )}
    </View>
  );
}
