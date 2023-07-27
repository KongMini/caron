//import liraries
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-ui-lib';

import {
  AppButton,
  AppContainer,
  AppImage,
  AppInput,
  AppText
} from '../../../elements';
import {
  AccountService, FetchApi, ModalBase, ResetFunction,
  Sizes,
  useAppLanguage,
  useAppTheme
} from '../../../utils';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LanguageSetting } from './LanguageSetting';

export function FormLogin() {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const insert = useSafeAreaInsets();
  const {navigate} = useNavigation();

  const {control, handleSubmit} = useForm({
    mode: 'all',
  });

  const [submiting, setSubmiting] = useState(false);

  const LOGO = (Sizes.device_width < Sizes.device_height) ?
                   require('../../../utils/images/background_image_login.png') : 
                   require('../../../utils/images/app_logo_2.png');
  const account = AccountService.get();
  console.log('account', account)
  const INPUT = [
    {
      label: Strings.Phone_number,
      rules: {required: {value: true, message: Strings.This_field_is_required}},
      name: 'phone',
      keyboardType: 'number-pad',
      value: account?.user_info?.username
    },
    {
      label: Strings.Password,
      rules: {required: {value: true, message: Strings.This_field_is_required}},
      name: 'password',
      secureTextEntry: true,
      value: account?.password
    },
  ];

  const onSubmit = async data => {
    try {
      setSubmiting(true);
      const {password, phone} = data;

      const result = await FetchApi.login({
        username: phone,
        password: password,
      });
      if (result._msg_code === 1) {
        const data_account = {...result._data, ...{"password" : password}}

        AccountService.set(data_account);
        ResetFunction.resetToHome();
      } else if (
        result.message ===
        'Đăng nhập thất bại. Hãy kiểm tra lại tên đăng nhập và mật khẩu'
      ) {
        ModalBase.error({
          message: Strings.Wrong_login,
        });
      } else if (result.code >= 500) {
        ModalBase.error({
          message: Strings.Server_error,
        });
      } else {
        ModalBase.error({
          message: Strings.Have_an_error + ` (${result.code || 0})`,
        });
      }
    } catch (err) {
      console.log('err', err);
    }
    setSubmiting(false);
  };

  const onForgotPassword = () => {
    navigate('ForgotPassword');
  };
  const onCreateNewAccount = () => {
    navigate('Register');
  };
  console.log("size device_width", Sizes.device_width);
  console.log("size device_height", Sizes.device_height);
  
  return (
    <AppContainer style={{marginTop: insert.top}}>
      <KeyboardAwareScrollView automaticallyAdjustContentInsets={false}>
        {(Sizes.device_width < Sizes.device_height)? 
        <AppImage
          source={LOGO}
          style={{
            width: Sizes.device_width,
            height: (Sizes.device_width * 706) / 1208,
          }}
        />: 
        <AppImage
        source={LOGO}
        style={{
          width: Sizes.device_width,
          height: (Sizes.device_width * 106) / 1208,
        }}
        resizeMode="contain"
      />}
        <LanguageSetting />

        {INPUT.map(item => (
          <AppInput
            containerStyle={{
              paddingHorizontal: Sizes.padding * 3,
              marginBottom: 10,
            }}
            style={{borderWidth: 0}}
            inputStyle={{
              height: (Sizes.device_width < Sizes.device_height) ? 40 : Sizes.height(10),
              borderBottomWidth: 1,
              paddingLeft: 0,
              borderColor: Colors.borderColorGrey,
              paddingBottom: 2,
            }}
            eyeStyle={{right: 4, bottom:  (Sizes.device_width < Sizes.device_height) ? -14 :-30}}
            placeholderTextColor={Colors.borderColorGrey}
            key={item.name}
            placeholder={item.label}
            control={control}
            name={item.name}
            rules={item.rules}
            secureTextEntry={item.secureTextEntry}
            keyboardType={item.keyboardType}
            defaultValue={item.value}
          />
        ))}
    
        <AppButton
          style={{marginTop: Sizes.paddingTablet}}
          control={control}
          title={Strings.Login}
          type="primary"
          textSize={(Sizes.device_width < Sizes.device_height) ? Sizes.h4: Sizes.h8}
          onPress={handleSubmit(onSubmit)}
          disabled={submiting}
          // loading={submiting}
          // loading={true}
        />

        <View style={{marginVertical: (Sizes.device_width < Sizes.device_height) ?Sizes.paddingTablet * 2.5 :Sizes.paddingTablet * 0.75 }}>
          <AppButton
            control={control}
            title={Strings.Forgot_password}
            onPress={onForgotPassword}
            textSize={(Sizes.device_width < Sizes.device_height) ? Sizes.h4: Sizes.h8}
          />
        </View>
        <AppButton
          type="primary"
          style={{backgroundColor: '#202680',
                  borderColor: '#202680',
                }}
          textSize={(Sizes.device_width < Sizes.device_height) ? Sizes.h4: Sizes.h8}
          control={control}
          title={Strings.Create_new_account_caron}
          onPress={onCreateNewAccount}
        />
      </KeyboardAwareScrollView>
             
      <AppText
        style={{
          fontSize: (Sizes.device_width < Sizes.device_height) ? Sizes.h5 : Sizes.h8,
          paddingTop: (Sizes.device_width < Sizes.device_height) ? Sizes.padding : 0,
          fontStyle: 'italic',
          textAlign: 'center',
        }}>
        {Strings.Description_bottom_login}
      </AppText>
    </AppContainer>
  );
}
