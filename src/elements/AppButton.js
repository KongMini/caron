import React, {Fragment} from 'react';
import {View} from 'react-native';

import {Loading} from './Loading';
import {AppIcon} from './AppIcon';
import {TouchableCo} from './TouchableCo';
import {Sizes, useAppTheme} from '../utils';
import {AppText} from './AppText';

const AppButton = ({
  icon,
  wrapperStyle,
  title,
  textStyle,
  loading,
  style,
  disabled,
  onPress,
  hitSlop,
  loadingText,
  activeOpacity,
  type,
  sizeSpinner = Sizes.h4,
  renderItem,
  loadingStyle,
}) => {
  const {Colors} = useAppTheme();

  const renderContent = () => {
    if (renderItem) {
      return renderItem();
    }
    let textColor = Colors.text;

    if (icon && icon.iconColor) {
      textColor = icon.iconColor;
    }
    if (textStyle && textStyle.color) {
      textColor = textStyle.color;
    }

    if (loading) {
      return (
        <Loading
          style={loadingStyle}
          loadingText={loadingText}
          color={textColor}
          sizeSpinner={sizeSpinner}
        />
      );
    }

    const textPrimary =
      type === 'primary'
        ? {
            color: 'white',
            fontWeight: 'bold',
          }
        : {};

    return (
      <Fragment>
        {!!icon && (
          <AppIcon
            onlyIcon
            type={icon.iconType}
            icon={icon.iconName}
            color={icon.iconColor}
            size={icon.iconSize}
            style={icon.iconStyle}
          />
        )}
        {!!title && (
          <AppText
            style={[
              {
                paddingLeft: icon ? Sizes.padding : undefined,
                fontSize: Sizes.h4,
                color: textColor,
              },
              textPrimary,
              textStyle,
            ]}>
            {title}
          </AppText>
        )}
      </Fragment>
    );
  };

  let hitSlopDefault;
  if (hitSlop) {
    hitSlopDefault = {
      top: Sizes.padding,
      left: Sizes.padding,
      right: Sizes.padding,
      bottom: Sizes.padding,
      ...hitSlop,
    };
  }

  const primary =
    type === 'primary'
      ? {
          borderWidth: 1,
          borderColor: disabled ? Colors.greyThin : Colors.primary,
          backgroundColor: disabled ? Colors.greyThin : Colors.primary,
          paddingVertical: 6,
          marginHorizontal: Sizes.padding * 3,
          borderRadius: Sizes.border_radius,
        }
      : {};

  return (
    <TouchableCo
      style={{...wrapperStyle}}
      activeOpacity={activeOpacity || 0.7}
      disabled={loading || disabled}
      onPress={onPress}
      hitSlop={hitSlopDefault}>
      <View
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          },
          primary,
          style,
        ]}>
        {renderContent()}
      </View>
    </TouchableCo>
  );
};

export {AppButton};
