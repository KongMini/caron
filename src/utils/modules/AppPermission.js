//TODO: uncomment if need

import {
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
  request,
} from 'react-native-permissions';
import {Platform, Alert} from 'react-native';
import {getApiLevel, getSystemVersion} from 'react-native-device-info';

import {isIOS} from '../resource';
import {LanguageService} from './Language';

const AppPermission = {
  camera: async onError => {
    const Strings = LanguageService.get();
    try {
      const resultCheck = await check(
        Platform.select({
          android: PERMISSIONS.ANDROID.CAMERA,
          ios: PERMISSIONS.IOS.CAMERA,
        }),
      );
      console.log('resultCheck', resultCheck);
      if (resultCheck === RESULTS.GRANTED) {
        return true;
      }
      if (resultCheck === RESULTS.UNAVAILABLE) {
        // ToastService.set({message: Strings.Camera_is_unavailable});
        return false;
      }

      if (resultCheck === RESULTS.BLOCKED) {
        Alert.alert(Strings.Permission, Strings.Camera_permission_denied, [
          {
            text: Strings.Setting,
            onPress: () => {
              openSettings().catch(() => {});
            },
          },
          {
            text: Strings.Cancel,
            style: 'cancel',
            onPress: onError,
          },
        ]);
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  },
  googleFit: async onError => {
    if (isIOS) {
      return true;
    }
    try {
      const apiLevel = await getApiLevel();
      if (apiLevel < 29) {
        return true;
      }
      //check ACTIVITY_RECOGNITION permission and init google fit on grant
      const resultCheck = await check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
      // console.log('resultCheck', resultCheck);
      if (resultCheck === RESULTS.GRANTED) {
        return true;
      }
      if (resultCheck === RESULTS.UNAVAILABLE) {
        // ToastService.set({message: Strings.Camera_is_unavailable});
        return false;
      }
      if (resultCheck === RESULTS.DENIED) {
        const resultRequest = await request(
          PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
        );
        if (resultRequest === RESULTS.GRANTED) {
          return true;
        }
        return false;
      }
      if (resultCheck === RESULTS.BLOCKED) {
        // Alert.alert(Strings.Permission, Strings.Step_permission_denied, [
        //   {
        //     text: Strings.Setting,
        //     onPress: () => {
        //       openSettings().catch(() => {});
        //     },
        //   },
        //   {
        //     text: Strings.Cancel,
        //     style: 'cancel',
        //     onPress: onError,
        //   },
        // ]);
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  },
  idfa: async onError => {
    try {
      if (!isIOS) {
        return true;
      }
      const systemVersion = getSystemVersion();
      console.log('systemVersion', systemVersion);
      if (systemVersion < 14) {
        return true;
      }
      //check APP_TRACKING_TRANSPARENCY permission
      const resultCheck = await check(
        PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
      );
      console.log('resultCheck', resultCheck);
      if (resultCheck === RESULTS.GRANTED) {
        return true;
      }
      if (resultCheck === RESULTS.UNAVAILABLE) {
        return false;
      }
      if (resultCheck === RESULTS.DENIED) {
        const resultRequest = await request(
          PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
        );
        if (resultRequest === RESULTS.GRANTED) {
          return true;
        }
        return false;
      }
      if (resultCheck === RESULTS.BLOCKED) {
        // Alert.alert(Strings.Permission, Strings.Step_permission_denied, [
        //   {
        //     text: Strings.Setting,
        //     onPress: () => {
        //       openSettings().catch(() => {});
        //     },
        //   },
        //   {
        //     text: Strings.Cancel,
        //     style: 'cancel',
        //     onPress: onError,
        //   },
        // ]);
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  },
};

export {AppPermission};
