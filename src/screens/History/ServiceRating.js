import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, ScrollView} from 'react-native';
import StarRating from 'react-native-star-rating';
import {useQuery} from 'react-query';
import {
  AppButton,
  AppContainer,
  AppHeader,
  AppImage,
  AppInput,
  AppText,
  Loading,
} from '../../elements';
import {
  FetchApi,
  ModalBase,
  Sizes,
  useAppAccount,
  useAppLanguage,
  useAppTheme,
} from '../../utils';

const ServiceRating = ({navigation, route}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const [account] = useAppAccount();
  const {data, isLoading} = useQuery(`ServiceRating`, () =>
    FetchApi.ratingComment(route.params.data.Data[0].ma_donhang),
  );

  const [star, setStar] = useState();
  const [submiting, setSubmiting] = useState(false);
  const {control, handleSubmit, setValue} = useForm();

  useEffect(() => {
    if (data?._data?.[0]) {
      const e = data._data[0];
      setStar(e.star);
      setValue('content', e.content);
    }
  }, [data]);

  const onSave = async e => {
    const id_service = route.params.data.Data[0].ma_donhang;

    const result = await FetchApi.ratingAdd({...e, star, id_service});
    if (result._msg_code == 1) {
      ModalBase.success(Strings.Save_success);
    } else {
      ModalBase.error({result});
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppContainer>
      <AppHeader isChild title={Strings.Service_review} leftGoBack />
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={{paddingBottom: 50, padding: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AppImage
              source={{uri: account.user_info.avatar_url}}
              style={{width: 25, height: 25, marginRight: 10}}
            />
            <AppText>
              {account.user_info.first_name + ' ' + account.user_info.last_name}
            </AppText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: Sizes.padding,
              marginLeft: Sizes.padding,
              alignItems: 'center',
            }}>
            <AppText>{Strings.Service_review}</AppText>
            <StarRating
              maxStars={5}
              starSize={Sizes.h2}
              containerStyle={{
                marginLeft: 14,
              }}
              fullStarColor={Colors.success}
              emptyStarColor={Colors.sub_text}
              rating={star}
              selectedStar={star => {
                setStar(star);
              }}
            />
          </View>

          <AppText
            style={{marginTop: Sizes.padding, marginLeft: Sizes.padding}}>
            {Strings.Comment}
          </AppText>
          <AppInput
            containerStyle={{marginVertical: 10, width: '100%'}}
            control={control}
            name={'content'}
            rules={{
              required: {value: true, message: Strings.This_field_is_required},
            }}
            multiline={true}
            style={{
              paddingTop: 4,
              alignItems: 'flex-start',
              borderRadius: Sizes.border_radius,
              borderColor: Colors.greyLight,
              height: 100,
            }}
          />

          <AppButton
            control={control}
            title={Strings.Save}
            type="primary"
            style={{
              paddingVertical: 4,
              paddingHorizontal: 10,
              alignSelf: 'center',
              marginHorizontal: 0,
              marginRight: Sizes.width(2),
            }}
            onPress={handleSubmit(onSave)}
            submiting={submiting}
          />

          {/* <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 40}}>
          {[].map(item => {
            return (
              <View
                style={{
                  backgroundColor: Colors.greyThin,
                  borderRadius: Sizes.border_radius,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  marginBottom: 8,
                  marginRight: 5,
                }}>
                <AppText>{item}</AppText>
              </View>
            );
          })}
        </View> */}

          {/* <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 40}}>
          {[].map(item => {
            return (
              <AppImage
                source={{uri: item}}
                style={{
                  width: Sizes.width(25),
                  height: Sizes.width(25),
                  marginRight: 5,
                }}
              />
            );
          })}
        </View> */}
        </ScrollView>
      )}
    </AppContainer>
  );
};

export default ServiceRating;
