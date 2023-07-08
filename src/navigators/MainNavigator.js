import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Sizes, Svgs, useAppLanguage, useAppTheme} from '../utils';
import {AppIcon, AppText} from '../elements';
import AllStackNavigator from './AllStackNavigator';
import TabOneNavigator from './TabOneNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const renderIcon =
  ({icon, type}) =>
  ({focused, color}) => {
    return (
      <AppIcon icon={icon} type={type} color={color} onlyIcon size={Sizes.h2} />
    );
  };
const renderLabel =
  ({label}) =>
  ({focused, color}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <AppText style={{color, fontSize: Sizes.h8}}>{label}</AppText>
      </View>
    );
  };
// const getTabBarVisible = route => {
//   // If the focused route is not found, we need to assume it's the initial screen
//   // This can happen during if there hasn't been any navigation inside the screen
//   // In our case, it's "TabOneNavigator" as that's the first screen inside the navigator
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'TabOneNavigator';
//   console.log('routeName', routeName);
//   if (routeName === 'AMinuteDetail') {
//     return false;
//   }
//   return true;
// };
const MainNavigator = ({navigation}) => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const insets = useSafeAreaInsets();

  // function MyTabBar({state, descriptors, navigation}) {
  //   return (
  //     <View style={{flexDirection: 'row', marginBottom: insets.bottom}}>
  //       {state.routes.map((route, index) => {
  //         const {options} = descriptors[route.key];
  //         const label = options.tabBarLabel;
  //         const icon = options.tabBarIcon;

  //         const isFocused = state.index === index;

  //         const onPress = () => {
  //           const event = navigation.emit({
  //             type: 'tabPress',
  //             target: route.key,
  //             canPreventDefault: true,
  //           });

  //           if (!isFocused && !event.defaultPrevented) {
  //             // The `merge: true` option makes sure that the params inside the tab screen are preserved
  //             navigation.navigate({name: route.name, merge: true});
  //           }
  //         };

  //         if (index === 2) {
  //           return (
  //             <TouchableOpacity
  //               key={`${index}`}
  //               onPress={onPress}
  //               activeOpacity={1}
  //               style={{flex: 1}}>
  //               <View style={{flex: 1, alignItems: 'center'}}>
  //                 <View
  //                   style={{
  //                     backgroundColor: Colors.greyThin,
  //                     width: 86,
  //                     height: 80,
  //                     bottom: -2,
  //                     position: 'absolute',
  //                     borderTopLeftRadius: 43,
  //                     borderTopRightRadius: 43,
  //                     justifyContent: 'flex-end',
  //                   }}>
  //                   <View
  //                     style={{
  //                       backgroundColor: 'white',
  //                       width: '100%',
  //                       height: '64%',
  //                     }}
  //                   />
  //                 </View>
  //                 <View
  //                   style={{
  //                     width: 70,
  //                     height: 70,
  //                     justifyContent: 'center',
  //                     alignItems: 'center',
  //                     backgroundColor: 'white',
  //                     borderTopLeftRadius: 35,
  //                     borderTopRightRadius: 35,
  //                     position: 'absolute',
  //                     flex: 1,
  //                     bottom: 1,
  //                   }}>
  //                   <View style={{marginBottom: 30}}>
  //                     {!!icon && icon(isFocused)}
  //                   </View>
  //                 </View>
  //                 <Text
  //                   style={{
  //                     position: 'absolute',
  //                     bottom: 2,
  //                     color: isFocused ? '#4b4b4b' : Colors.greyLight,
  //                   }}>
  //                   {label}
  //                 </Text>
  //               </View>
  //             </TouchableOpacity>
  //           );
  //         }

  //         return (
  //           <TouchableOpacity
  //             key={`${index}`}
  //             onPress={onPress}
  //             activeOpacity={1}
  //             style={{flex: 1}}>
  //             <View
  //               style={{
  //                 width: '100%',
  //                 paddingTop: 5,
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //                 backgroundColor: 'white',
  //                 borderTopWidth: 6,
  //                 borderColor: Colors.greyThin,
  //               }}>
  //               {!!icon && icon(isFocused)}
  //               <Text
  //                 style={{
  //                   backgroundColor: 'white',
  //                   color: isFocused ? '#4b4b4b' : Colors.greyLight,
  //                 }}>
  //                 {label}
  //               </Text>
  //             </View>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   );
  // }

  function MyTabBar({state, descriptors, navigation}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          bottom: 0,
          paddingBottom: insets.bottom / 1.5,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderLeftWidth: StyleSheet.hairlineWidth,
          borderRightWidth: StyleSheet.hairlineWidth,
          borderColor: Colors.greyThin,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderBottomWidth: 0,
          position: 'absolute',
          backgroundColor: 'white',

          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel;
          const icon = options.tabBarIcon;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          return (
            <TouchableOpacity
              key={`${index}`}
              onPress={onPress}
              activeOpacity={1}
              style={{flex: 1}}>
              <View
                style={{
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {!!icon && icon(isFocused)}
                <Text
                  style={{
                    color: isFocused ? '#4b4b4b' : Colors.greyLight,
                    fontSize: Sizes.h6,
                    marginTop: 4,
                  }}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <Tab.Navigator
      sceneContainerStyle={{paddingBottom: 65}}
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}>
      <Tab.Screen
        name="TabOneNavigator"
        component={TabOneNavigator}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarIcon: isFocused => {
            return isFocused ? (
              <Svgs.TrangChuActive />
            ) : (
              <Svgs.TrangChuInactive />
            );
          },
        })}
      />

      <Tab.Screen
        name="TabTwoNavigator"
        component={AllStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: Strings.Gift,
          tabBarIcon: isFocused => {
            return isFocused ? (
              <Svgs.QuaTangActive />
            ) : (
              <Svgs.QuaTangInactive />
            );
          },
        }}
        initialParams={{
          initialRouteName: 'Gift',
        }}
      />

      <Tab.Screen
        name="TabThreeNavigator"
        component={AllStackNavigator}
        options={{
          tabBarLabel: Strings.Booking,
          tabBarIcon: isFocused => {
            return isFocused ? <Svgs.DatHenActive /> : <Svgs.DatHenInactive />;
          },
        }}
        initialParams={{
          initialRouteName: 'Booking',
        }}
      />
      <Tab.Screen
        name="TabFourNavigator"
        component={AllStackNavigator}
        options={{
          tabBarLabel: Strings.History,
          tabBarIcon: isFocused => {
            return isFocused ? <Svgs.LichSuActive /> : <Svgs.LichSuInactive />;
          },
        }}
        initialParams={{
          initialRouteName: 'History',
        }}
      />
      <Tab.Screen
        name="TabFiveNavigator"
        component={AllStackNavigator}
        options={{
          tabBarLabel: Strings.About_caron,
          tabBarIcon: isFocused => {
            return isFocused ? <Svgs.CaronActive /> : <Svgs.CaronInactive />;
          },
        }}
        initialParams={{
          initialRouteName: 'Introduction',
        }}
      />
    </Tab.Navigator>
  );
};
export default MainNavigator;
