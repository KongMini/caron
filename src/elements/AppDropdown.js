import React, {useRef, useState} from 'react';

import {AppIcon} from './AppIcon';
import {IconTypes, isIOS, Sizes, useAppTheme} from '../utils';
import ModalDropdown from 'react-native-modal-dropdown';
import {TouchableOpacity, View} from 'react-native';
import {Controller, useFormState} from 'react-hook-form';
import {AppText} from '.';

const AppDropdown = ({
  styleInput,
  styleValue,
  styleItemContainer,
  itemTextStyle,
  control,
  defaultValue,
  name,
  dataDropDown,
  propsIcon,
  onPressChange,
  rules,
  disabled,
  keyValueDropdown = 'value',
  keyResult,
  placeholder,
  stylePlaceholder,
  loading,
  trigger,
  triggerName,
}) => {
  const {errors} = useFormState({control, name});
  const dropdown = useRef();
  const {Colors} = useAppTheme();
  const [isShow, setIsShow] = useState(false);

  const onChangeValue = onChange => (index, val) => {
    const result = dataDropDown[index][keyResult];
    if (keyResult) {
      onPressChange && onPressChange(result);
      onChange(result);
    } else {
      onPressChange && onPressChange(val, index);
      onChange(val, index);
    }
    trigger && trigger(triggerName);
  };

  const options = dataDropDown
    ? dataDropDown.map(item => item[keyValueDropdown])
    : [];

  return (
    <View>
      <TouchableOpacity
        disabled={disabled || loading}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          borderRadius: Sizes.border_radius,
          zIndex: 100,
        }}
        onPress={() => {
          dropdown.current.show();
          !isShow && setIsShow(true);
        }}
      />

      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}}) => {
          let dfValue = value ? value + '' : '';
          let valueFromList;
          if (keyResult && dataDropDown) {
            valueFromList = dataDropDown.find(itm => itm[keyResult] === value);
            if (valueFromList) {
              dfValue = valueFromList[keyValueDropdown];
            }
          }

          return (
            <View>
              <ModalDropdown
                key={`${defaultValue}`}
                saveScrollPosition={false}
                animated={false}
                onDropdownWillHide={() => setIsShow(false)}
                onDropdownWillShow={() => setIsShow(true)}
                ref={dropdown}
                renderSeparator={() => (
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: Colors.borderColorGrey,
                    }}
                  />
                )}
                renderRightComponent={() => (
                  <AppIcon
                    type={IconTypes.AntDesign}
                    icon={isShow ? 'caretup' : 'caretdown'}
                    color={Colors.borderColorGrey}
                    size={Sizes.isMobile ? Sizes.h5 : Sizes.h8}
                    {...propsIcon}
                  />
                )}
                style={{
                  marginTop: Sizes.padding / 2,
                  justifyContent: 'center',
                  width: '100%',
                  height: Sizes.isMobile ? 40 : 50,
                  borderWidth: 1,
                  borderColor: Colors.borderColorGrey,
                  borderRadius: Sizes.border_radius,
                  paddingRight: 30,
                  backgroundColor: Colors.background,
                  ...styleInput,
                }}
                options={options}
                dropdownStyle={{
                  marginTop: isIOS ? 9 : 8,
                  height: dataDropDown?.length < 5 ? -1 : undefined,
                  width: '86.5%',
                  borderWidth: 1,
                  borderColor: Colors.borderColorGrey,
                  marginLeft: styleInput?.paddingLeft
                    ? -styleInput?.paddingLeft - 1.25
                    : null,
                  ...styleItemContainer,
                }}
                dropdownTextStyle={{
                  color: Colors.black,
                  fontSize: Sizes.isMobile ? Sizes.h4 : Sizes.h7,
                  width: '100%',
                  ...itemTextStyle,
                }}
                textStyle={{
                  width: '100%',
                  fontSize: Sizes.isMobile ? Sizes.h4 : Sizes.h7,
                  color: Colors.text,
                  paddingHorizontal: Sizes.padding,
                  ...styleValue,
                }}
                dropdownTextHighlightStyle={{color: Colors.primary}}
                defaultValue={dfValue}
                onSelect={onChangeValue(onChange)}
              />
              {!value && !!placeholder && (
                <AppText
                  style={{
                    textAlign: 'center',
                    color: 'gray',
                    position: 'absolute',
                    top: Sizes.isMobile ? 10 : 0,
                    left: 18,
                    ...stylePlaceholder,
                  }}>
                  {placeholder}
                </AppText>
              )}
            </View>
          );
        }}
      />

      {errors[name] && errors[name].message && (
        <AppText
          style={{
            color: Colors.error,
            paddingTop: Sizes.padding / 4,
            fontSize: Sizes.isMobile ?  Sizes.h9 : Sizes.h6,
          }}>
          {errors[name].message}
        </AppText>
      )}
    </View>
  );
};

export {AppDropdown};
