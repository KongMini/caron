import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

import {isIOS} from '../../resource';
import {FetchApi} from '../FetchApi';
// import {FetchApi} from '../FetchApi';
import {NotificationLocal} from './NotificationLocal';

let appHasActive = false;
class NotificationHandler {
  handleNoti = notification => {
    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
    if (isIOS) {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  };
  handleRegister = async token => {
    console.log('token', token);
    const result = await FetchApi.deviceToken({deviceToken: token.token});
    if (result._msg_code === 1) {
      console.log('resulttoekn', result);
      NotificationLocal.set({deviceToken: token.token});
    }
    if (typeof this._onRegister === 'function') {
      this._onRegister(token);
    }
  };
  onNotification(notification) {
    if (notification.foreground || appHasActive) {
      this.handleNoti(notification);
    } else {
      if (this.notificationTimeout) {
        clearTimeout(this.notificationTimeout);
      }
      this.notificationTimeout = setTimeout(() => {
        this.handleNoti(notification);
      }, 1500);
    }
  }

  async onRegister(token) {
    // console.log('NotificationHandler:', token);
    appHasActive = true;

    const currentToken = await NotificationLocal.get();
    // if (currentToken !== token.token) {
    if (currentToken && token.token) {
      this.handleRegister(token);
    } else {
      if (this.registerTimeout) {
        clearTimeout(this.registerTimeout);
      }
      this.registerTimeout = setTimeout(() => {
        this.handleRegister(token);
      }, 2000);
    }
  }

  onAction(notification) {
    // console.log('Notification action received:');
    // console.log(notification.action);
    // console.log(notification);

    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification);
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    console.log(err);
  }

  attachRegister(handler) {
    this._onRegister = handler;
  }

  attachNotification(handler) {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: handler.onRegister.bind(handler),

  // (required) Called when a remote or local notification is opened or received
  onNotification: handler.onNotification.bind(handler),

  // (optional) Called when Action is pressed (Android)
  onAction: handler.onAction.bind(handler),

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: handler.onRegistrationError.bind(handler),

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: false,
});

export default handler;
