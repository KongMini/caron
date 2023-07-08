import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';
import {Svgs} from '../../../utils/resource/svgs';
import React from 'react';

const tag = 'customize-menu';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;

const MMKVwithID = new MMKVStorage.Loader().withInstanceID(mmkvId).initialize();

const CustomizeFavoriteServices = {
  get: () => MMKVwithID.getMap(mmkvKey),
  set: (value = {}) => MMKVwithID.setMap(mmkvKey, value),
};

function useFavoriteServices() {
  let favoriteServices = MMKVwithID.getMap(mmkvKey) || {};
  const [value, setValue] = useMMKVStorage(mmkvKey, MMKVwithID);

  if (typeof value === 'object' && Object.keys(value).length) {
    favoriteServices = value;
  } else {
    favoriteServices.official = [
      {
        key: 'Remind_mantain',
        icon: 'BaoDuong',
        isShow: true,
        onPress: {type: 'navigate', screen: 'Maintain'},
        index: 1,
      },
      {
        key: 'Remind_accreditation',
        icon: 'KiemDinh',
        onPress: {type: 'navigate', screen: 'RemindAccreditation'},
        isShow: true,
        index: 2,
      },
      {
        key: 'Remind_insurance',
        icon: 'BaoHiem',
        isShow: true,
        onPress: {type: 'navigate', screen: 'Insurance'},
        index: 3,
      },
      {
        key: 'Find_rescue',
        icon: 'CuuHo',
        isShow: true,
        onPress: {type: 'navigate', screen: 'Rescue'},
        index: 4,
      },
      {
        key: 'Find_traffic_violation',
        icon: 'TraCuuLoiXe',
        isShow: true,
        onPress: {type: 'navigate', screen: 'FindTrafficViolation'},
        index: 5,
      },
      {
        key: 'Experience',
        icon: 'KinhNghiem',
        isShow: true,
        onPress: {type: 'navigate', screen: 'Experience'},
        index: 6,
      },
      // {
      //   key: 'Incident_consulting',
      //   icon: 'TuVanSuCo',
      //   isShow: true,
      //   onPress: {type: 'navigate', screen: 'NotFound'},
      //   index: 7,
      // },
    ];
    favoriteServices.temp = [...favoriteServices.official];
    favoriteServices.allServices = [...favoriteServices.official];
    favoriteServices.allServicesTemp = [...favoriteServices.official];
  }
  return {favoriteServices, setValue};
}
export {useFavoriteServices, CustomizeFavoriteServices};
