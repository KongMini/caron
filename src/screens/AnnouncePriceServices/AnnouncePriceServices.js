import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';

import {AppContainer, AppHeader, Loading} from '../../elements';
import {Convert, FetchApi, useAppLanguage} from '../../utils';
import RequestAnnounceService from './items/RequestAnnounceService';
import CreateRequest from './items/CreateRequest';
import SeeRequest from './items/SeeRequest';
import {useQuery} from 'react-query';

const AnnouncePriceServices = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {data, isLoading, refetch, isFetching} = useQuery(
    `AnnouncePriceService`,
    () => FetchApi.getListBaoGia(),
  );

  const {control, handleSubmit, setValue, getValues, reset} = useForm({
    mode: 'all',
  });

  //Request_announce_service, Create_request_announce_price, See_request_announce_price
  const [screen, setScreen] = useState('Request_announce_service');

  const onGoBack = () => {
    if (screen === 'Request_announce_service') {
      navigation.goBack();
    }
    if (screen === 'Create_request_announce_price') {
      setScreen('Request_announce_service');
    }
    if (screen === 'See_request_announce_price') {
      setScreen('Request_announce_service');
      reset();
    }
  };

  const getScreen = () => {
    const props = {
      setScreen: setScreen,
      control: control,
      setValue: setValue,
      handleSubmit: handleSubmit,
      getValues: getValues,
      reset: reset,
      refetch: refetch,
      data: data,
    };
    switch (screen) {
      case 'Request_announce_service':
        return {
          component: RequestAnnounceService,
          config: props,
        };
      case 'Create_request_announce_price':
        return {
          component: CreateRequest,
          config: props,
        };
      case 'See_request_announce_price':
        return {
          component: SeeRequest,
          config: props,
        };
    }
  };

  let DataRendering = [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings[screen].toUpperCase(),
        onPressLeft: onGoBack,
      },
    },
    {...getScreen()},
  ];

  if (isLoading || isFetching) {
    DataRendering = [
      {
        component: AppHeader,
        config: {
          isChild: true,
          leftGoBack: true,
          title: Strings[screen].toUpperCase(),
          onPressLeft: onGoBack,
        },
      },
      {
        component: Loading,
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
};

export default AnnouncePriceServices;
