import React, {useState, useRef, useEffect} from 'react';

import {AppButton, AppInput, AppText} from '../../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme} from '../../../utils';

const FormPhone = ({setScreen, control, handleSubmit}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const [submiting, setSubmiting] = useState(false);
  const [message, setMessage] = useState('');
  const timeout = useRef();

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  const onSubmit = async e => {
    try {
      setSubmiting(true);
      setMessage('');
      const {phone} = e;
      const result = await FetchApi.getOtpCode({phone, is_type: 0});
      console.log('dsadsa', result);
      if (result._msg_code == 1) {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
          setSubmiting(false);
        }, 30000);
        setScreen('OTP');
      }
      if (
        result?._error_code == 1 ||
        result?._msg_text === 'Tài khoản đã tồn tại, vui lòng kiểm tra lại'
      ) {
        setMessage(result?._msg_text);
        setSubmiting(false);
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
          marginTop: Sizes.isMobile ? Sizes.height(20) : Sizes.height(2),
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
          pattern: {
            value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
            message: Strings.Phone_is_not_valid,
          },
        }}
        keyboardType={'number-pad'}
      />
      {submiting && (
        <AppText
          style={{color: Colors.warning, textAlign: 'center', marginTop: 20}}>
          {Strings.Please_wait}
        </AppText>
      )}
      {!!message && (
        <AppText
          style={{color: Colors.error, textAlign: 'center', marginTop: 20}}>
          {message}
        </AppText>
      )}
      <AppButton
        disabled={submiting}
        style={{marginTop: Sizes.padding}}
        control={control}
        title={Strings.Register}
        type="primary"
        onPress={handleSubmit(onSubmit)}
        loading={submiting}
      />
    </>
  );
};

export default FormPhone;
