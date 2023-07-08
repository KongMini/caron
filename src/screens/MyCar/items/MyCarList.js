import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {AppIcon, AppText} from '../../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme, AccountService} from '../../../utils';
import {ModalCustomServices} from '../../../utils/modules/ModalCustom/ModalCustomServices';

const MyCarList = ({selectedCar, setSelectedCar, refetch, data}) => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();

  const Item = ({item, index, last}) => {
    const isRegistryDeadline =
      dayjs(item.registryDeadline, 'DD/MM/YYYY').diff(dayjs(), 'days') <= 28;
    const isSelected = selectedCar?.id === item?.id;

    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomWidth: last ? 3 : 1,
          borderColor: last ? '#f5f7fb' : Colors.greyThin,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (item.id === selectedCar?.id) {
              setSelectedCar();
              return;
            }
            setSelectedCar(item);
          }}
          style={{
            width: '82%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: Sizes.padding,
            paddingHorizontal: Sizes.padding,
          }}>
          <AppText
            style={{
              fontWeight: isRegistryDeadline || isSelected ? 'bold' : null,
              color:
                isRegistryDeadline || isSelected ? Colors.primary : Colors.text,
            }}>
            {index + 1}. {item.name}
          </AppText>
          <AppText
            style={{
              fontWeight: isRegistryDeadline || isSelected ? 'bold' : null,
              color:
                isRegistryDeadline || isSelected ? Colors.primary : Colors.text,
            }}>
            {item.license_plates}
          </AppText>
        </TouchableOpacity>
        <AppIcon
          onPress={() => {
            Alert.alert('Bạn có chắc chắn muốn xoá xe không?', '', [
              {
                text: 'Huỷ',
                style: 'cancel',
              },
              {
                text: 'Xoá',
                onPress: async () => {
                  const result = await FetchApi.deleteMyCar(item.id);
                  if (result._msg_code == 1) {

                    //Login
                    const account = AccountService.get();


                    // api Login ==============================
                    const data_api1 = new URLSearchParams();
                    // data_api1.append('email', account.user_info.username+ "@Caron.vn");
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

                    // Lấy list car
                    const response = await fetch('http://150.95.115.93:8082/api/devices');
                    const data = await response.json();
                    console.log("data xe:", data)


                    const elementToFind = item?.license_plates;

                    console.log("Biển số xe:", elementToFind)

                    const foundElement = data.find(element => element.uniqueId === elementToFind);

                    if (foundElement) {
                      console.log("Element found: ", foundElement);
                      // Cập nhật xe
                      const data_api = {
                        "id":foundElement?.id,
                        "attributes": {"77A-123.49\\deviceImage":"device.jpeg"},
                        "groupId": 0,
                        "name": item.name,
                        "uniqueId": item.license_plates,
                        "status": "offline",
                        "lastUpdate": null,
                        "positionId": 0,
                        "phone": account.user_info.username,
                        "model": "XV20",
                        "contact": "455 HQV",
                        "category": "car",
                        "disabled": false,
                        "expirationTime": null
                      };
                      console.log("Data xe cập nhật", data_api)
            
                      // Xoá xe 
                      const response = await fetch('http://150.95.115.93:8082/api/devices/'+ foundElement?.id, 
                        {
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(data_api)
                        }
                      );
                      const data = await response.text();
                      console.log("Xe xoá thành công", data)

                    }

                    refetch();
                  } else {
                    ModalCustomServices.set({
                      title: Strings.Error,
                      titleStyle: {color: 'red'},
                      description: result?.message || Strings.something_wrong,
                    });
                  }
                },
              },
            ]);
          }}
          icon="closecircle"
          type="AntDesign"
          color={isSelected ? Colors.primary : Colors.greyThin}
          size={Sizes.h3}
          style={{marginRight: 10}}
        />
        <AppIcon
          onPress={() => {
            setSelectedCar(item);
          }}
          icon="edit"
          type="FontAwesome"
          color={isSelected ? Colors.primary : Colors.greyThin}
          size={Sizes.h2}
        />
      </View>
    );
  };

  return (
    <View>
      {data.map((item, index) => {
        return (
          <Item
            key={`${item.id}`}
            index={index}
            item={item}
            last={index === data.length - 1}
          />
        );
      })}
    </View>
  );
};

export default MyCarList;
