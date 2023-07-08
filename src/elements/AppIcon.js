import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import {TouchableCo} from './TouchableCo';
import {Sizes, useAppTheme} from '../utils';

const Icon = props => {
  const {type, icon, color, size, style} = props;
  const {Colors} = useAppTheme();

  const config = {
    style,
    name: icon,
    size: size || Sizes.h1,
    color: color || Colors.text,
  };

  switch (type) {
    case 'AntDesign':
      return <AntDesign {...config} />;
    case 'FontAwesome':
      return <FontAwesome {...config} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...config} />;
    case 'MaterialIcons':
      return <MaterialIcons {...config} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...config} />;
    case 'Feather':
      return <Feather {...config} />;
    case 'Fontisto':
      return <Fontisto {...config} />;
    case 'EvilIcons':
      return <EvilIcons {...config} />;
    case 'Entypo':
      return <Entypo {...config} />;
    case 'Octicons':
      return <Octicons {...config} />;
    case 'Foundation':
      return <Foundation {...config} />;
    default:
      return <Ionicons {...config} />;
  }
};

/**
 * @param {onlyIcon,hitSlop,onPress,disabled,type, icon, color, size, style} props
 */
const AppIcon = props => {
  //without onPress
  //type, icon, color, size,
  if (props.onlyIcon || !(props.onPress || props.onPressIn)) {
    return <Icon {...props} />;
  }
  let hitSlop;
  if (props.hitSlop) {
    hitSlop = {
      top: Sizes.padding,
      left: Sizes.padding,
      right: Sizes.padding,
      bottom: Sizes.padding,
      ...props.hitSlop,
    };
  }
  return (
    <TouchableCo
      onPress={props.onPress}
      onPressIn={props.onPressIn}
      hitSlop={hitSlop}
      disabled={props.disabled}
      style={props.styleTouch}>
      <Icon {...props} />
    </TouchableCo>
  );
};

export {AppIcon};
