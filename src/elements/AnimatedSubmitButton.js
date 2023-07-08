import React from 'react';
import {Keyboard} from 'react-native';
import {useWatch} from 'react-hook-form';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useKeyboard} from '@react-native-community/hooks';

import {ComonStyle, Sizes, useAppTheme} from '../utils';

import {TouchableCo} from './TouchableCo';
import {Loading} from './Loading';
import {AppText} from './AppText';

/**
 * translate by keyboard height
 * @param {*} param0
 * @returns
 */
export function AnimatedSubmitButton({
  onPress,
  control,
  submiting,
  title,
  styleButton,
  testID,
}) {
  const {Colors} = useAppTheme();
  const keyboard = useKeyboard();
  const watchAll = useWatch({control});

  const offsetBottom = useSharedValue(Sizes.padding * 2);

  const onPressSubmit = () => {
    Keyboard.dismiss();
    onPress && onPress();
  };

  const active =
    Object.keys(watchAll).length &&
    Object.keys(watchAll).every(key => !!watchAll[key]);
  if (keyboard.keyboardShown && keyboard.keyboardHeight) {
    offsetBottom.value = withTiming(keyboard.keyboardHeight);
  } else {
    offsetBottom.value = withTiming(Sizes.padding * 2);
  }
  //all item has data
  let backgroundColor = Colors.disabled;
  let textColor = Colors.placeholder;
  if (active) {
    backgroundColor = Colors.primary;
    textColor = Colors.background;
  }
  //position of submit bottom when keyboard hide/show
  const animatedStyles = useAnimatedStyle(() => {
    return {
      bottom: offsetBottom.value,
    };
  });

  const renderContent = () => {
    if (submiting) {
      return <Loading sizeSpinner={Sizes.h4} color={Colors.background} />;
    }
    return (
      <AppText
        style={[ComonStyle.bold, {fontSize: Sizes.h4, color: textColor}]}>
        {title}
      </AppText>
    );
  };
  return (
    <Animated.View
      style={[
        ComonStyle.center,
        {
          position: 'absolute',
          alignSelf: 'center',
          width: Sizes.width('80%'),
          borderRadius: Sizes.border_radius,
          marginBottom: Sizes.padding,
          backgroundColor,
          ...styleButton,
        },
        animatedStyles,
      ]}>
      <TouchableCo
        testID={testID}
        disabled={!active}
        onPress={onPressSubmit}
        style={[
          ComonStyle.center,
          {
            paddingVertical: Sizes.padding,
            width: Sizes.width('80%'),
          },
        ]}>
        {renderContent()}
      </TouchableCo>
    </Animated.View>
  );
}
