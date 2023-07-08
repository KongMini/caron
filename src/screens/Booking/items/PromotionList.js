import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useQuery} from 'react-query';
import {
  Convert,
  FetchApi,
  ModalBase,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';
import {AppImage, AppText, Loading} from '../../../elements';

function PromotionList({control, watch, setValue, setScreen}) {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const gara_id = watch('gara_id');
  const [loading, setLoading] = useState();
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`Promotion-${1}`],
    () => FetchApi.getPromotionWithGaraId(gara_id),
  );

  if (isLoading) {
    return <Loading />;
  }

  if (data?._data?.dsKM?.length < 1) {
    return (
      <AppText style={{marginTop: Sizes.padding, textAlign: 'center'}}>
        Bạn chưa có voucher
      </AppText>
    );
  }

  return (
    <View
      style={{
        paddingTop: Sizes.padding,
        width: Sizes.width(94),
        alignSelf: 'center',
      }}>
      {(data?._data?.dsKM || []).map(item => {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            key={item.id + ''}
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
              <View
                style={{height: Sizes.height(19), justifyContent: 'center'}}>
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
                  {item.is_type ? item.price + '%' : Convert.point(item.price)}
                </AppText>
                <AppText style={{fontSize: Sizes.h6}}> {item.title}</AppText>
              </AppText>

              <View style={{flex: 1}}>
                <AppText style={{fontSize: Sizes.h8, color: Colors.greyBold}}>
                  {Strings.Due_date}: {item.end_time}
                </AppText>
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={async () => {
                    if (loading) {
                      return;
                    }
                    if (item.is_mode == 1) {
                      setLoading(true);
                      const res = await FetchApi.addPointToWallet(item.id);
                      setLoading(false);
                      if (res._msg_code == 1) {
                        refetch();
                        ModalBase.success(res._msg_text);
                        return;
                      }
                      setLoading(false);
                      return;
                    }
                    setValue('promotion_id', item.id);
                    setValue('promotion_title', item.title);
                    setValue('promotion_price', item.price);
                    setValue('is_type_promotion', item.is_type);
                    setValue('is_mode', item.is_mode);
                    setScreen('Cost');
                  }}>
                  <AppText style={{fontSize: Sizes.h6, color: 'red'}}>
                    {Strings.Use_now}
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default PromotionList;
