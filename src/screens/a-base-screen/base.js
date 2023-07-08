import React from 'react';
import {} from 'react-native';
import {AppContainer, AppHeader} from '../../elements';
import {Convert} from '../../utils';

import {} from './items';
import {} from './modules';

const base = () => {
  const DataRendering = [
    {
      component: AppHeader,
      config: {
        titleLogo: true,
      },
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

export default base;
