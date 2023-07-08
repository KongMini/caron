import React, {useState} from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-ui-lib';

import {
  AppButton,
  AppDateInput,
  AppDropdown,
  AppInput,
  AppText,
} from '../../../elements';
import {
  FetchApi,
  ModalBase,
  Sizes,
  useAppLanguage,
  useAppTheme,
  Validate,
} from '../../../utils';
import {useGetListCityOld} from '../../../hooks/';

const FormRegister = ({
  control,
  handleSubmit,
  getValues,
  trigger,
  navigation,
}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const [submiting, setSubmiting] = useState(false);
  const listCity = useGetListCityOld();
  const [errMessage, setErrMessage] = useState('');
console.log("aaaaaaaaaa", getValues);
  const FIELD = [
    {
      type: 'TEXT_INPUT',
      name: 'password',
      label: Strings.Password,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
        // pattern: {
        //   value: Validate.pass,
        //   message: Strings.Password_failed,
        // },
        // validate: value => {
        //   trigger(['confirm_password']);
        //   return true;
        // },
      },
      //secureTextEntry: true,
      isPrimary: true,
    },
    // {
    //   type: 'TEXT_INPUT',
    //   name: 'confirm_password',
    //   label: Strings.Confirm_password,
    //   required: {
    //     required: {value: true, message: Strings.This_field_is_required},
    //     validate: value => {
    //       return getValues('password') && getValues('password') == value
    //         ? true
    //         : Strings.Is_not_same_password;
    //     },
    //   },
    //   secureTextEntry: true,
    //   isPrimary: true,
    // },
    {
      type: 'TEXT_INPUT',
      name: 'fullname',
      label: Strings.Name,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      isPrimary: true,
    },
    {
      type: 'DATE_PICKER',
      name: 'birthday',
      label: Strings.DOB,
      // required: {
      //   required: {value: true, message: Strings.This_field_is_required},
      // },
      // isPrimary: true,
    },
    {
      type: 'DROPDOWN',
      name: 'sex',
      label: Strings.Gender,
      dataDropDown: [
        {label: 'Nam', value: 1},
        {label: 'Nữ', value: 0},
      ],
      keyValueDropdown: 'label',
      keyResult: 'value',
      // required: {
      //   required: {value: true, message: Strings.This_field_is_required},
      // },
      // isPrimary: true,
    },
    {
      type: 'DROPDOWN',
      name: 'area',
      label: Strings.City,
      dataDropDown: listCity?.data?.Data || [],
      keyValueDropdown: 'ten_thanhpho',
      keyResult: 'ma_thanhpho',
    },
    {
      type: 'TEXT_INPUT',
      name: 'address',
      label: Strings.Address,
    },
    {
      type: 'TEXT_INPUT',
      name: 'phone',
      label: Strings.Phone_number,
      disabled: true,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      isPrimary: true,
    },
    {
      type: 'TEXT_INPUT',
      name: 'biensoxe',
      label: Strings.License_plates,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      isPrimary: true,
    },
    {
      type: 'TEXT_INPUT',
      name: 'email',
      label: Strings.Email,
      required: {
        pattern: {
          value:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: Strings.Email_is_not_valid,
        },
      },
    },
    {
      type: 'TEXT_INPUT',
      name: 'affiliate',
      label: Strings.Affiliate,
      placeholder: 'Nhập mã người giới thiệu (nếu có)',
    },
  ];

  const onSubmit = async e => {
    try {
      setSubmiting(true);
      const result = await FetchApi.register(e);
      setSubmiting(false);
      console.log('Congpv', result);
      if (result._msg_code == 1) {
        ModalBase.success(Strings.register_successful);
        navigation.replace('Login');
      }
      if (result?._error_code == 1) {
        setErrMessage(result?.message);
      } else {
        setErrMessage(result?.message);
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={{paddingHorizontal: Sizes.padding * 1.5}}
      showVerticalIndicator={false}>
      {FIELD.map((item, index) => {
        //console.log(item, index);
        return (
          <View key={`${index}`} style={{paddingBottom: 18}}>
            <AppText
              style={{
                fontSize: Sizes.h4,
                marginBottom: 6,
                color: item.isPrimary ? Colors.primary : Colors.text,
                fontWeight: item.isPrimary ? 'bold' : null,
              }}>
              {item.label}
              {!!item.required?.required && ' *'}
            </AppText>
            {item.type === 'TEXT_INPUT' && (
              <AppInput
                control={control}
                name={item.name}
                rules={item.required}
                placeholder={item.placeholder}
                style={{
                  borderWidth: 1,
                  borderRadius: Sizes.border_radius,
                  borderColor: item.isPrimary ? Colors.primary : Colors.text,
                }}
                containerStyle={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingVertical: 0,
                }}
                inputStyle={{
                  backgroundColor: Colors.background_2,
                  borderRadius: Sizes.border_radius,
                  paddingVertical: 0,
                  color: Colors.text,
                }}
                secureTextEntry={item.secureTextEntry}
                editable={!item.disabled}
              />
            )}
            {item.type === 'DATE_PICKER' && (
              <AppDateInput
                control={control}
                name={item.name}
                headerText={Strings.DOB}
                format={'DD-MM-YYYY'}
                style={{
                  borderWidth: 1,
                  borderColor: item.isPrimary ? Colors.primary : Colors.text,
                }}
                styleError={{marginTop: 0}}
                rules={item.required}
              />
            )}
            {item.type === 'DROPDOWN' && (
              <AppDropdown
                control={control}
                name={item.name}
                dataDropDown={item.dataDropDown}
                keyValueDropdown={item.keyValueDropdown}
                keyResult={item.keyResult}
                styleInput={{
                  backgroundColor: Colors.background_2,
                  borderColor: item.isPrimary ? Colors.primary : Colors.text,
                  marginTop: 0,
                }}
                style={{borderWidth: 1}}
                rules={item.required}
              />
            )}
          </View>
        );
      })}

      {!!errMessage && (
        <AppText style={{textAlign: 'center', color: 'red'}}>
          {errMessage}
        </AppText>
      )}

      <AppButton
        style={{marginTop: 6}}
        control={control}
        title={Strings.Register}
        type="primary"
        onPress={handleSubmit(onSubmit)}
        submiting={submiting}
      />
    </KeyboardAwareScrollView>
  );
};

export default FormRegister;
