import React, {useState, useRef} from 'react';

import {AppConfirmCodeInput} from '../../../elements/AppConfirmCodeInput';
import {AppText, AppButton} from '../../../elements';
import {Sizes, useAppLanguage, useAppTheme, FetchApi} from '../../../utils';
import {Alert} from 'react-native';

const OTPcode = ({setScreen, getValues, setValue}) => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const otpCode = useRef();
  const [submiting, setSubmiting] = useState(false);

  const onChange = e => {
    otpCode.current = e;
    setValue('otp', e);
  };

  const onSubmit = async () => {
    const phone = getValues('phone');
    setSubmiting(true);
    const result = await FetchApi.checkOtpCode({
      otp: otpCode.current,
      phone: phone,
    });
    console.log('rer', result);
    if (result._msg_code == 1) {
      setScreen('FORM');
    } else {
      Alert.alert(Strings.OTP_code_wrong);
    }
    setSubmiting(false);
  };

  return (
    <>
      <AppText
        style={{
          marginTop:  Sizes.isMobile ? Sizes.height(15) : Sizes.height(5),
          marginBottom: Sizes.isMobile ? Sizes.height(5) : Sizes.height(2),
          textAlign: 'center',
          marginHorizontal: Sizes.padding * 1.5,
          fontSize: Sizes.isMobile ? Sizes.h5 : Sizes.h8
        }}>
        {Strings.OTP_description}
      </AppText>

      <AppConfirmCodeInput
        onChange={onChange}
        key={`${new Date()}`} //to forceupdate clear
        codeLength={6}
        codeInputLength={1}
        secureTextEntry={false}
        activeColor="red"
        textInputStyle={{
          borderColor: Colors.borderColorGrey,
          borderWidth: 0,
          borderBottomWidth: 1,
          fontSize: Sizes.h5,
          height: Sizes.input_height,
          color: Colors.text,
        }}
      />
      <AppButton
        style={{marginTop: Sizes.padding}}
        title={Strings.Confirm}
        type="primary"
        onPress={onSubmit}
        submiting={submiting}
      />
    </>
  );
};

export default OTPcode;
