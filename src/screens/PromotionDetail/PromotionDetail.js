import React from 'react';
import {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {
  AppButton,
  AppContainer,
  AppHeader,
  AppImage,
  AppText,
} from '../../elements';
import {
  Convert,
  FetchApi,
  ModalBase,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../utils';

const PromotionDetail = ({navigation, route}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const [loading, setLoading] = useState();
  const {
    image,
    title,
    start_time,
    end_time,
    price,
    note,
    id,
    original_price,
    is_type,
    gara_id,
    is_mode,
  } = route.params.data;

  return (
    <AppContainer>
      <AppHeader
        leftGoBack
        isChild
        title={Strings.Create_request_announce_price.toUpperCase()}
      />
      <ScrollView
        style={{padding: Sizes.padding}}
        contentContainerStyle={{paddingBottom: 60}}>
        <AppImage
          source={{
            uri:
              image ||
              'https://chonthuonghieu.com/wp-content/uploads/listing-uploads/gallery/2020/12/cau_nang.jpg',
          }}
          style={{
            width: Sizes.device_width - Sizes.padding * 2,
            height: ((Sizes.device_width - Sizes.padding * 2) * 9) / 16,
          }}
        />
        <AppText
          style={{paddingVertical: Sizes.padding / 2, fontWeight: 'bold'}}>
          {title}
        </AppText>
        <AppText
          style={{paddingBottom: Sizes.padding / 2, color: Colors.greyBold}}>
          {Strings.Effect}: {start_time}
        </AppText>
        <AppText
          style={{paddingBottom: Sizes.padding / 2, color: Colors.greyBold}}>
          {Strings.Due_date}: {end_time}
        </AppText>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AppText style={{fontSize: Sizes.h3, fontWeight: 'bold'}}>
            {/* {is_type ? price + '%' : Convert.vnd(price, true)} */}
            {is_type ? price + '%' : Convert.point(price)}
          </AppText>
          <AppText style={{paddingHorizontal: 12, color: Colors.greyBold}}>
            {original_price ? Convert.vnd(original_price, true) : ''}
          </AppText>
          {!!original_price && (
            <View
              style={{
                borderRadius: Sizes.border_radius,
                backgroundColor: Colors.primary,
              }}>
              <AppText
                style={{
                  color: 'white',
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                }}>
                {(price * 100) / original_price}
              </AppText>
            </View>
          )}
        </View>

        <AppText style={{marginVertical: Sizes.padding}}>{note}</AppText>

        <AppButton
          title={Strings.Make_appointment_to_use_service}
          type="primary"
          style={{
            marginTop: 10,
            paddingVertical: 4,
            paddingHorizontal: 10,
            alignSelf: 'center',
            marginHorizontal: 0,
            marginRight: Sizes.width(2),
          }}
          disabled={loading}
          onPress={async () => {
            if (loading) {
              return;
            }
            if (is_mode == 1) {
              setLoading(true);
              const res = await FetchApi.addPointToWallet(id);
              setLoading(false);
              if (res._msg_code == 1) {
                navigation.goBack();
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
              screenActive: 'Information',
            });
          }}
        />
      </ScrollView>
    </AppContainer>
  );
};

export default PromotionDetail;
