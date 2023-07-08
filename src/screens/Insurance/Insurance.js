import React from 'react';

import {AppContainer, AppHeader} from '../../elements';
import {Convert, useAppLanguage, useAppTheme} from '../../utils';
import List from './items/List';

export default function Insurance({navigation}) {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  let DataRendering = [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.Remind_insurance.toUpperCase(),
      },
    },
    {
      component: List,
      config: {navigation},
    },
  ];

  return (
    <AppContainer style={{backgroundColor: Colors.background_2}}>
      {DataRendering.map((item, index) => {
        const Component = item.component;
        const children = Convert.dataRenderingChildren({item});
        return (
          <Component key={`${index}`} {...item.config}>
            {children}
          </Component>
        );
      })}
    </AppContainer>
  );
}
