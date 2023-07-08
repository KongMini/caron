import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {useQuery} from 'react-query';

import {AppContainer, AppHeader, ErrorView, Loading} from '../../elements';
import {Convert, useAppLanguage, FetchApi, useAppTheme} from '../../utils';
import AddPromotion from './items/AddPromotion';
import PromotionList from './items/PromotionList';
import PromotionReceive from './items/PromotionReceive';

function Promotion({navigation}) {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`Promotion-${1}`],
    () => FetchApi.getPromotion(),
  );

  let DataRendering = [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.Promotion_cards.toUpperCase(),
      },
    },
    {
      component: ScrollView,
      config: {
        contentContainerStyle: {paddingBottom: 50},
        refreshControl: (
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        ),
      },
      children: [
        {
          component: AddPromotion,
          config: {navigation: navigation},
        },
        {
          component: PromotionList,
          config: {
            navigation: navigation,
            data: data?._data?.dsKM,
            refetch: refetch,
          },
        },
        // {
        //   component: PromotionReceive,
        //   config: {navigation: navigation, data: data?._data?.dsKM},
        // },
      ],
    },
  ];
  if (isLoading || isFetching) {
    DataRendering = [
      {
        component: AppHeader,
        config: {
          isChild: true,
          leftGoBack: true,
          title: Strings.Promotion_cards.toUpperCase(),
        },
      },
      {
        component: Loading,
      },
    ];
  }
  if (data?._error_code === 1) {
    DataRendering = [
      {
        component: AppHeader,
        config: {
          isChild: true,
          leftGoBack: true,
          title: Strings.Promotion_cards.toUpperCase(),
        },
      },
      {
        component: ErrorView,
        config: {title: data.message || data._msg},
      },
    ];
  }

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

export default Promotion;
