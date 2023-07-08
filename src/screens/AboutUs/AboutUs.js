import React from 'react';
import {} from 'react-native';
import {AppContainer} from '../../elements';
import {Convert} from '../../utils';

import {ContactAt, Description, Title} from './items';

// import {} from './items';

const AboutUs = () => {
  const DataRendering = [
    // {
    //   component: AppHeader,
    //   config: {
    //     leftGoBack: true,
    //   },
    // },
    {
      component: Title,
    },
    {
      component: Description,
    },
    {
      component: ContactAt,
    },
  ];

  //f
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

export default AboutUs;
