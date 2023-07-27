import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';

import {AppContainer, AppImage, AppHeader, AppText} from '../../elements';
import {Sizes, useAppLanguage, useAppTheme} from '../../utils';
import FormPhone from './items/FormPhone';
import FormRegister from './items/FormRegister';
import OTPcode from './items/OTPcode';

const Register = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {code} = useAppTheme();
  const {control, handleSubmit, getValues, trigger, setValue} = useForm({
    mode: 'all',
  });
  const [screen, setScreen] = useState('PHONE'); //PHONE, OTP, FORM

  const LOGO =
    code === 'dark'
      ? require('../../utils/images/app_logo_2_dark.png')
      : require('../../utils/images/app_logo_2.png');

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
            handleSubmit={handleSubmit}
            getValues={getValues}
            setValue={setValue}
          />
        );
      case 'FORM':
        return (
          <FormRegister
            setScreen={setScreen}
            control={control}
            handleSubmit={handleSubmit}
            getValues={getValues}
            trigger={trigger}
            navigation={navigation}
          />
        );
    }
  };

  return (
    <AppContainer>
      <AppHeader
        leftGoBack
        title={Strings.Register_by_phone}
        onPressLeft={onGoBack}
      />
      <AppImage
        source={LOGO}
        style={{
          width: '75%',
          alignSelf: 'center',
          marginVertical: Sizes.padding,
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

export default Register;
