import React from 'react';
import {ScrollView} from 'react-native';
import {AppContainer} from '../../elements';
import {Convert} from '../../utils';
import GiftList from './items/GiftList';
import Header from './items/Header';

const Gift = ({navigation}) => {
  const DataRendering = [
    {
      component: Header,
    },
    {
      component: GiftList,
      config: {
        navigation: navigation,
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
};

export default Gift;
