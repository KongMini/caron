import React from 'react';
import {Controller} from 'react-hook-form';
import {View} from 'react-native';
import {useQuery} from 'react-query';
import {AppText} from '../../../elements';
import {AppCheckboxWithoutController} from '../../../elements/AppCheckbox';
import {FetchApi, Sizes, useAppTheme} from '../../../utils';

function CheckboxServices({control, name, getValues}) {
  const {Colors} = useAppTheme();
  const {data} = useQuery('CheckboxServices', () =>
    FetchApi.listOptionHomeService(),
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}}) => (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {(data?._data || []).map((item, index) => {
            return (
              <View
                key={`${index}`}
                style={{
                  width: '50%',
                  flexDirection: 'row',
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                <AppCheckboxWithoutController
                  hitSlop={false}
                  activeColor={Colors.greyLight}
                  inactiveColor={Colors.greyLight}
                  icon="ios-checkbox-outline"
                  iconInactive="ios-square-outline"
                  type="Ionicons"
                  id={item.title}
                  onChangeData={(e, id) => {
                    const dataTotalServicesPiked = value || [];
                    if (e) {
                      dataTotalServicesPiked.push(id);
                      onChange(dataTotalServicesPiked);
                    } else {
                      const filtered = dataTotalServicesPiked.filter(item => {
                        return item != id;
                      });
                      onChange(filtered);
                    }
                  }}
                />
                <AppText style={{width: '60%', paddingRight: 6}}>
                  {item.title}
                </AppText>
              </View>
            );
          })}
        </View>
      )}
    />
  );
}

export default CheckboxServices;
