import {AccountService} from './Account';
import * as NavigationService from './NavigationService';

const ResetFunction = {
  //fix crash when navigatio is not ready
  resetToHome: navigation => {
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'SlideDraw',
            params: {
              name: 'Main',
              params: {
                screen: 'TabOneNavigator',
              },
            },
          },
        ],
      });
      return;
    }

    NavigationService.reset({
      index: 0,
      routes: [
        {
          name: 'SlideDraw',
          params: {
            name: 'Main',
            params: {
              screen: 'TabOneNavigator',
            },
          },
        },
      ],
    });
  },
  resetToLogin: navigation => {
    // AccountService.set();

    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      });
      return;
    }
    NavigationService.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  },
};

export {ResetFunction};
