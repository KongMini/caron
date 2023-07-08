import React, {useState, useRef} from 'react';

import {AppConfirmCodeInput} from '../../../elements/AppConfirmCodeInput';
import {AppText, AppButton} from '../../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme} from '../../../utils';
import {Alert} from 'react-native';

const OTPcode = ({setScreen, control, handleSubmit, setValue, getValues}) => {
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
          marginTop: Sizes.height(15),
          marginBottom: Sizes.height(5),
          textAlign: 'center',
          marginHorizontal: Sizes.padding * 1.5,
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
          height: Sizes.input_height,
          color: Colors.text,
        }}
      />
      <AppButton
        style={{marginTop: Sizes.padding}}
        title={Strings.Register}
        type="primary"
        onPress={onSubmit}
        submiting={submiting}
      />
    </>
  );
};

export default OTPcode;
