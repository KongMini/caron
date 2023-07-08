import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView, View} from 'react-native-ui-lib';

import {
  AppButton,
  AppContainer,
  AppDateInput,
  AppDropdown,
  AppHeader,
  AppInput,
  AppText,
  Loading,
} from '../../elements';
import {
  useAppLanguage,
  useAppTheme,
  Sizes,
  ModalBase,
  FetchApi,
} from '../../utils';
import {useGetInfoUser, useGetListCityOld} from '../../hooks';
import {useForm} from 'react-hook-form';
import dayjs from 'dayjs';

export default function UserInfoDetail() {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {control, handleSubmit, setValue} = useForm({mode: 'all'});
  const {profile, isLoadingProfile} = useGetInfoUser();
  const [submiting, setSubmiting] = useState(false);
  const listCity = useGetListCityOld();

  useEffect(() => {
    if (profile) {
      setValue('full_name', profile.fullname);
      setValue('birthday', dayjs(profile.birthday, 'YYYY-MM-DD'));
      setValue('sex', profile.sex);
      setValue('area', profile.area);
      setValue('address', profile.address);
      setValue('phone', profile.phone);
      setValue('email', profile.email_address);
      setValue('id', profile.id + '');
    }
  }, [profile]);

  const FIELD = [
    {
      type: 'TEXT_INPUT',
      name: 'full_name',
      label: Strings.Name,
    },
    {
      type: 'TEXT_INPUT',
      name: 'id',
      label: 'Mã giới thiệu của bạn',
      disabled: true,
    },
    {
      type: 'DATE_PICKER',
      name: 'birthday',
      label: Strings.DOB,
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
  ];

  const onSubmit = async e => {
    try {
      setSubmiting(true);
      const result = await FetchApi.updateProfile({
        ...e,
        fullname: e.full_name,
        birthday: e.birthday,
      });
      setSubmiting(false);
      if (result?._msg_code === 1) {
        ModalBase.success(Strings.Edit_success);
      }
      if (result?._error_code) {
        ModalBase.error({result});
      }
    } catch (err) {
      ModalBase.error({message: Strings.something_wrong});
      console.log('err', err);
    } finally {
      setSubmiting(false);
    }
  };

  if (isLoadingProfile) {
    return <Loading />;
  }

  return (
    <AppContainer style={{marginBottom: Sizes.padding}}>
      <AppHeader isChild leftGoBack title={Strings.User_info} />
      <KeyboardAwareScrollView
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: Sizes.padding * 1.5,
          paddingTop: Sizes.padding,
        }}
        showVerticalIndicator={false}>
        {FIELD.map((item, index) => {
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
                  style={{
                    borderWidth: 1,
                    borderRadius: Sizes.border_radius,
                    borderColor: item.isPrimary ? Colors.primary : Colors.text,
                  }}
                  containerStyle={{
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                  inputStyle={{borderRadius: Sizes.border_radius}}
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
                    boderWidth: 1,
                    borderColor: Colors.text,
                  }}
                />
              )}
            </View>
          );
        })}

        <AppButton
          style={{marginTop: 6, marginBottom: 20}}
          control={control}
          title={Strings.Update}
          type="primary"
          onPress={handleSubmit(onSubmit)}
          submiting={submiting}
        />
      </KeyboardAwareScrollView>
    </AppContainer>
  );
}
