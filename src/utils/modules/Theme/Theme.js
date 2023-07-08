/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

import {CheckLogic, Colors} from '../../resource';

const tag = 'theme';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`; //Colors

const MMKVwithID = new MMKVStorage.Loader().withInstanceID(mmkvId).initialize();

const ModeService = {
  setCode: code => {
    MMKVwithID.setString(`${mmkvKey}`, code);

    return;
  },
  getCode: () =>
    MMKVwithID.getString(`${mmkvKey}`) || CheckLogic.Theme.base_device,
};

const convertForBaseOnDevice = (currentCode, scheme) => {
  if (currentCode === CheckLogic.Theme.dark) {
    return Colors.dark;
  }
  if (currentCode === CheckLogic.Theme.light) {
    return Colors.light;
  }
  //base on device
  if (!scheme) {
    //init data
    scheme = Appearance.getColorScheme();
  }
  if (scheme === CheckLogic.Theme.dark) {
    return Colors.dark;
  }
  return Colors.light;
};

function useAppTheme() {
  const [code, setCode] = useMMKVStorage(mmkvKey, MMKVwithID);

  const [colors, setColors] = useState(() => convertForBaseOnDevice('light'));

  useEffect(() => {
    const colorConvert = convertForBaseOnDevice(code);
    if (colorConvert.background !== colors.background) {
      setColors(colorConvert);
    }
  }, [code]);

  useEffect(() => {
    let removeListener;
    let firstTime = true;
    if (ModeService.getCode() === CheckLogic.Theme.base_device) {
      const listener = scheme => {
        if (firstTime) {
          firstTime = false;
          return;
        }
        const currentCode = ModeService.getCode();
        //check for base_device theme listener
        const color = convertForBaseOnDevice(currentCode, scheme);
        if (color.background !== colors.background) {
          setColors(color);
        }
      };
      if (removeListener && typeof removeListener === 'function') {
        removeListener();
      }
      removeListener = Appearance.addChangeListener(listener);
    }
    return () => {
      if (removeListener && typeof removeListener === 'function') {
        removeListener();
      }
    };
  }, []);

  return {Colors: colors, code};
}
const MMKVTheme = MMKVwithID;
export {useAppTheme, ModeService, MMKVTheme};
