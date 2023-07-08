import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {AppContainer, AppHeader, ErrorView, Loading} from '../../elements';
import {useGetMyCar} from '../../hooks';
import {Convert, useAppLanguage} from '../../utils';
import MyCarForm from './items/MyCarForm';
import MyCarList from './items/MyCarList';

function MyCar({navigation, route}) {
  const {myCar, isFetching1, isLoading1, refetch1, error1} = useGetMyCar(1);

  const {Strings} = useAppLanguage();
  const [selectedCar, setSelectedCar] = useState(route.params?.car);

  let DataRendering = [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.My_car.toUpperCase(),
      },
    },
  ];

  if (isLoading1 || isFetching1) {
    DataRendering = [
      ...DataRendering,
      {
        component: Loading,
      },
    ];
  }

  if (myCar?._msg_code !== 1) {
    DataRendering = [
      ...DataRendering,
      {
        component: ErrorView,
        config: {title: myCar?.message},
      },
    ];
  } else {
    DataRendering = [
      ...DataRendering,
      {
        component: ScrollView,
        children: [
          {
            component: MyCarList,
            config: {
              data: myCar?._data,
              setSelectedCar: setSelectedCar,
              selectedCar: selectedCar,
              refetch: refetch1,
            },
          },
          {
            component: MyCarForm,
            config: {
              selectedCar: selectedCar,
              refetch: refetch1,
              setSelectedCar: setSelectedCar,
            },
          },
        ],
      },
    ];
  }

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

export default MyCar;
