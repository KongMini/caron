import React, {useRef, useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';

import NotificationPopup from 'react-native-push-notification-popup';
import RNBootSplash from 'react-native-bootsplash';

import {
  InAppNotificationService,
  MMKVTheme,
  navigationRef,
  useAppTheme,
} from './utils';
import linking from './linking';

import AppIntro from './screens/AppIntro/AppIntro';
import MainNavigator from './navigators/MainNavigator';
import Web from './screens/Web/Web';
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import CsBaoHanh from './screens/CsBaoHanh/CsBaoHanh';
import ForgotPassword from './screens/ForgotPassword/ForgotPassword';
import {Appearance, StatusBar, View} from 'react-native';
import HeaderApp from './navigators/items/HeaderApp';
import Menu from './screens/Menu/Menu';
import {ModalCustom} from './utils/modules/ModalCustom/ModalCustom';
import * as NavigationService from './utils';
import FloatMenu from './screens/FloatMenu/FloatMenu';
import {useMMKVStorage} from 'react-native-mmkv-storage';

const Drawer = createDrawerNavigator();

const StackMain = createStackNavigator();

const SlideDraw = () => {
  return (
    <Drawer.Navigator
      drawerType={'back'}
      drawerContent={({navigation}) => <Menu navigation={navigation} />}>
      <Drawer.Screen
        name="MainStack"
        component={MainStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
const MainStack = ({navigation, route}) => {
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    if (NavigationService.getCurrentRoute() === 'Gift') {
      setIsShow(false);
    } else {
      if (!isShow) {
        setIsShow(true);
      }
    }
  }, [route]);

  return (
    <View style={{flex: 1}}>
      {isShow && <HeaderApp navigation={navigation} />}
      <StackMain.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <StackMain.Screen name="Main" component={MainNavigator} />
        <StackMain.Screen name="Web" component={Web} />
      </StackMain.Navigator>
    </View>
  );
};

function AppContent() {
  const popupRef = useRef(null);
  const {Colors} = useAppTheme();
  const [code] = useMMKVStorage('key-theme', MMKVTheme);

  useEffect(() => {
    InAppNotificationService.onChange(
      {key: 'InAppNotificationService-foregound'},
      data => {
        popupRef.current.show(data);
      },
    );
  }, []);

  return (
    <SafeAreaProvider initialWindowMetrics={initialWindowMetrics}>
      <StatusBar
        animated={true}
        backgroundColor="black"
        // barStyle={code === 'light' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer
        ref={navigationRef}
        linking={linking}
        theme={{
          ...DefaultTheme,
          colors: {
            primary: Colors.primary,
            background: Colors.background,
            text: Colors.text,
          },
        }}
        onReady={() => {
          RNBootSplash.hide({fade: true});
        }}>
        <StackMain.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <StackMain.Screen name="AppIntro" component={AppIntro} />
          <StackMain.Screen name="Login" component={Login} />
          <StackMain.Screen name="Register" component={Register} />
          <StackMain.Screen name="ForgotPassword" component={ForgotPassword} />
          <StackMain.Screen name="SlideDraw" component={SlideDraw} />
        </StackMain.Navigator>
      </NavigationContainer>
      <NotificationPopup ref={popupRef} />
      <FloatMenu />
      <ModalCustom />
    </SafeAreaProvider>
  );
}

export default AppContent;
