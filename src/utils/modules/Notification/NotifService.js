import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';

export class NotifService {
  constructor({onRegister, onNotification}) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    PushNotification.getChannels(function (channels) {
      console.log({channels});
    });
  }

  // popInitialNotification() {
  //   PushNotification.popInitialNotification((notification) =>
  //     console.log('InitialNotication:', notification),
  //   );
  // }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  // cancelNotif() {
  //   PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  // }

  // cancelAll() {
  //   PushNotification.cancelAllLocalNotifications();
  // }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }
}
