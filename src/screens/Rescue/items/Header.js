import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {AppIcon, AppImage, AppText} from '../../../elements';
import {
  Icons,
  IconTypes,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

const Header = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: Colors.greyThin,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '70%'}}>
          <AppIcon
            icon={Icons.AntDesign_arrowleft}
            type={IconTypes.AntDesign}
            onPress={() => navigation.goBack()}
            size={Sizes.h2}
            color={Colors.primary}
            hitSlop={{
              top: Sizes.padding,
              left: Sizes.padding,
              bottom: Sizes.padding,
              right: Sizes.padding * 2,
            }}
          />
          <AppText
            style={{
              color: Colors.greyBold,
              fontSize: Sizes.h4,
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            {Strings.List_rescue.toUpperCase()}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default Header;
