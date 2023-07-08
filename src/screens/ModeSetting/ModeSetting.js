import React from 'react';

import {AppContainer} from '../../elements';
import {Convert, useAppLanguage} from '../../utils';

import {ModeList} from './items';

const ModeSetting = () => {
  const {Strings} = useAppLanguage();

  const DataRendering = [
    // {
    //   component: AppHeader,
    //   config: {
    //     leftGoBack: true,
    //     title: Strings.Mode,
    //   },
    // },
    {
      component: ModeList,
    },
  ];

  return (
    <AppContainer>
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
};
export default ModeSetting;
