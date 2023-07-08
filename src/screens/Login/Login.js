import React from 'react';
import { NativeModules } from 'react-native';
import {AppContainer} from '../../elements';
import {Convert} from '../../utils';

import {FormLogin} from './items';


const Login = () => {
  const DataRendering = [
    {
      component: FormLogin,
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
export default Login;
