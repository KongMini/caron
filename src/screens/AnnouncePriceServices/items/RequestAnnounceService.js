import dayjs from 'dayjs';
import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';

import {AppButton, AppText} from '../../../elements';
import {Sizes, useAppLanguage, useAppTheme} from '../../../utils';

const RequestAnnounceService = ({setScreen, data, control, setValue}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const status = {
    1: Strings.Seen,
    0: Strings.Not_have,
    2: Strings.Cancel,
  };

  const onPress = item => () => {
    setValue('id', item.id);
    setValue('carIdSelected', item.car_id);
    setValue('imagesSelected', item.images);
    setValue('contentSelected', item.content);
    setValue('statusSelected', item.status);
    setScreen('See_request_announce_price');
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: Colors.greyThin,
          paddingVertical: 8,
        }}>
        <AppText
          style={{width: '48%', fontWeight: '600', paddingLeft: Sizes.padding}}>
          {Strings.Request_announce_price}
        </AppText>
        <AppText style={{width: '32%', fontWeight: '600'}}>
          {Strings.Time}
        </AppText>
        <AppText
          style={{
            width: '20%',
            fontWeight: '600',
            paddingRight: Sizes.padding,
          }}>
          {Strings.Announce_price}
        </AppText>
      </View>
      <ScrollView>
        {(data?._data || []).map((item, index) => {
          return (
            <TouchableOpacity
              key={`${index}`}
              style={{flexDirection: 'row', paddingVertical: 10}}
              onPress={onPress(item)}>
              <AppText
                style={{
                  color: Colors.greyBold,
                  width: '48%',
                  paddingLeft: Sizes.padding,
                  paddingRight: 6,
                }}>
                {item.content}
              </AppText>
              <AppText
                style={{
                  color: Colors.greyBold,
                  width: '32%',
                  paddingRight: 6,
                }}>
                {dayjs(item.created_at).format('DD/MM/YYYY')}
              </AppText>

              <AppButton
                onPress={onPress(item)}
                title={status[item.status]}
                textStyle={{
                  fontSize: Sizes.h5,
                  color: item.status == 1 ? Colors.primary : Colors.greyBold,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <AppButton
        title={Strings.Create_request_announce_price}
        type="primary"
        style={{
          marginTop: Sizes.padding,
          marginBottom: Sizes.padding * 1.5,
          paddingVertical: 4,
          paddingHorizontal: 10,
          alignSelf: 'center',
        }}
        onPress={() => setScreen('Create_request_announce_price')}
      />
    </View>
  );
};

export default RequestAnnounceService;
