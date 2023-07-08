import {View, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppContainer, AppHeader, AppIcon, AppText} from '../../elements';
import {
  ModalCustomServices,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../utils';
import ChangePass from './items/ChangePass';

function UserInfo({navigation}) {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();

  const ableChangePassModal = () => {
    ModalCustomServices.set({
      title: Strings.Change_pass,
      children: () => <ChangePass />,
    });
  };

  return (
    <AppContainer>
      <AppHeader isChild leftGoBack title={Strings.User_info} />
      <ScrollView>
        {[
          {
            label: Strings.User_info,
            onPress: () => {
              navigation.navigate('UserInfoDetail');
            },
          },
          {label: Strings.Change_pass, onPress: ableChangePassModal},
          {
            label: Strings.Lich_hen,
            onPress: () => {
              navigation.navigate('UserBookingHistory');
            },
          },
        ].map(item => {
          return (
            <TouchableOpacity
              onPress={item.onPress}
              key={item.label}
              style={{
                flexDirection: 'row',
                padding: Sizes.padding,
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: Colors.primary,
              }}>
              <AppText>{item.label}</AppText>
              <AppIcon
                icon="right"
                type="AntDesign"
                style={{fontSize: Sizes.h4, color: Colors.primary}}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </AppContainer>
  );
}

export default UserInfo;
