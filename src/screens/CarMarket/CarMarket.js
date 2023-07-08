import React from 'react';
import {useForm} from 'react-hook-form';
import {AppContainer, AppHeader} from '../../elements';
import {Convert, useAppLanguage, useAppTheme} from '../../utils';
import List from './items/List';

function CarMarket() {
  const {control, watch, setValue} = useForm({mode: 'all'});
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  let DataRendering = [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.Buy_sell_old.toUpperCase(),
      },
    },
    {
      component: List,
      config: {
        control: control,
        watch: watch,
        setValue: setValue,
      },
    },
  ];
  return (
    <AppContainer style={{backgroundColor: Colors.background_2}}>
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

export default CarMarket;
