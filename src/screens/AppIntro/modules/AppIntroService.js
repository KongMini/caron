import {CheckLogic, MMKVwithID} from '../../../utils';

const {app_intro} = CheckLogic.Storage_key;

const AppIntroService = {
  set: hasShow => {
    MMKVwithID.setBool(app_intro, !!hasShow, (err, result) => {
      console.log('err', hasShow, err, result);
    });
  },
  get: () => {
    const hasShow = MMKVwithID.getBool(app_intro);
    return {
      hasShow,
    };
  },
};

// const useAppIntro = () => {
//   const [hasShow, setHasShow] = useStorage(app_intro);
//   return {hasShow, data, setHasShow};
// };

export {AppIntroService};
