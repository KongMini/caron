import dayjs from 'dayjs';
import React from 'react';
import {View} from 'react-native';
import {AppIcon, AppText} from '../../../elements';
import {useGetMyCar} from '../../../hooks';
import {Sizes, useAppLanguage, useAppTheme} from '../../../utils';

const ListCar = ({navigation}) => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const {myCar} = useGetMyCar();

  const data = myCar?._data || [];

  return (
    <View>
      {data.map((item, index) => {
        const isRegistryDeadline =
          dayjs(item.registry_deadline, 'YYYY/MM/DD').diff(dayjs(), 'days') <=
          28;
        const color = isRegistryDeadline ? Colors.primary : undefined;
        return (
          <View
            key={`${index}`}
            style={{
              flexDirection: 'row',
              borderBottomWidth: data.length - 1 === index ? 10 : 0,
              borderColor: '#F5F7FB',
            }}>
            <View
              style={{
                width: '44%',
                borderRightWidth: 1,
                borderColor: Colors.greyThin,
                borderTopWidth: index !== 0 ? 1 : 0,
                padding: Sizes.padding / 2,
              }}>
              <AppText style={{color, marginBottom: 6, fontSize: Sizes.h6}}>
                {item.name}
              </AppText>
              <AppText style={{color, fontSize: Sizes.h6}}>
                {Strings.License_plates}: {item.license_plates}
              </AppText>
            </View>
            <View
              style={{
                padding: Sizes.padding / 2,
                flexDirection: 'row',
                borderTopWidth: index === 1 ? 1 : 0,
                borderColor: Colors.greyThin,
                flex: 1,
              }}>
              <View style={{flex: 1}}>
                <AppText style={{color, fontSize: 12, marginBottom: 6}}>
                  {Strings.Han_kiem_dinh}: {item.registry_deadline}
                </AppText>
                <AppText style={{fontSize: 12, marginBottom: 6}}>
                  {Strings.Civil_liability_insurance_deadline_2}:{' '}
                  {item.civil_liability_insurance_deadline}
                </AppText>
                <AppText style={{color, fontSize: 12}}>
                  {Strings.Physical_insurance_deadline_2}:{' '}
                  {item.physical_insurance_deadline}
                </AppText>
              </View>
              <View style={{justifyContent: 'center', marginLeft: 6}}>
                <AppIcon
                  onPress={() => navigation.navigate('MyCar', {car: item})}
                  hitSlop
                  type="FontAwesome5"
                  icon="edit"
                  size={Sizes.h4}
                  color={Colors.greyLight}
                />
              </View>
            </View>
          </View>
        );
      })}
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: Colors.greyThin,
          padding: Sizes.padding / 2,
        }}>
        <AppText>{Strings.Notification.toUpperCase()}</AppText>
      </View>
    </View>
  );
};

export default ListCar;
