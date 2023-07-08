import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

const MMKVwithID = new MMKVStorage.Loader()
  .withInstanceID('default-mmkv-id')
  .initialize();

const useStorage = key => {
  const [value, setValue] = useMMKVStorage(key, MMKVwithID);
  return [value, setValue];
};

export {MMKVwithID, useStorage};
