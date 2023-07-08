import MMKVStorage from 'react-native-mmkv-storage';
import messaging from '@react-native-firebase/messaging';
import {getSystemVersion, getSystemName} from 'react-native-device-info';
import {InAppNotificationService} from './Notification';
import {LanguageService} from './Language';
import {FetchApi} from './FetchApi';
// import {Clipboard} from 'react-native';
import {getBadgeLocal, setBadgeLocal} from '../../hooks/useNotificationBadge';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    await messaging().registerDeviceForRemoteMessages();
    getFCMToken();
  }
}

const tag = 'fcmToken';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;

async function getFCMToken() {
  const MMKVwithID = new MMKVStorage.Loader()
    .withInstanceID(mmkvId)
    .initialize();

  const fcmToken = MMKVwithID.getMap(mmkvKey);
  // Clipboard.setString(`${fcmToken?.token}`);

  if (!fcmToken?.token) {
    try {
      let token = await messaging().getToken();
      // Clipboard.setString(`${token}`);
      if (token) {
        const item = {
          device_token: token,
          osname: getSystemName(),
          osvesion: getSystemVersion(),
        };
        const result = await FetchApi.createDevice(item);
        MMKVwithID.setMap(mmkvKey, {token: token});
      } else {
      }
    } catch (error) {
      console.log('fcmToken error', error.message);
    }
  }
}

function handleNoti(notification, callback) {
  try {
    if (notification) {
      const clone = {...getBadgeLocal()};
      clone.all = clone.all + 1;
      setBadgeLocal(clone);
      callback && callback(notification);
    }
  } catch (error) {
    console.log('error', error);
  }
}

function notificationListener(callback) {
  messaging().onNotificationOpenedApp(remoteMessage => {
    //   'Notification caused app to open from background state (onClickNoti)',
    console.log('onNotificationOpenedApp', remoteMessage.notification);
    handleNoti(remoteMessage?.notification, callback);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage?.notification,
      );
      handleNoti(remoteMessage?.notification, callback);
    });

  messaging().onMessage(async ({notification}) => {
    console.log('notification on foreground mode', notification);
    const Strings = LanguageService.get();
    const notificationObject = {
      appTitle: Strings.App_name,
      timeText: Strings.Now,
      onPress: () => callback(notification),
    };
    notificationObject.title = notification?.title || notification?.data?.title;
    notificationObject.body =
      notification?.message ||
      notification?.data?.message ||
      notification?.body;
    InAppNotificationService.set(notificationObject);
    const clone = {...getBadgeLocal()};
    clone.all = clone.all + 1;
    setBadgeLocal(clone);
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}

const FirebasePushNotificationHelper = {
  requestUserPermission,
  getFCMToken,
  notificationListener,
};

export {FirebasePushNotificationHelper};
