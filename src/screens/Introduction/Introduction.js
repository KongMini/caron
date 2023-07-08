import React from 'react';
import {ScrollView} from 'react-native';

import {AppContainer} from '../../elements';
import {Convert} from '../../utils';
import Banner from './items/Banner';
import Header from './items/Header';
import List from './items/List';

function Introduction({navigation}) {
  const DataRendering = [
    {
      component: Header,
      config: {
        navigation: navigation,
      },
    },
    {
      component: Banner,
    },
    {
      component: List,
      config: {
        navigation: navigation,
      },
    },
  ];

  return (
    <AppContainer style={{marginBottom: 0}}>
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        {DataRendering.map((item, index) => {
          const Component = item.component;
          const children = Convert.dataRenderingChildren({item});
          return (
            <Component key={`${index}`} {...item.config}>
              {children}
            </Component>
          );
        })}
      </ScrollView>
    </AppContainer>
  );
}

export default Introduction;
