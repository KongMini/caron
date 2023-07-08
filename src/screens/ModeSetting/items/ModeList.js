import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {AppText, AppIcon, TouchableCo} from '../../../elements';
import {
  CheckLogic,
  ComonStyle,
  Icons,
  IconTypes,
  ModeService,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

const ModeItem = ({lable, onPress, selected, icon}) => {
  const {Colors} = useAppTheme();
  return (
    <TouchableCo
      onPress={onPress}
      style={{
        width: Sizes.device_width,
        paddingHorizontal: Sizes.padding,
      }}>
      <View
        style={[
          ComonStyle.borderBottom(
            selected ? Colors.primary : Colors.placeholder,
          ),
          {
            paddingVertical: Sizes.padding,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {!!icon && <AppIcon {...icon} />}
          <AppText style={{color: Colors.text, paddingLeft: Sizes.padding}}>
            {lable}
          </AppText>
        </View>
        {!!selected && (
          <AppIcon
            icon={Icons.AntDesign_checkcircleo}
            type={IconTypes.AntDesign}
            color={Colors.accent}
            size={Sizes.h2}
          />
        )}
      </View>
    </TouchableCo>
  );
};
const ModeList = () => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const [selectedThemeCode, setSelectedThemeCode] = useState(
    ModeService.getCode(),
  );
  const modeList = [
    {
      lable: Strings.Base_device,
      value: CheckLogic.Theme.base_device,
      icon: {
        icon: Icons.FontAwesome_mobile_phone,
        type: IconTypes.FontAwesome,
        color: Colors.primary,
      },
    },
    {
      lable: Strings.Dark_mode,
      value: CheckLogic.Theme.dark,
      icon: {
        icon: Icons.FontAwesome_moon_o,
        type: IconTypes.FontAwesome,
        color: Colors.moon,
      },
    },
    {
      lable: Strings.Light_mode,
      value: CheckLogic.Theme.light,
      icon: {
        icon: Icons.FontAwesome_sun_o,
        type: IconTypes.FontAwesome,
        color: Colors.sun,
      },
    },
  ];

  return (
    <View>
      {modeList.map((item, index) => {
        return (
          <ModeItem
            key={`${index}`}
            {...item}
            selected={item.value === selectedThemeCode}
            onPress={() => {
              if (item.value !== selectedThemeCode) {
                setSelectedThemeCode(item.value);
                ModeService.setCode(item.value);
              }
            }}
          />
        );
      })}
    </View>
  );
};
export {ModeList};
