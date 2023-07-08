import React from 'react';
import {useForm} from 'react-hook-form';
import {View, TouchableOpacity} from 'react-native';
import {AppImage, AppInput, AppText} from '../../../elements';
import {AppTouchable} from '../../../elements/AppTouchable';
import {ModalCustomServices, useAppLanguage, useAppTheme} from '../../../utils';

const AddPromotion = () => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {control, reset} = useForm({mode: 'all'});

  const onAddPromotion = () => {
    ModalCustomServices.set({
      title: Strings.Type_code_promotion,
      titleStyle: {color: Colors.success},
      children: () => (
        <View style={{width: '100%', alignItems: 'center'}}>
          <AppInput
            focus={true}
            style={{width: '90%', marginVertical: 20}}
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
                alert('Mã khuyến mại không đúng hoặc đã hết hạn sử dụng.');
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

  const DATA = [
    {
      label: Strings.Type_code_promotion,
      icon: require('../../../utils/images/icon_promotion.png'),
      onPress: onAddPromotion,
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: Colors.greyLight,
      }}>
      {DATA.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={item.onPress}
            key={`${index}`}
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Colors.greyLight,
              paddingHorizontal: 4,
              paddingVertical: 8,
              alignItems: 'center',
            }}>
            <AppImage
              source={item.icon}
              style={{width: 20, height: 20, marginRight: 4}}
            />
            <AppText style={{fontSize: 12}}>{item.label}</AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AddPromotion;
