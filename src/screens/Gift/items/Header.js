import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppInput, AppText, AppTouchable, TouchableCo} from '../../../elements';
import {DrawerButton} from '../../../navigators/items/DrawerButton';
import {
  ModalCustomServices,
  Sizes,
  Svgs,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

export default function Header({}) {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {control, reset} = useForm();

  const onTypeCode = () => {
    ModalCustomServices.set({
      title: Strings.Type_code_promotion,
      titleStyle: {color: Colors.success},
      children: () => (
        <View style={{width: '100%', alignItems: 'center'}}>
          <AppInput
            focus={true}
            style={{width: '90%', marginVertical: 20}}
            inputStyle={{color: 'black'}}
            control={control}
            name="code"
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AppTouchable.Normal
              onPress={() => {
                reset();
                ModalCustomServices.close();
              }}
              type="secondary"
              label={Strings.Cancel}
            />
            <AppTouchable.Normal type="primary" label={Strings.Confirm} />
          </View>
        </View>
      ),
    });
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 9,
        backgroundColor: Colors.primary,
        marginTop: insets.top,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <DrawerButton />
        <TouchableCo
          style={{marginLeft: 12, flexDirection: 'row', borderRadius: 6}}
          onPress={onTypeCode}>
          <View
            style={{
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
              paddingVertical: 7.5,
              paddingHorizontal: 10,
              backgroundColor: '#fdc265',
            }}>
            <AppText style={{fontSize: Sizes.h6, fontWeight: 'bold'}}>
              {Strings.Type_code}
            </AppText>
          </View>
          <View
            style={{
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
              paddingVertical: 7.5,
              paddingHorizontal: 10,
              backgroundColor: 'white',
            }}>
            <AppText
              style={{
                color: 'black',
                fontSize: Sizes.h6,
                fontWeight: 'bold',
              }}>
              {Strings.Introduce_endow}
            </AppText>
          </View>
        </TouchableCo>
      </View>

      <TouchableCo
        style={{
          flexDirection: 'row',
          backgroundColor: '#f7acd1',
          alignItems: 'center',
          paddingVertical: 4,
          width: Sizes.device_width * 0.3,
          padding: 4,
          borderRadius: 10,
        }}>
        {/* <View
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            borderRadius: 10,
            top: -4,
            right: -4,
            backgroundColor: Colors.primary,
            borderWidth: 1,
            borderColor: 'white',
            alignItems: 'center',
          }}>
          <AppText style={{color: 'white'}}>1</AppText>
        </View> */}
        <TouchableOpacity>
          <Svgs.Gift />
        </TouchableOpacity>
        <AppText style={{flex: 1, fontSize: Sizes.isMobile ? Sizes.h8 : Sizes.h5}}>
          {Strings.My_gift}
        </AppText>
      </TouchableCo>
    </View>
  );
}
