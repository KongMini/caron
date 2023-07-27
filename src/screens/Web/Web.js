import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import {AppWeb,AppText, Loading} from '../../elements';
import { FetchApi } from '../../utils';
import WebView from 'react-native-webview';
import { AccountService } from '../../utils';

const Web = ({}) => {
  
  const account = AccountService.get();
  console.log("account ", account)

  const [url, SetUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [listXe, setListXe] = useState();
  // const api = "";
  async function fetchData() {
    try {
      
      // api Login ==============================
      const data_api1 = new URLSearchParams();
      data_api1.append('email', account.user_info.username);
      data_api1.append('password', account.user_info.username);


      const response1 = await fetch('http://150.95.115.93:8082/api/session', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: data_api1.toString()
        }
      );
      const data1 = await response1.json();
      console.log("Login", data1)


      // api get token ======================
      const date = new Date(); // current date and time
      date.setDate(date.getDate() + 3);
      const isoString = date.toISOString();
      console.log("isoString", isoString); 

      const data_api2 = new URLSearchParams();
      data_api2.append('expiration', isoString);

      // First API call completed successfully
      const url = `http://150.95.115.93:8082/api/session/token`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data_api2.toString()
      };
      const response2 = await fetch(url, options);
      const data2 = await response2.text();

      SetUrl('http://150.95.115.93:8082?token=' + data2)
      setIsLoading(false)
      
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {fetchData()}, []);

  console.log("url", url)

  if (isLoading) {
    return (
      <Loading />
    );
  }
  else{
    return (
      <WebView source={{ uri: url}} />
    )
  }
};

export default Web;
