import React, {useState} from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-ui-lib';

import {AppButton, AppInput, AppText} from '../../../elements';
import {
  FetchApi,
  ModalBase,
  Sizes,
  useAppLanguage,
  useAppTheme,
  Validate,
} from '../../../utils';
import {useNavigation} from '@react-navigation/native';

const FormNewPassword = ({control, getValues, handleSubmit, trigger}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const [submiting, setSubmiting] = useState(false);
  const navigation = useNavigation();

  const FIELD = [
    {
      type: 'TEXT_INPUT',
      name: 'password',
      label: Strings.Password,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
        pattern: {
          value: Validate.pass,
          message: Strings.Password_failed,
        },
        validate: value => {
          trigger(['confirm_password']);
          return true;
        },
      },
      secureTextEntry: true,
    },
    {
      type: 'TEXT_INPUT',
      name: 'confirm_password',
      label: Strings.Confirm_password,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
        validate: value => {
          return getValues('password') && getValues('password') == value
            ? true
            : Strings.Is_not_same_password;
        },
      },
      secureTextEntry: true,
    },
  ];

  const onSubmit = async e => {
    const phone = getValues('phone');
    setSubmiting(true);
    const result = await FetchApi.resetPassword({
      password: e.password,
      phone: phone,
    });
    if (result._msg_code == 1) {
      ModalBase.success(Strings.Change_pass_success);
      navigation.replace('Login');
    } else {
      Alert.alert(Strings.OTP_code_wrong);
    }
    setSubmiting(false);
  };

  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={{paddingHorizontal: Sizes.padding * 1.5}}
      showVerticalIndicator={false}>
      {FIELD.map((item, index) => {
        return (
          <View key={`${index}`} style={{marginBottom: Sizes.padding}}>
            <AppText
              style={{
                fontSize: Sizes.h4,
                marginBottom: 6,
                color: item.required ? Colors.primary : null,
                fontWeight: item.required ? 'bold' : null,
              }}>
              {item.label}
              {!!item.required && ' *'}
            </AppText>
            <AppInput
              control={control}
              name={item.name}
              rules={item.required}
              style={{
                borderRadius: Sizes.border_radius,
                borderColor: item.required ? Colors.primary : null,
              }}
              containerStyle={{
                paddingHorizontal: 0,
              }}
              inputStyle={{
                backgroundColor: '#F5F7FB',
                color: 'black',
                borderRadius: Sizes.border_radius,
              }}
              secureTextEntry={item.secureTextEntry}
            />
          </View>
        );
      })}
      <AppButton
        style={{marginTop: 6}}
        control={control}
        title={Strings.Confirm}
        type="primary"
        onPress={handleSubmit(onSubmit)}
        submiting={submiting}
      />
    </KeyboardAwareScrollView>
  );
};

export default FormNewPassword;
