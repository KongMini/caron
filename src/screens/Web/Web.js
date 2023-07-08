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
      
    //   const data_api = {
    //     "attributes": {"77A-123.49\\deviceImage":"device.jpeg"},
    //     "groupId": 0,
    //     "name": "Ferrari F8",
    //     "uniqueId": "30F-771.15",
    //     "status": "offline",
    //     "lastUpdate": null,
    //     "positionId": 0,
    //     "phone": "09123456",
    //     "model": "XV20",
    //     "contact": "455 HQV",
    //     "category": "car",
    //     "disabled": false,
    //     "expirationTime": null
    // };
    //   console.log("Data xe đăng kí", data_api)

    //   // đăng ký xe 
    //   const response = await fetch('http://150.95.115.93:8082/api/devices', 
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(data_api)
    //     }
    //   );
    //   const data = await response.text();
    //   console.log("Xe đăng ký thành công", data)

      // api Login ==============================
      const data_api1 = new URLSearchParams();
      data_api1.append('email', account.user_info.username);
      data_api1.append('password', account.user_info.username);

      // data_api1.append('email','tainh02@gmail.com' );
      // data_api1.append('password', 'tainh01');

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
  
      // Second API call completed successfully
      // console.log('Data 1:', data1);
      // console.log('Data 2:', data2);

      // var obj = JSON.parse(account.user_info.toString());
      // obj.push({"tokenTracking":data2});
      // jsonStr = JSON.stringify(obj);

      // console.log(jsonStr)

      SetUrl('http://150.95.115.93:8082?token=' + data2)
      setIsLoading(false)
      
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {fetchData()}, []);


  // async function getNumbers() {
  //   try {
  //     const response = await fetch('http://150.95.115.93:8082/api/devices');
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async function fetchData2() {
  //   try {
  //     const data = await getNumbers();
  //     setListXe(data);
  //     // console.log("List xe:",data);
  //     // Tim xe:
  //     const elementToFind = "30B12345";

  //     const foundElement = data.find(element => element.uniqueId === elementToFind);

  //     if (foundElement) {
  //       console.log("Element found: ", foundElement);
  //     }else{
  //       console.log("Element not found: ");
  //     }

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {fetchData2()}, []);
  
  console.log("url", url)
  // console.log("List xe: ", listXe)

  


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
