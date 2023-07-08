import MMKVStorage from 'react-native-mmkv-storage';

const tag = 'notification';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;

const MMKVwithID = new MMKVStorage.Loader().withInstanceID(mmkvId).initialize();

const NotificationLocal = {
  set: ({deviceToken}) => {
    MMKVwithID.setString(mmkvKey, deviceToken);
  },
  remove: () => {
    MMKVwithID.setString(mmkvKey, '');
  },
  get: async () => MMKVwithID.getString(mmkvKey),
};
export {NotificationLocal};
