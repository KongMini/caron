import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useWatch} from 'react-hook-form';
import {View, TouchableOpacity} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-ui-lib';
import {useQuery} from 'react-query';

import {
  AppButton,
  AppIcon,
  AppText,
  AppImage,
  AppSwitch,
  AppDateInput,
} from '../../../elements';

import {
  Convert,
  FetchApi,
  ModalBase,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

const Cost = ({control, setScreen, setValue, handleSubmit, reset}) => {
  const moneyApp = useQuery(['getMoneyApp'], FetchApi.getMoneyApp);

  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const watchAll = useWatch({control});
  const [totalCost, setTotalCost] = useState(watchAll?.totalCost || 0);
  const [submiting, setSubmiting] = useState(false);

  const moneyAppData = moneyApp.data?._data;

  console.log('sadm', moneyApp.data?._data);

  // useEffect(() => {
  //   if (
  //     Number(totalCost) > Number(moneyApp?.tongtienquydoi || 0) &&
  //     watchAll.pay_type
  //   ) {
  //     ModalBase.error({message: 'Không đủ tiền trong ví'});
  //     setValue('pay_type', false);
  //   }
  // }, [watchAll.pay_type]);
  //pay_type = 1: dung vi, 0: ko dung vi

  useEffect(() => {
    if (
      (watchAll.is_type_promotion == 1 || watchAll.is_type_promotion == 0) &&
      watchAll.pay_type
    ) {
      ModalBase.success('Chỉ dùng 1 trong 2 voucher khuyến mại và ví.');
      if (watchAll.is_type_promotion == 1 || watchAll.is_type_promotion == 0) {
        setValue('pay_type', false);
        return;
      }
    }
  }, [watchAll.pay_type]);

  useEffect(() => {
    if (
      (watchAll.is_type_promotion == 1 || watchAll.is_type_promotion == 0) &&
      watchAll.pay_type
    ) {
      ModalBase.success('Chỉ dùng 1 trong 2 voucher khuyến mại và ví.');
      if (watchAll.pay_type) {
        setValue('pay_type', true);
        setValue('is_type_promotion', null);
        setValue('promotion_price', null);
        setValue('promotion_id', null);
        setValue('promotion_title', null);
      }
    }
  }, [watchAll.is_type_promotion]);

  let expectedCost = 0;

  if (watchAll.is_type_promotion == 0) {
    // expectedCost = Number(totalCost) - Number(watchAll.promotion_price || 0);
    if (!Number.isNaN(moneyApp.data?._data?.hesoquydoi)) {
      expectedCost =
        Number(totalCost) -
        Number(watchAll.promotion_price || 0) *
          Number(moneyApp.data?._data?.hesoquydoi);
    }
  } else if (watchAll.is_type_promotion == 1) {
    expectedCost =
      Number(totalCost) -
      Number(totalCost) * Number(watchAll.promotion_price / 100 || 1);
  } else {
    expectedCost = Number(totalCost);
  }

  let pointUsing = 0;
  let totalUseInWallet = 0;
  if (
    !Number.isNaN(moneyApp.data?._data?.tongtienquydoi) &&
    !Number.isNaN(expectedCost) &&
    !Number.isNaN(moneyApp.data?._data?.sodu) &&
    !Number.isNaN(moneyApp.data?._data?.hesoquydoi) &&
    watchAll.pay_type
  ) {
    if (moneyApp.data?._data?.tongtienquydoi < expectedCost) {
      expectedCost = expectedCost - moneyApp.data?._data?.tongtienquydoi;
      pointUsing = moneyApp.data?._data?.sodu;
      totalUseInWallet = moneyApp.data?._data?.tongtienquydoi;
    }
    if (moneyApp.data?._data?.tongtienquydoi >= expectedCost) {
      pointUsing = expectedCost / moneyApp.data?._data?.hesoquydoi;
      totalUseInWallet = expectedCost;
      expectedCost = 0;
    }
  }

  if (expectedCost < 0) {
    expectedCost = 0;
  }

  const list = [
    {
      label: Strings.All_pricce_of_services,
      data: Convert.vnd(totalCost || 0),
    },
    {
      label: Strings.Sales_by_voucher,
      data:
        '- ' +
        `${
          watchAll.is_type_promotion == 0
            ? // ? Convert.vnd(watchAll.promotion_price || 0)
              Convert.vnd(
                (watchAll.promotion_price || 0) *
                  (moneyApp.data?._data?.hesoquydoi || 0),
              )
            : watchAll.is_type_promotion == 1
            ? watchAll.promotion_price + '%'
            : 'đ0'
        }`,
    },
    {
      label: Strings.Exchange_caron_point,
      // data: watchAll?.pay_type ? '- ' + Convert.point(pointUsing) : '- 0 điểm',
      data: watchAll?.pay_type ? '- ' + Convert.vnd(totalUseInWallet) : '- đ0',
    },
    {
      label: Strings.Expected_cost,
      data: Convert.vnd(expectedCost),
    },
  ];

  const onBooking = async e => {
    setSubmiting(true);
    const item = {
      ...e,
      date_at: dayjs(e.date_at).format('HH:mm DD-MM-YYYY'),
      spare_parts: Array.isArray(e.totalServicesPiked)
        ? e.totalServicesPiked.join()
        : '',
      promotion_id: watchAll.promotion_id,
      total: expectedCost,
      name: e.name,
      biensoxe: e.licensePlates,
      address: `${e.ten_thanhpho ? e.ten_thanhpho + ', ' : ''}${
        e.ten_quanhuyen || ''
      }`,
      pay_type: e.pay_type ? 1 : 0,
      file_name: e.image || e.images,
      car_id: e.id_xe,
    };

    const result = await FetchApi.addBooking(item);
    setSubmiting(false);
    if (result._msg_code === 1) {
      ModalBase.success('Đặt hẹn thành công');
      setScreen('Information');
      reset();
      setValue('phone', '');
      setValue('isMe', false);
      setValue('note', '');
      setValue('promotion_id', '');
      setValue('promotion_title', '');
      // if (e.is_mode == 1) {
      //   FetchApi.addPointToWallet(watchAll.promotion_id);
      // }
    } else {
      ModalBase.error({result: result});
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{paddingBottom: 200}}
      automaticallyAdjustContentInsets={false}
      showVerticalIndicator={false}>
      <View
        style={{
          borderTopWidth: 6,
          borderBottomWidth: 6,
          borderColor: '#F5F7FB',
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: Sizes.padding,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: Colors.greyThin,
            paddingVertical: 8,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AppImage
              style={{width: 24, height: 24, marginRight: 8}}
              source={require('../../../utils/images/Caron_voucher.png')}
            />
            <AppText style={{color: Colors.greyBold}}>Caron Voucher</AppText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => setScreen('PromotionList')}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppText
                  style={{
                    maxWidth: 160,
                    borderWidth: 1,
                    borderColor: Colors.greyThin,
                    padding: 2,
                    marginRight: 2,
                  }}>
                  {watchAll.promotion_title || 'Thêm voucher'}
                </AppText>
                <AppIcon
                  icon="right"
                  type="AntDesign"
                  style={{fontSize: Sizes.h4, color: Colors.primary}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: Sizes.padding,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: Colors.greyThin,
            paddingVertical: 8,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                marginRight: 8,
                borderColor: Colors.primary,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppText
                style={{
                  lineHeight: 16,
                  fontSize: 14,
                  color: Colors.primary,
                  textAlign: 'center',
                }}>
                $
              </AppText>
            </View>
            <AppText style={{color: Colors.greyBold}}>
              {Strings.All_point_caron}
            </AppText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AppText style={{maxWidth: 160}}>
              {Convert.point(moneyAppData?.sodu || 0)}
            </AppText>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 8,
            paddingHorizontal: Sizes.padding,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                marginRight: 8,
                borderColor: Colors.primary,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppText
                style={{
                  lineHeight: 16,
                  fontSize: 14,
                  color: Colors.primary,
                  textAlign: 'center',
                }}>
                $
              </AppText>
            </View>
            <AppText style={{color: Colors.greyBold}}>
              {Strings.Exchange_caron_point}
            </AppText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppText style={{padding: 2, marginRight: 2}}>
                  {`[~ ${Convert.vnd(moneyAppData?.tongtienquydoi || 0)}]`}
                </AppText>
                <AppSwitch control={control} name="pay_type" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {list.map(item => {
        return (
          <View
            key={item.label}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 8,
              borderTopWidth: item.label === Strings.Expected_cost ? 1 : 0,
              paddingTop: item.label === Strings.Expected_cost ? 8 : 0,
              borderColor: Colors.primary,
            }}>
            <AppText
              style={{
                color:
                  item.label === Strings.Expected_cost
                    ? Colors.primary
                    : Colors.text,
                fontWeight:
                  item.label === Strings.Expected_cost ? 'bold' : undefined,
                paddingHorizontal: Sizes.padding,
              }}>
              {item.label}
            </AppText>
            <AppText
              style={{
                color:
                  item.label === Strings.Expected_cost
                    ? Colors.primary
                    : Colors.text,
                fontWeight:
                  item.label === Strings.Expected_cost ? 'bold' : undefined,
                paddingHorizontal: Sizes.padding,
              }}>
              {item.data}
            </AppText>
          </View>
        );
      })}

      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.greyThin,
          padding: 12,
          margin: Sizes.padding,
          borderRadius: 20,
        }}>
        <AppText style={{color: Colors.greyBold}}>{Strings.Note_Cost}</AppText>
      </View>
      <View style={{borderBottomWidth: 6, borderBottomColor: '#F5F7FB'}} />

      <AppText style={{color: Colors.greyBold, padding: Sizes.padding}}>
        {Strings.Expected_time} *
      </AppText>
      <AppDateInput
        control={control}
        name="date_at"
        rules={{
          required: {value: true, message: Strings.This_field_is_required},
        }}
        style={{
          height: 40,
          width: Sizes.device_width - 2 * Sizes.padding,
          alignSelf: 'center',
          marginBottom: Sizes.padding,
          backgroundColor: Colors.background,
        }}
        mode="datetime"
        maxDate={new Date('2100')}
      />

      <AppButton
        control={control}
        title={Strings.Booking}
        type="primary"
        disabled={submiting}
        style={{
          paddingVertical: 4,
          paddingHorizontal: 10,
          alignSelf: 'center',
          marginHorizontal: 0,
          marginRight: Sizes.width(2),
        }}
        onPress={handleSubmit(onBooking)}
      />
    </KeyboardAwareScrollView>
  );
};

export default Cost;
