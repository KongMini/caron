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
      style={{paddingTop: Sizes.padding, paddingHorizontal: Sizes.padding}}>
      <AppText
        style={{
          color: selected ? Colors.primary : Colors.text,
          fontWeight: '500',
        }}>
        {data.lable}
      </AppText>
    </TouchableCo>
  );
};
const LanguageSetting = () => {
  const {Strings, setLanguageCode} = useAppLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(
    LanguageService.getCode(),
  );
  const languages = [
    {
      lable: Strings.Vietnamese,
      value: CheckLogic.Language_code.vietnamese,
    },
    {
      lable: Strings.English,
      value: CheckLogic.Language_code.english,
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: Sizes.height(8),
      }}>
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
export {LanguageSetting};
