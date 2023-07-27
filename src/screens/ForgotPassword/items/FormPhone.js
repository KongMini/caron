import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';

import {AppButton, AppInput} from '../../../elements';
import {
  Sizes,
  useAppLanguage,
  useAppTheme,
  FetchApi,
  ModalBase,
} from '../../../utils';

const FormPhone = ({setScreen, control, handleSubmit}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const [submiting, setSubmiting] = useState(false);
  const timeout = useRef();

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  const onSubmit = async e => {
    try {
      setSubmiting(true);
      const {phone} = e;
      console.log('phone', phone);
      const result = await FetchApi.getOtpCode({phone, is_type: 1});
      console.log('efq', result._msg_code);
      if (result._msg_code == 1) {
        timeout.current = setTimeout(() => {
          setSubmiting(false);
        }, 30000);
        setScreen('OTP');
      }
      if (
        result?._error_code == 1 ||
        result?.message === 'Tài khoản đã tồn tại'
      ) {
        setSubmiting(false);
        ModalBase.error({result: result});
      }
    } catch (err) {
      setSubmiting(false);
      console.log('err', err);
    }
  };
  return (
    <>
      <AppInput
        containerStyle={{
          marginTop: Sizes.isMobile ? Sizes.height(20) : Sizes.height(5),
          paddingHorizontal: Sizes.padding * 3,
        }}
        style={{borderWidth: 0}}
        inputStyle={{
          borderBottomWidth: 1,
          paddingHorizontal: 0,
          borderColor: Colors.borderColorGrey,
          paddingBottom: 2,
          height: (Sizes.device_width < Sizes.device_height) ? 40 : Sizes.height(10),
        }}
        placeholderTextColor={Colors.borderColorGrey}
        placeholder={Strings.Phone_number}
        control={control}
        name={'phone'}
        rules={{
          required: {value: true, message: Strings.This_field_is_required},
        }}
        keyboardType={'number-pad'}
      />
      <AppButton
        style={{marginTop: Sizes.padding}}
        control={control}
        title={Strings.Send_otp_code}
        type="primary"
        onPress={handleSubmit(onSubmit)}
        submiting={submiting}
      />
    </>
  );
};

export default FormPhone;
