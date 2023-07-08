import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import {
  ModalCustomServices,
  Sizes,
  useAppLanguage,
  useAppTheme,
  FetchApi,
  Validate,
} from '../../../utils';
import {AppButton, AppInput, AppText} from '../../../elements';

function ChangePass() {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {control, getValues, trigger, handleSubmit} = useForm({mode: 'all'});
  const [loading, setLoading] = useState(false);
  const message = useRef();

  const FIELD = [
    {
      type: 'TEXT_INPUT',
      name: 'current_password',
      label: Strings.Current_password,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      secureTextEntry: true,
    },
    {
      type: 'TEXT_INPUT',
      name: 'new_password',
      label: Strings.New_password,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
        // pattern: {
        //   value: Validate.pass,
        //   message: Strings.Password_failed,
        // },
        // validate: value => {
        //   trigger(['confirm_new_password']);
        //   return true;
        // },
      },
      secureTextEntry: true,
    },
    // {
    //   type: 'TEXT_INPUT',
    //   name: 'confirm_new_password',
    //   label: Strings.Confirm_new_password,
    //   required: {
    //     required: {value: true, message: Strings.This_field_is_required},
    //     // validate: value => {
    //     //   return getValues('new_password') && getValues('new_password') == value
    //     //     ? true
    //     //     : Strings.Is_not_same_password;
    //     // },
    //   },
    //   secureTextEntry: true,
    // },
  ];

  const onChangePass = async e => {
    try {
      message.current = '';
      setLoading(true);
      const result = await FetchApi.changePassword(e);
      if (result._msg_code === 1) {
        message.current = Strings.Change_pass_success;
      } else {
        console.log('CongPV', result);
        message.current = result.message || Strings.something_wrong;
      }
    } catch (error) {
      message.current = Strings.something_wrong;
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{marginTop: Sizes.padding}}>
      {FIELD.map((item, index) => {
        return (
          <View key={`${index}`} style={{marginVertical: 6}}>
            <AppText
              style={{
                fontSize: Sizes.h4,
                marginBottom: 6,
                color: Colors.black,
              }}>
              {item.label}
            </AppText>
            <AppInput
              control={control}
              name={item.name}
              rules={item.required}
              style={{
                borderRadius: Sizes.border_radius,
              }}
              containerStyle={{
                width: Sizes.width(65),
                paddingHorizontal: 0,
              }}
              inputStyle={{
                borderRadius: Sizes.border_radius,
                color: Colors.black,
              }}
              secureTextEntry={item.secureTextEntry}
            />
          </View>
        );
      })}
      {!!message.current && (
        <AppText
          style={{
            textAlign: 'center',
            marginTop: 10,
            color:
              message.current === Strings.Change_pass_success
                ? Colors.success
                : Colors.error,
            fontSize: Sizes.h6,
          }}>
          {message.current}
        </AppText>
      )}
      <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
        <AppButton
          style={{
            borderRadius: Sizes.border_radius,
            alignItems: 'center',
            padding: Sizes.padding / 2,
            borderWidth: 1,
            marginBottom: Sizes.padding,
            marginRight: 10,
            marginTop: 12,
            minWidth: 100,
          }}
          textStyle={{
            fontWeight: 'bold',
            fontSize: Sizes.h5,
            paddingVertical: 4,
            color: 'black',
          }}
          colorSpinner={Colors.primary}
          sizeSpinner={Sizes.h3}
          onPress={() => {
            ModalCustomServices.close();
          }}
          title={Strings.Cancel}
        />
        <AppButton
          loadingStyle={{marginTop: 0, marginVertical: 12}}
          loading={loading}
          sizeSpinner={Sizes.h5}
          style={{
            borderRadius: Sizes.border_radius,
            alignItems: 'center',
            padding: Sizes.padding / 2,
            borderWidth: 1,
            borderColor: Colors.primary,
            backgroundColor: Colors.primary,
            marginBottom: Sizes.padding,
            marginTop: 12,
            minWidth: 100,
          }}
          textStyle={{
            fontWeight: 'bold',
            fontSize: Sizes.h5,
            paddingVertical: 4,
            color: 'white',
          }}
          colorSpinner={'white'}
          onPress={handleSubmit(onChangePass)}
          title={Strings.Confirm}
        />
      </View>
    </View>
  );
}

export default ChangePass;
