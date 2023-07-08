import React from 'react';
import {View, ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {
  AppButton,
  AppContainer,
  AppDropdown,
  AppHeader,
  AppText,
} from '../../elements';
import {Sizes, useAppLanguage, useAppTheme} from '../../utils';

const CARS = [{value: 'Toyota Vios MT 2014'}, {value: 'Toyota Vios MT 2017'}];

const FindTrafficSanction = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {control} = useForm();
  const [show, setShow] = React.useState(true);

  const data = {
    id: '1',
    licensePlates: '29T1XXXXX',
    licensePlatesColor: 'Đỏ',
    transportation: 'Ô tô',
    timeOfViolation: '10:23 11/11/2021',
    placeOfViolation: 'Km109 + 100 - đường Thái Nguyên - Chợ Mới',
    status: 'CHƯA XỬ PHẠT',
    unit: 'Phòng Cảnh sát giao thông, Công an BCNCMNC',
    phoneContact: '01231232122',
  };

  const onSearch = () => {
    setShow(true);
  };

  const Item = ({label, value, type}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   alignItems: 'center',
          marginVertical: 8,
        }}>
        <AppText style={{fontWeight: 'bold', width: '60%'}}>{label}:</AppText>
        {type !== 'status' ? (
          <AppText style={{textAlign: 'left', width: '40%'}}>{value}</AppText>
        ) : (
          <View
            style={{
              width: '40%',
              borderWidth: 1,
              borderColor: 'red',
              paddingVertical: 4,
              borderRadius: Sizes.border_radius,
            }}>
            <AppText style={{color: 'red', textAlign: 'center'}}>
              {value}
            </AppText>
          </View>
        )}
      </View>
    );
  };

  return (
    <AppContainer>
      <AppHeader leftGoBack isChild title={Strings.Find_traffic_sanction} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <AppText style={{padding: 10, color: 'red', fontSize: Sizes.h6}}>
          {Strings.Find_traffic_sanction_des}
        </AppText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AppText>{Strings.License_plates}* :</AppText>
          <AppDropdown
            control={control}
            name={'car'}
            dataDropDown={CARS}
            defaultValue={'Toyota Vios MT 2014'}
            styleInput={{
              width: Sizes.width(60),
              borderWidth: Sizes.border,
              borderRadius: Sizes.border_radius,
              borderColor: Colors.greyLight,
              height: 40,
              backgroundColor: 'white',
              margin: 10,
            }}
            itemTextStyle={{fontSize: Sizes.h5}}
            styleValue={{fontSize: Sizes.h5}}
            styleItemContainer={{width: Sizes.width(59.5)}}
          />
        </View>
        <AppText style={{fontSize: Sizes.h7, textAlign: 'center', padding: 10}}>
          {Strings.Find_traffic_sanction_note}
        </AppText>
        <AppButton
          onPress={onSearch}
          title={Strings.Search_2}
          type="primary"
          style={{
            marginTop: 10,
            paddingVertical: 4,
            paddingHorizontal: 80,
            alignSelf: 'center',
            marginHorizontal: 0,
            marginRight: Sizes.width(2),
          }}
        />
      </View>

      {show && (
        <ScrollView
          style={{padding: Sizes.padding}}
          contentContainerStyle={{paddingBottom: 70}}>
          <Item label={Strings.License_plates_2} value={data.licensePlates} />
          <Item
            label={Strings.License_plates_color}
            value={data.licensePlatesColor}
          />
          <Item label={Strings.Transportation} value={data.transportation} />
          <Item
            label={Strings.Time_of_violation}
            value={data.timeOfViolation}
          />
          <Item
            label={Strings.Place_of_violation}
            value={data.placeOfViolation}
          />
          <Item label={Strings.Status} value={data.status} type="status" />
          <Item label={Strings.Violation_detection_unit} value={data.unit} />
          <Item label={Strings.Phone_contact} value={data.phoneContact} />

          <AppButton
            title={Strings.Check_on_website}
            type="primary"
            style={{
              marginTop: 10,
              paddingVertical: 4,
              paddingHorizontal: 10,
              alignSelf: 'center',
              marginHorizontal: 0,
              marginRight: Sizes.width(2),
              backgroundColor: 'white',
            }}
            textStyle={{color: Colors.primary, fontWeight: '400'}}
          />
        </ScrollView>
      )}
    </AppContainer>
  );
};

export default FindTrafficSanction;
