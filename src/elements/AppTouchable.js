import React from 'react';
import {Sizes, useAppTheme} from '../utils';
import {AppText} from './AppText';
import {TouchableCo} from './TouchableCo';

const Normal = ({
  wrapperStyle,
  textStyle,
  label,
  loading,
  disabled,
  onPress,
  type,
}) => {
  const {Colors} = useAppTheme();

  const typeStyle = {
    primary: {
      style: {
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
        paddingVertical: Sizes.padding / 2,
        marginHorizontal: Sizes.padding,
        borderRadius: Sizes.border_radius,
      },
      text: {color: Colors.background},
      textDisabled: {color: Colors.disabled},
      disabled: {
        borderWidth: 1,
        borderColor: Colors.greyLight,
        backgroundColor: Colors.greyLight,
        paddingVertical: Sizes.padding / 2,
        marginHorizontal: Sizes.padding,
        borderRadius: Sizes.border_radius,
      },
    },
    secondary: {
      style: {
        borderWidth: 1,
        borderColor: Colors.greyBold,
        backgroundColor: Colors.background,
        paddingVertical: Sizes.padding / 2,
        marginHorizontal: Sizes.padding,
        borderRadius: Sizes.border_radius,
      },
      text: {color: Colors.greyBold},
      textDisabled: {color: Colors.greyBold},
      disabled: {
        borderWidth: 1,
        borderColor: Colors.greyLight,
        backgroundColor: Colors.greyLight,
        paddingVertical: Sizes.padding / 2,
        marginHorizontal: Sizes.padding,
        borderRadius: Sizes.border_radius,
      },
    },
    error: {
      style: {
        borderWidth: 1,
        borderColor: Colors.error,
        backgroundColor: Colors.neutral_white,
        paddingVertical: Sizes.padding / 2,
        marginHorizontal: Sizes.padding * 3,
        borderRadius: Sizes.border_radius,
      },
      text: {color: Colors.error},
      textDisabled: {color: Colors.sematic_error_disabled},
      disabled: {
        borderWidth: 1,
        borderColor: Colors.sematic_error_disabled,
        backgroundColor: Colors.neutral_white,
        paddingVertical: Sizes.padding / 2,
        marginHorizontal: Sizes.padding * 3,
        borderRadius: Sizes.border_radius,
      },
    },
    underline: {
      style: {paddingVertical: Sizes.padding / 2},
      text: {color: Colors.primary, textDecorationLine: 'underline'},
      textDisabled: {
        color: Colors.sematic_primary_disabled,
        textDecorationLine: 'underline',
      },
      disabled: {paddingVertical: Sizes.padding / 2},
    },
  };

  return (
    <TouchableCo
      style={[
        {
          alignSelf: 'center',
          height: Sizes.isMobile ? 44 : 60,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
          minWidth: 80,
        },
        loading ? typeStyle[type]?.disabled : typeStyle[type]?.style,
        wrapperStyle,
      ]}
      activeOpacity={0.7}
      disabled={loading || disabled}
      onPress={onPress}>
      <AppText
        style={[
          {fontWeight: '400'},
          loading ? typeStyle[type]?.textDisabled : typeStyle[type]?.text,
          textStyle,
        ]}>
        {label}
      </AppText>
    </TouchableCo>
  );
};

const AppTouchable = {Normal};
export {AppTouchable};
