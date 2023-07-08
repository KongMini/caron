import dayjs from 'dayjs';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AppImage, AppText} from '../../../elements';
import {
  Convert,
  FetchApi,
  ModalBase,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

export default function PromotionItem({item, refetch, navigation}) {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const [loading, setLoading] = useState();

  const onUseNow =
    (id, is_type, title, price, gara_id, is_mode) => async () => {
      if (loading) {
        return;
      }
      if (is_mode == 1) {
        setLoading(true);
        const res = await FetchApi.addPointToWallet(id);
        setLoading(false);
        if (res._msg_code == 1) {
          refetch();
          ModalBase.success(res._msg_text);
          return;
        }
        setLoading(false);
        return;
      }
      navigation.navigate('Booking', {
        dataBooking: {
          promotion_id: id,
          is_type_promotion: is_type,
          promotion_title: title,
          promotion_price: price,
          gara_id: gara_id,
          is_mode: is_mode,
          isMe: true,
        },
      });
    };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PromotionDetail', {data: item})}
      activeOpacity={0.9}
      style={{
        height: Sizes.height(20),
        padding: 10,
        backgroundColor: Colors.background,
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
          source={
            item.image
              ? {
                  uri: item.image,
                }
              : require('../../../utils/images/voucher.png')
          }
          resizeMode="cover"
        />
        <View style={{height: Sizes.height(19), justifyContent: 'center'}}>
          {Array.from({length: 19}).map((item, index) => {
            return (
              <AppText
                key={`${index}`}
                style={{fontSize: 5, color: Colors.greyBold}}>
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
        <View style={{flex: 1}}>
          <AppText style={{flex: 1}}>
            <AppText
              ellipsizeMode="tail"
              numberOfLines={3}
              style={{
                padding: 1,
                fontSize: Sizes.h6,
                backgroundColor: 'red',
                color: 'white',
              }}>
              {/* {item.is_type ? item.price + '%' : Convert.vnd(item.price, true)} */}
              {item.is_type ? item.price + '%' : Convert.point(item.price)}
            </AppText>
            <AppText style={{fontSize: Sizes.h6}}> {item.title}</AppText>
          </AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flex: 1,
          }}>
          <View style={{flex: 1}}>
            <AppText style={{fontSize: Sizes.h8, color: Colors.greyBold}}>
              {Strings.Effect}: {dayjs(item.start_time).format('DD/MM/YYYY')}
            </AppText>
            <AppText style={{fontSize: Sizes.h8, color: Colors.greyBold}}>
              {Strings.Due_date}: {dayjs(item.end_time).format('DD/MM/YYYY')}
            </AppText>
          </View>
          <View>
            <TouchableOpacity
              style={{marginBottom: 10}}
              onPress={onUseNow(
                item.id,
                item.is_type,
                item.title,
                item.price,
                item.gara_id,
                item.is_mode,
              )}>
              <AppText style={{fontSize: Sizes.h6, color: 'red'}}>
                {Strings.Use_now}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PromotionDetail', {data: item})
              }>
              <AppText style={{fontSize: Sizes.h6, color: 'blue'}}>
                {Strings.Condition}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
