import React from 'react';
import {ScrollView} from 'react-native';

import {AppContainer, AppHeader} from '../../elements';
import {Convert, useAppLanguage} from '../../utils';
import List from './items/List';

function Rescue({navigation}) {
  const {Strings} = useAppLanguage();

  const DataRendering = [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.List_rescue.toUpperCase(),
      },
    },
    {
      component: List,
      config: {navigation: navigation},
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

export default Rescue;
