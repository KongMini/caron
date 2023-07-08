import React, {useState} from 'react';
import {View} from 'react-native';

import {TouchableCo, AppText, AppIcon} from '../../../elements';
import {
  CheckLogic,
  ComonStyle,
  Icons,
  IconTypes,
  LanguageService,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

/**
 *
 * @param {lable,value} data
 */
const LanguageItem = ({data, onPress, selected}) => {
  const {Colors} = useAppTheme();
  return (
    <TouchableCo
      onPress={onPress}
      style={{width: Sizes.device_width, paddingHorizontal: Sizes.padding}}>
      <View
        style={[
          ComonStyle.borderBottom(Colors.text),
          {
            paddingVertical: Sizes.padding,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: Sizes.width('15%'),
          },
        ]}>
        <AppText style={{color: Colors.text, fontWeight: '500'}}>
          {data.lable}
        </AppText>
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
const LanguageList = () => {
  const {Strings, setLanguageCode} = useAppLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(
    LanguageService.getCode(),
  );
  const languages = [
    {
      lable: Strings.English,
      value: CheckLogic.Language_code.english,
    },
    {
      lable: Strings.Vietnamese,
      value: CheckLogic.Language_code.vietnamese,
    },
  ];

  return (
    <View>
      {languages.map(item => {
        return (
          <LanguageItem
            key={item.value}
            data={item}
            onPress={() => {
              if (selectedLanguage !== item.value) {
                setSelectedLanguage(item.value);
                setLanguageCode(item.value);
              }
            }}
            selected={selectedLanguage === item.value}
          />
        );
      })}
    </View>
  );
};
export {LanguageList};
