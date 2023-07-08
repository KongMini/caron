import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet} from 'react-native';
import {Controller, useFormState, useWatch} from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

import {Sizes, useAppLanguage, useAppTheme} from '../utils';
import {AppIcon} from './AppIcon';
import {AppText} from './AppText';

import {TouchableCo} from './TouchableCo';
import { Size } from 'react-native-ui-lib/src/components/skeletonView';

const AppDateInput = forwardRef((props, ref) => {
  const {
    format = 'DD-MM-YYYY',
    style,
    control,
    defaultValue,
    placeholderTextColor,
    inputStyle,
    placeholder,
    noIcon,
    mode,
    iconName,
    iconType,
    iconColor,
    iconClear,
    maxDate,
    name,
    rules,
    headerText,
    styleError,
  } = props;

  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const {errors} = useFormState({control, name});

  const date = useWatch({
    control,
    name,
    defaultValue, // default value before the render
  });

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    clearDate,
    showDatePicker,
  }));

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  let val = date ? dayjs(date, 'DD-MM-YYYY').format(format) : '';
  if (mode === 'datetime') {
    val = date ? dayjs(date).format('HH:mm ngày DD/MM/YYYY') : '';
  }

  return (
    <View>
      <TouchableCo
        onPress={showDatePicker}
        style={[
          {
            height: Sizes.isMobile ? 40 : 50,
            width: '100%',
            borderRadius: Sizes.border_radius,
            borderColor: Colors.text,
            borderWidth: StyleSheet.hairlineWidth,
            justifyContent: 'center',
            paddingHorizontal: 8,
            backgroundColor: Colors.background_2,
          },
          style,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: Sizes.padding / 2,
            paddingVertical: Sizes.padding / 2,
          }}>
          <AppText
            style={[
              {
                color: val
                  ? Colors.text
                  : placeholderTextColor || Colors.placeholder,
                fontSize: Sizes.isMobile ? Sizes.h5 : Sizes.h8,  
              },
              inputStyle,
            ]}>
            {val || placeholder}
          </AppText>
          {/* {!noIcon && !val && ( */}
          <AppIcon
            icon={iconName || 'calendar-o'}
            type={iconType || 'FontAwesome'}
            color={iconColor || Colors.borderColorGrey}
            size={19}
          />
          {/* )} */}
          {!!val && iconClear && (
            <TouchableCo
              hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}
              style={{
                zIndex: 100,
                width: 14,
                height: 14,
                backgroundColor: 'rgb(199,199,201)',
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={clearDate}>
              <AppIcon
                icon="close"
                type="AntDesign"
                color={'#ffffff'}
                size={11}
              />
            </TouchableCo>
          )}
        </View>
        <Controller
          defaultValue={defaultValue}
          name={name}
          control={control}
          rules={rules}
          render={({field: {onChange, value}}) => {
            return (
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                headerTextIOS={headerText}
                confirmTextIOS={Strings.Choose}
                cancelTextIOS={Strings.Cancel}
                mode={mode || 'date'}
                onCancel={hideDatePicker}
                onConfirm={e => {
                  hideDatePicker();
                  if (mode === 'datetime') {
                    onChange(e);
                  } else {
                    onChange(dayjs(e).format(format));
                  }
                }}
                date={
                  value
                    ? mode === 'datetime'
                      ? new Date(value)
                      : new Date(dayjs(value, format))
                    : new Date()
                }
                maximumDate={maxDate || new Date()}
                display="spinner"
                locale={'vi'}
              />
            );
          }}
        />
      </TouchableCo>
      {errors[name] && errors[name].message && (
        <AppText
          style={{
            marginTop: -12,
            color: Colors.error,
            fontSize: Sizes.h6,
            ...styleError,
          }}>
          {errors[name].message}
        </AppText>
      )}
    </View>
  );
});

export {AppDateInput};
