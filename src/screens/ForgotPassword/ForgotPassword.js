import React, {useState} from 'react';
import {View} from 'react-native';
import {AppContainer, AppImage, AppHeader, AppText} from '../../elements';
import {Sizes, useAppLanguage} from '../../utils';
import FormPhone from './items/FormPhone';
import OTPcode from './items/OTPcode';
import FormNewPassword from './items/FormNewPassword';
import {useForm} from 'react-hook-form';

const ForgotPassword = ({navigation}) => {
  const {control, handleSubmit, getValues, trigger, setValue} = useForm({
    mode: 'all',
  });
  const {Strings} = useAppLanguage();
  const [screen, setScreen] = useState('PHONE'); //PHONE, OTP, FORM

  const LOGO = require('../../utils/images/app_logo_2.png');

  const onGoBack = () => {
    if (screen === 'PHONE') {
      navigation.goBack();
      return;
    }
    if (screen === 'OTP') {
      setScreen('PHONE');
      return;
    }
    setScreen('PHONE');
  };

  const renderContent = () => {
    switch (screen) {
      case 'PHONE':
        return (
          <FormPhone
            setScreen={setScreen}
            control={control}
            handleSubmit={handleSubmit}
          />
        );
      case 'OTP':
        return (
          <OTPcode
            setScreen={setScreen}
            control={control}
            getValues={getValues}
            setValue={setValue}
          />
        );
      case 'FORM':
        return (
          <FormNewPassword
            setScreen={setScreen}
            control={control}
            getValues={getValues}
            trigger={trigger}
            handleSubmit={handleSubmit}
          />
        );
    }
  };

  return (
    <AppContainer>
      <AppHeader
        leftGoBack
        title={Strings.Forgot_password.replace('?', '')}
        onPressLeft={onGoBack}
      />
      <AppImage
        source={LOGO}
        style={{
          width: '75%',
          marginTop: Sizes.padding,
          alignSelf: 'center',
        }}
        resizeMode="contain"
      />
      <View style={{flex: 1}}>{renderContent()}</View>
      {/* <AppText
        style={{
          marginTop: 10,
          fontStyle: 'italic',
          alignSelf: 'center',
        }}>
        {Strings.Description_bottom_login}
      </AppText> */}
    </AppContainer>
  );
};

export default ForgotPassword;
