import React from 'react';
import {useForm} from 'react-hook-form';
import {AppContainer, AppDropdown, AppHeader, AppText} from '../../elements';
import {useGetMyCar} from '../../hooks';
import {Sizes, useAppLanguage, useAppTheme} from '../../utils';
import List from './items/List';
import TabBar from './items/TabBar';

const FindTrafficViolation = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {control, watch, setValue} = useForm({
    mode: 'all',
  });
  const {myCar} = useGetMyCar();

  return (
    <AppContainer>
      <AppHeader leftGoBack isChild title={Strings.Regular_violation} />

      <AppText style={{padding: 10, paddingBottom: 0}}>
        {Strings.My_car}
      </AppText>
      <AppDropdown
        control={control}
        name={'id_xe'}
        dataDropDown={myCar?._data || []}
        keyValueDropdown="name"
        keyResult="id"
        styleInput={{
          width: Sizes.width(70),
          borderWidth: Sizes.border,
          borderRadius: Sizes.border_radius,
          borderColor: Colors.greyLight,
          height: 40,
          margin: 10,
        }}
        itemTextStyle={{fontSize: Sizes.h5}}
        styleValue={{fontSize: Sizes.h5}}
        styleItemContainer={{width: Sizes.width(69.5)}}
      />

      <TabBar control={control} setValue={setValue} watch={watch} />
      <List navigation={navigation} control={control} setValue={setValue} />
    </AppContainer>
  );
};

export default FindTrafficViolation;
