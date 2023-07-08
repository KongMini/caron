import dayjs from 'dayjs';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {AppButton, AppImage, AppText} from '../../../elements';
import {
  Convert,
  FetchApi,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

const PromotionReceive = ({navigation, data}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const onSavePromotion = async () => {};

  return (
    <View
      style={{
        backgroundColor: '#F5F7FB',
        paddingTop: Sizes.padding,
        width: Sizes.width(94),
        alignSelf: 'center',
      }}>
      {(data || []).map(item => {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            key={item.id}
            style={{
              height: Sizes.height(20),
              padding: 10,
              backgroundColor: 'white',
              marginBottom: Sizes.padding,
              borderWidth: 1,
              borderRadius: Sizes.border_radius,
              borderColor: Colors.greyLight,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            <View
              style={{
                height: Sizes.height(19),
                width: Sizes.height(18.5),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AppImage
                style={{
                  height: Sizes.height(16),
                  width: Sizes.height(16),
                  borderRadius: 15,
                  marginRight: 10,
                }}
                source={{
                  uri:
                    item.image ||
                    item.image ||
                    'https://chonthuonghieu.com/wp-content/uploads/listing-uploads/gallery/2020/12/cau_nang.jpg',
                }}
                resizeMode="cover"
              />
              <View
                style={{height: Sizes.height(19), justifyContent: 'center'}}>
                {Array.from({length: 19}).map(item => {
                  return (
                    <AppText style={{fontSize: 5, color: Colors.greyBold}}>
                      I
                    </AppText>
                  );
                })}
              </View>
            </View>

            <View
              style={{
                height: Sizes.height(20),
                paddingVertical: 10,
                width: Sizes.width(94) - Sizes.height(22),
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <AppText
                  style={{width: Sizes.width(35)}}
                  ellipsizeMode="tail"
                  numberOfLines={3}>
                  <AppText
                    style={{
                      padding: 1,
                      fontSize: Sizes.h6,
                      backgroundColor: 'red',
                      color: 'white',
                    }}>
                    {item.is_type
                      ? item.price + '%'
                      : Convert.vnd(item.price, true)}
                  </AppText>
                  <AppText style={{fontSize: Sizes.h6}}> {item.title}</AppText>
                </AppText>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <View style={{flex: 1}}>
                  <AppText style={{fontSize: Sizes.h8, color: Colors.greyBold}}>
                    {Strings.Effect}:{' '}
                    {dayjs(item.start_time).format('DD/MM/YYYY')}
                  </AppText>
                  <AppText style={{fontSize: Sizes.h8, color: Colors.greyBold}}>
                    {Strings.Due_date}:{' '}
                    {dayjs(item.end_time).format('DD/MM/YYYY')}
                  </AppText>
                </View>
                <AppButton
                  onPress={onSavePromotion}
                  type="primary"
                  title={Strings.Save}
                  style={{
                    paddingHorizontal: Sizes.padding,
                    marginHorizontal: 0,
                  }}
                  textStyle={{fontSize: Sizes.h6}}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default PromotionReceive;
