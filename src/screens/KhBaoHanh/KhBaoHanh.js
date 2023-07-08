import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {AppContainer, AppHeader, ErrorView, Loading} from '../../elements';
import {useGetMyCar} from '../../hooks';
import {Convert, useAppLanguage} from '../../utils';

import QrCode from './items/QrCode';

function KhBaoHanh({navigation, route}) {
  // const {myCar, isFetching1, isLoading1, refetch1, error1} = useGetMyCar(1);

  const {Strings} = useAppLanguage();
  // const [selectedCar, setSelectedCar] = useState(route.params?.car);
  // console.log("route", route.params)
  let DataRendering = [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.KhBaoHanh.toUpperCase(),
      },
    },
  ];

  DataRendering = [
    ...DataRendering,
    {
      component: ScrollView,
      children: [
        {
          component: QrCode,
          config: {
            data_api: route.params,
          }
        },
        
      ],
    },
  ];
  // }

  return (
    <AppContainer style={{marginBottom: 50}}>
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

export default KhBaoHanh;
