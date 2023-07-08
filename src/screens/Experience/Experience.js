import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';

import {AppContainer, AppHeader} from '../../elements';
import {Convert, useAppLanguage} from '../../utils';
import List from './items/List';
import TabBar from './items/TabBar';

function Experience({navigation}) {
  const {Strings} = useAppLanguage();
  const {control, setValue} = useForm({
    mode: 'all',
  });

  const DataRendering = [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.Experience.toUpperCase(),
      },
    },
    {
      component: TabBar,
      config: {control: control, setValue: setValue},
    },
    {
      component: List,
      config: {
        control: control,
        navigation: navigation,
        setValue: setValue,
      },
    },
  ];

  return (
    <AppContainer style={{marginBottom: 0}}>
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

export default Experience;
