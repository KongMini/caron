import React from 'react';

import {AppButton, AppContainer, AppHeader} from '../../elements';
import {Convert, useAppLanguage} from '../../utils';
import ListNotification from './items/ListNotification';

function RemindAccreditation({navigation}) {
  const {Strings} = useAppLanguage();

  const DataRendering = [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.Han_kiem_dinh.toUpperCase(),
        renderRight: () => (
          <AppButton
            title={Strings.Update}
            type="primary"
            style={{
              paddingVertical: 4,
              paddingHorizontal: 10,
              marginHorizontal: -10,
            }}
            onPress={() => navigation.navigate('MyCar')}
          />
        ),
      },
    },
    {component: ListNotification, config: {navigation: navigation}},
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

export default RemindAccreditation;
