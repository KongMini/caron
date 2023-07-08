import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useGetAllManufacture, useGetTypeCarById} from '../../../hooks';
import {AppDropdown, AppInput} from '../../../elements';
import {Sizes, useAppLanguage, useAppTheme} from '../../../utils';

function Filter({control, watch, setValue}) {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const {allManufacture} = useGetAllManufacture({type: 'all'});
  const {allTypeCarByID} = useGetTypeCarById(control);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: Sizes.device_width,
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginVertical: Sizes.padding,
        }}>
        <AppDropdown
          control={control}
          name={'manufacturer'}
          dataDropDown={allManufacture?.DATA}
          styleInput={{
            borderWidth: Sizes.border,
            borderRadius: Sizes.border_radius,
            borderColor: Colors.greyLight,
            // height: 40,
            width: Sizes.width(45),
            marginTop: 0,
          }}
          // itemTextStyle={{fontSize: Sizes.h5}}
          // styleValue={{fontSize: Sizes.h5}}
          styleItemContainer={{
            width: Sizes.width(44.7),
            left: Sizes.width(45) + Sizes.padding * 2 - 4,
          }}
          keyValueDropdown={'ten_hangxe'}
          keyResult={'ma_hangxe'}
          placeholder={Strings.Manufacturer}
          onPressChange={() => setValue('type', '')}
        />
        <AppDropdown
          control={control}
          name={'type'}
          defaultValue={watch('type') || ''}
          dataDropDown={allTypeCarByID?.Data || []}
          styleInput={{
            borderWidth: Sizes.border,
            borderRadius: Sizes.border_radius,
            borderColor: Colors.greyLight,
            // height: 40,
            width: Sizes.width(45),
            marginTop: 0,
          }}
          // itemTextStyle={{fontSize: Sizes.h5}}
          // styleValue={{fontSize: Sizes.h5}}
          styleItemContainer={{
            width: Sizes.width(44.7),
            left: Sizes.width(50) + Sizes.padding / 2,
          }}
          keyValueDropdown={'ten_dongxe'}
          keyResult={'ma_dongxe'}
          placeholder={Strings.Type_car}
        />
      </View>

      <AppInput
        control={control}
        name="keywords"
        containerStyle={{paddingHorizontal: 10}}
        style={{
          borderColor: Colors.greyLight,
          marginBottom: 4,
        }}
        placeholder={Strings.Key_word}
      />
    </View>
  );
}

export default Filter;
