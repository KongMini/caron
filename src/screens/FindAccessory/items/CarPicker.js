import React from 'react';
import {AppDropdown} from '../../../elements';
import {useGetMyCar} from '../../../hooks';
import {Sizes, useAppTheme} from '../../../utils';

const CarPicker = ({control}) => {
  const {myCar} = useGetMyCar();
  const {Colors} = useAppTheme();

  return (
    <AppDropdown
      control={control}
      name={'car'}
      dataDropDown={myCar?._data || []}
      // defaultValue={myCar?._data?.[0]?.id}
      placeholder={'Chọn xe'}
      stylePlaceholder={{top: 18}}
      styleInput={{
        width: Sizes.width(70),
        borderWidth: Sizes.border,
        borderRadius: Sizes.border_radius,
        borderColor: Colors.greyLight,
        height: 40,
        backgroundColor: 'white',
        margin: 10,
      }}
      itemTextStyle={{fontSize: Sizes.h5}}
      styleValue={{fontSize: Sizes.h5}}
      styleItemContainer={{width: Sizes.width(69.9)}}
      keyValueDropdown="name"
      keyResult="id"
    />
  );
};

export default CarPicker;
