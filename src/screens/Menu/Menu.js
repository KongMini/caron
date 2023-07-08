import React from 'react';

import {AppContainer} from '../../elements';
import {Convert} from '../../utils';

import {MenuFunction, MenuExtra} from './items';

const Menu = () => {
  const DataRendering = [
    {
      component: MenuFunction,
    },
    {
      component: MenuExtra,
    },
  ];

  return (
    <AppContainer edges={['top', 'left', 'right']}>
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

export default Menu;
