import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-ui-lib';
import {AppIcon, AppImage} from '../../elements';
import {isIOS, Sizes, Svgs, useAppTheme} from '../../utils';
import {inactiveSupport24, support24} from '../../utils/icons';

export default function FloatMenu({navigation}) {
  const {Colors} = useAppTheme();
  const animation = useRef(new Animated.Value(0)).current;
  // const open = useRef(false);
  const [open, setOpen] = useState(false);
  const {bottom} = useSafeAreaInsets();

  const toggleOpen = () => {
    if (open) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setOpen(!open);
  };

  const scaleInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Sizes.isMobile ? 30 : 0],
  });
  const bgStyle = {
    transform: [
      {
        scale: scaleInterpolate,
      },
    ],
  };
  const reloadInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70],
  });
  const orderInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -140],
  });
  const itemThreeInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -210],
  });
  const reloadStyle = {
    transform: [
      {
        translateY: reloadInterpolate,
      },
    ],
  };
  const orderStyle = {
    transform: [
      {
        translateY: orderInterpolate,
      },
    ],
  };
  const itemThreeStyle = {
    transform: [
      {
        translateY: itemThreeInterpolate,
      },
    ],
  };
  const labelPositionInterpolate = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [-30, -60, -90],
  });
  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1],
  });
  const labelStyle = {
    opacity: opacityInterpolate,
    transform: [
      {
        translateX: labelPositionInterpolate,
      },
    ],
  };

  const onOpenMess = () => {
    Linking.openURL('http://m.me/CarOn.mva').catch(() => {});
  };
  const onOpenZalo = () => {
    Linking.openURL('https://zalo.me/3990449614391998282').catch(() => {});
  };
  const onCall = () => {
    let phoneNumber = '1900633612';
    if (!isIOS) {
      phoneNumber = `tel:${1900633612}`;
    } else {
      phoneNumber = `telprompt:${1900633612}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={[{bottom: bottom + 100}, styles.container]}>
      <Animated.View style={[styles.background, bgStyle]}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            open && toggleOpen();
          }}
        />
      </Animated.View>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, itemThreeStyle]}>
          <TouchableOpacity
            hitSlop={{bottom: 10, top: 10, left: 18, right: 18}}
            onPress={onOpenZalo}>
            <Svgs.Zalo />
          </TouchableOpacity>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, orderStyle]}>
          {/* <Animated.Text style={[styles.label, labelStyle]}>
            Order
          </Animated.Text> */}
          <AppIcon
            onPress={onOpenMess}
            color={Colors.primary}
            hitSlop
            type="Feather"
            icon="message-circle"
            size={Sizes.h4}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, reloadStyle]}>
          <AppIcon
            onPress={onCall}
            color={Colors.primary}
            hitSlop
            type="Feather"
            icon="phone-call"
            size={Sizes.h4}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggleOpen}>
        <View style={[styles.button, styles.pay]}>
          {open ? (
            <AppImage
              source={support24}
              style={{width: 50, height: 50, bottom: 0, right: 0}}
            />
          ) : (
            <AppImage
              source={inactiveSupport24}
              style={{width: 50, height: 50, bottom: 0, right: 0}}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  background: {
    backgroundColor: 'rgba(0,0,0,.2)',
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 20,
    right: 20,
    borderRadius: 30,
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 70,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  other: {
    backgroundColor: '#FFF',
  },
  payText: {
    color: '#FFF',
  },
  pay: {
    backgroundColor: 'white',
  },
  label: {
    color: '#FFF',
    position: 'absolute',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
});
