import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {AppContainer} from '../../elements';
import {
  Sizes,
  Convert,
  FetchApi,
  FirebasePushNotificationHelper,
  useFocusRefetch,
} from '../../utils';

import CaronWallet from './items/CaronWallet';
import FavoriteServices from './items/FavoriteServices';
import Banner from './items/Banner';
import CaronServices from './items/CaronServices';
import Suggestions from './items/Suggestions';
import {useNotificationBadge} from '../../hooks';
import {useQuery} from 'react-query';
import { AccountService } from '../../utils';

const TopPage = ({navigation}) => {
  const [isRefreshing, setIsRefreshing] = useState();
  const timeout = useRef();

  const {badge, setBadge} = useNotificationBadge();
  const {data} = useQuery([`useGetListNotification-${1}`], () =>
    FetchApi.getListNoti(),
  );
  useFocusRefetch(`useGetListNotification-${1}`);

  const account = AccountService.get();
  console.log("account ", account)

  async function fetchData() {
    try {
      
      // api đăng ký =======================
      //email: account.user_info.username+ "@Caron.vn",
      const data_api = {
        name: account.user_info.first_name + " " + account.user_info.last_name,
        email: account.user_info.username,
        phone: account.user_info.username,
        password: account.user_info.username
      };
      console.log("Data đăng kí", data_api)
      // đăng ký xe 
      const response = await fetch('http://150.95.115.93:8082/api/users/register', 
      // const response = await fetch('http://150.95.115.93:8082/api/users/', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data_api)
        }
      );
      const data = await response.text();
      console.log("Đăng ký", data)
      
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {fetchData()}, []);

  useEffect(() => {
    if (Array.isArray(data?._data)) {
      let countNoti = 0;
      data?._data.forEach(item => {
        if (item.status === 0) {
          countNoti = countNoti + 1;
        }
      });
      const newBadge = {...badge, all: countNoti};
      setBadge(newBadge);
    }
  }, [data]);

  useEffect(() => {
    FirebasePushNotificationHelper.requestUserPermission();
    FirebasePushNotificationHelper.notificationListener(e => {
      console.log('e', e);
      if (e?.body?.data?.id) {
        navigation.push('NotificationDetail', {dataProps: id});
        return;
      }
      navigation.push('Notification');
    });
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);


  var children_array = [];
  if(Sizes.device_width < Sizes.device_height){
    children_array = [
      {
        component: CaronWallet,
        config: {isRefreshing: isRefreshing},
      },
      {
        component: FavoriteServices,
        config: {navigation: navigation},
      },
      {
        component: Banner,
        config: {isRefreshing: isRefreshing},
      },
      {
        component: CaronServices,
      },
      {
        component: Suggestions,
        config: {isRefreshing: isRefreshing},
      },
      // {
      //   component: FloatMenu,
      //   config: {navigation: navigation},
      // },
    ];
  }else{
    children_array = [
      {
        component: CaronWallet,
        config: {isRefreshing: isRefreshing},
      },
      {
        component: FavoriteServices,
        config: {navigation: navigation},
      },
      {
        component: CaronServices,
      },
      {
        component: Suggestions,
        config: {isRefreshing: isRefreshing},
      }
    ]
  }

  const DataRendering = [
    {
      component: ScrollView,
      config: {
        contentContainerStyle: {paddingBottom: 80},
        refreshControl: (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              timeout.current = setTimeout(() => {
                setIsRefreshing(false);
              }, 2000);
            }}
          />
        ),
      },
      children: children_array,
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

export default TopPage;
