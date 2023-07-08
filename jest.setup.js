require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();
jest.useFakeTimers();

jest.mock('react-native-device-info', () =>
  require('react-native-device-info/jest/react-native-device-info-mock'),
);

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);
jest.mock('react-native-push-notification', () => ({
  configure: jest.fn(),
  onRegister: jest.fn(),
  onNotification: jest.fn(),
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
}));
jest.mock('@react-native-community/push-notification-ios', () => ({
  finish: jest.fn(),
}));
