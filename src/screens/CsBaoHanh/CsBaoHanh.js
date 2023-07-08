import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {AppContainer, AppHeader, ErrorView, Loading} from '../../elements';
import {useGetMyCar} from '../../hooks';
import {Convert, useAppLanguage, AccountService} from '../../utils';
import List from './items/List';
import Search from './items/Search';
import { useFocusEffect } from '@react-navigation/native';

function CsBaoHanh(navigation) {//{navigation, route}
  // const [isRefreshing, setIsRefreshing] = useState();
  // setIsRefreshing(true)
  // console.log("List: ", list);

  // const {myCar, isFetching1, isLoading1, refetch1, error1} = useGetMyCar(1);
  const account = AccountService.get();
  const {Strings} = useAppLanguage();
  // const [selectedCar, setSelectedCar] = useState(route.params?.car);
  
  let DataRendering = [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.CsBaoHanh.toUpperCase(),
      },
    },
  ];

  // if (isLoading1 || isFetching1) {
  //   DataRendering = [
  //     ...DataRendering,
  //     {
  //       component: Loading,
  //     },
  //   ];
  // }

  const [api, SetApi] = useState("")
   // Lấy danh sách bảo hành
  async function fetchData() {
    try {
      
      // api danh sách bảo hành =======================
      // const phone = account.phone;
      let data_api = account.user_info.phone;
      console.log("Data diện thoại", data_api)
      // 

      let response = await fetch('http://apicaron.cibos.vn/api/bss/baohanh/GetListBaoHanhByPhone?phone='+data_api, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data_api)
        }
      );
      let data = await response.json();
      console.log("Data", response)
      let result = data.Results;
      SetApi(result)
      return () => {
        data = false; // component is unmounted, cancel async tasks
        result = false;
      };
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  
  useFocusEffect(
    React.useCallback(() => {
      // const unsubscribe = API.subscribe(userId, user => setUser(user));
      fetchData()
      return () => fetchData();
    }, [])
  );

  // useEffect(() => {fetchData()}, []);
  console.log("API", api)

  

  // if (myCar?._msg_code !== 1) {
  //   DataRendering = [
  //     ...DataRendering,
  //     {
  //       component: ErrorView,
  //       config: {title: myCar?.message},
  //     },
  //   ];
  // } else {
  DataRendering = [
    ...DataRendering,
    {
      component: ScrollView,
      children: [
        {
          component: Search,
          config: {
            data_api: api,
            // selectedCar: selectedCar,
            // refetch: refetch1,
            // setSelectedCar: setSelectedCar,
          },
        },
        {
          component: List,
          config: {
            data: api,
            // setSelectedCar: setSelectedCar,
            // selectedCar: selectedCar,
            // refetch: refetch1,
          },
        },
      ],
    },
  ];
  // }
  console.log("aaaaaa");
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

export default CsBaoHanh;
