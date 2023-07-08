import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Sizes, Icons, IconTypes, useAppTheme, ComonStyle} from '../utils';
import {AppImage} from './AppImage';
import {AppIcon} from './AppIcon';
import {AppText} from './AppText';

const HeaderLogo = () => {
  return (
    <AppImage
      source={require('../utils/images/logo_app.png')}
      style={{
        width: Sizes.width('25%'),
        height: Sizes.width('25%') * (160 / 518),
      }}
    />
  );
};
const AppHeader = props => {
  const navigation = useNavigation();
  const insert = useSafeAreaInsets();
  const {Colors} = useAppTheme();
  const {style} = props;

  const onGoBack = () => {
    navigation.goBack();
  };

  const renderLeftComponent = () => {
    const {Left, renderLeft, leftGoBack, onPressLeft} = props;
    if (Left) {
      return (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: Sizes.padding,
          }}>
          {Left}
        </View>
      );
    }
    if (renderLeft) {
      return (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: Sizes.padding,
          }}>
          {renderLeft()}
        </View>
      );
    }
    if (leftGoBack) {
      const onPress = onPressLeft || onGoBack;
      return (
        <View
          style={{
            flexDirection: 'row',
            // position: 'absolute',
            marginHorizontal: Sizes.padding,
          }}>
          <AppIcon
            icon={Icons.AntDesign_arrowleft}
            type={IconTypes.AntDesign}
            onPress={onPress}
            size={props.isChild ? Sizes.h2 : Sizes.h1 * 1.2}
            color={props.isChild ? Colors.primary : Colors.text}
            hitSlop={{
              top: Sizes.padding,
              left: Sizes.padding,
              bottom: Sizes.padding,
              right: Sizes.padding * 2,
            }}
          />
        </View>
      );
    }

    return null;
  };
  const renderTitleComponent = () => {
    const {Title, title, titleLogo, titleStyle, numberOfLines, renderTitle} =
      props;
    if (Title) {
      return Title;
    }
    if (renderTitle) {
      return renderTitle();
    }
    if (title) {
      return (
        <AppText
          numberOfLines={numberOfLines || 1}
          style={[
            // ComonStyle.bold,
            {
              marginLeft: !props.leftGoBack ? Sizes.padding : undefined,
              fontSize: Sizes.h4,
              color: Colors.text,
            },
            titleStyle,
          ]}>
          {title ? title.toUpperCase() : ''}
        </AppText>
      );
    }
    if (titleLogo) {
      return <HeaderLogo />;
    }
    return null;
  };
  const renderRightComponent = () => {
    const {Right, renderRight} = props;
    if (Right) {
      return (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: Sizes.padding,
          }}>
          {Right}
        </View>
      );
    }

    if (renderRight) {
      return (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: Sizes.padding,
          }}>
          {renderRight()}
        </View>
      );
    }

    return null;
  };

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        paddingTop: props.isChild
          ? Sizes.padding / 2
          : Math.max(insert.top, Sizes.padding),
        paddingBottom: Sizes.padding / 2,
        borderBottomWidth: 1,
        borderColor: props.isChild ? Colors.primary : Colors.borderColorGrey,
      }}>
      <View style={[styles.container, style]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {renderLeftComponent()}
          {renderTitleComponent()}
        </View>
        {renderRightComponent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Sizes.device_width,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
});

export {AppHeader};
