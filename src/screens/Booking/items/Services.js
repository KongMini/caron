import React, {useEffect} from 'react';
import {Controller, useWatch} from 'react-hook-form';
import {View, Alert, Linking, Image} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-ui-lib';

import {
  AppButton,
  AppIcon,
  AppInput,
  AppText,
  PickImageWithResize,
} from '../../../elements';
import {Convert, Sizes, useAppLanguage, useAppTheme} from '../../../utils';

const Services = ({control, setScreen, setValue}) => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const watchAll = useWatch({control});

  useEffect(() => {
    const totalAll =
      (watchAll.totalCost || 0) + (watchAll.tempAppraisalCost || 0);
    setValue('totalCost', totalAll);
  }, []);

  const onNextStep = () => {
    // if ((watchAll.listPicked || []).length < 1) {
    //   ModalBase.error({message: 'Vui lòng chọn dịch vụ'});
    //   return;
    // }
    setScreen('Cost');
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
          paddingVertical: 12,
        }}>
        <AppButton
          control={control}
          title={Strings.Add_services}
          type="primary"
          style={{
            paddingVertical: 4,
            paddingHorizontal: 10,
            alignSelf: 'center',
            marginHorizontal: 0,
            marginRight: Sizes.width(2),
          }}
          onPress={() => setScreen('Add_services')}
        />
      </View>

      <View style={{marginTop: Sizes.padding}}>
        <AppText
          style={{
            fontSize: Sizes.h4,
            fontWeight: 'bold',
            paddingHorizontal: Sizes.padding,
          }}>
          {Strings.Service}
        </AppText>
        {(watchAll?.listPicked || []).map((item, index, arr) => {
          return (
            <View
              key={`${index}`}
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor:
                  index === arr.length - 1 ? Colors.primary : Colors.greyThin,
                padding: Sizes.padding,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <AppText style={{width: '60%'}}>{item.ten_vattu}</AppText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flex: 1,
                }}>
                <AppText>
                  {Strings.price}: {Convert.vnd(item.Gia2)}
                </AppText>
              </View>
            </View>
          );
        })}

        {!!watchAll.appraisal_name && (
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: Colors.primary,
              padding: Sizes.padding,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <AppText style={{width: '60%'}}>
              {Strings.Appraisal}: {watchAll.appraisal_name}
            </AppText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <AppText>
                {Strings.price}: {Convert.vnd(watchAll.tempAppraisalCost)}
              </AppText>
            </View>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: Sizes.padding,
          }}>
          <AppText
            style={{
              fontWeight: 'bold',
              paddingHorizontal: Sizes.padding,
              color: Colors.primary,
            }}>
            {Strings.All_pricce_of_services}
          </AppText>
          <AppText
            style={{
              fontWeight: 'bold',
              paddingHorizontal: Sizes.padding,
              color: Colors.primary,
            }}>
            {watchAll?.totalCost ? Convert.vnd(watchAll?.totalCost) : 0}
          </AppText>
        </View>
        <View
          style={{
            marginHorizontal: Sizes.padding,
            marginBottom: Sizes.padding,
          }}>
          <Images control={control} name="image" setValue={setValue} />
          <AppInput
            containerStyle={{paddingHorizontal: 0, width: '100%'}}
            control={control}
            name={'note'}
            multiline={true}
            style={{
              paddingTop: 4,
              alignItems: 'flex-start',
              borderRadius: Sizes.border_radius,
              borderColor: Colors.greyLight,
              height: 100,
            }}
          />
        </View>
      </View>
      <AppButton
        control={control}
        title={Strings.Next}
        type="primary"
        style={{
          paddingVertical: 4,
          paddingHorizontal: 10,
          alignSelf: 'center',
          marginHorizontal: 0,
          marginRight: Sizes.width(2),
        }}
        onPress={onNextStep}
      />
    </KeyboardAwareScrollView>
  );
};

const Images = ({control, name, setValue}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const watchAll = useWatch({control});

  const onPressChooseImage = onChange => () => {
    PickImageWithResize.fromGallery(result => {
      try {
        if (result && result.err) {
          if (result.err === 'permission') {
            Alert.alert(
              Strings.Permission_not_granted,
              '',
              [
                {text: Strings.Cancel},
                {
                  text: Strings.Ok,
                  onPress: () => {
                    Linking.openSettings();
                  },
                },
              ],
              {cancelable: true},
            );
            return;
          }
          Alert.alert(result.err);
          return;
        }
        if (result && result.uri) {
          console.log('result.uri', result.uri);
          const list = watchAll[name] || [];
          list.push(result.uri);
          onChange(list);
        }
      } catch (error) {}
    });
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <AppText style={{fontSize: Sizes.h5, marginBottom: 6}}>
              {Strings.Note}
            </AppText>
            <AppIcon
              disabled={watchAll?.[name]?.length > 2}
              icon="attachment"
              type="Entypo"
              style={{
                textAlign: 'center',
                color: Colors.greybold,
                fontSize: Sizes.h3,
              }}
              hitSlop
              onPress={onPressChooseImage(onChange)}
            />
          </View>
        )}
      />
      <View style={{flexDirection: 'row'}}>
        {watchAll?.[name]?.length > 0 &&
          watchAll?.[name].map((item, index) => {
            return (
              <View key={`${index}`} style={{paddingRight: 18}}>
                <Image
                  style={{
                    width: Sizes.width(27.2),
                    height: Sizes.width(27.2),
                    borderRadius: 5,
                    marginBottom: 10,
                    marginTop: 20,
                  }}
                  source={{uri: item}}
                  resizeMode="stretch"
                />
                <AppIcon
                  styleTouch={{
                    backgroundColor: 'white',
                    borderRadius: 100,
                    position: 'absolute',
                    right: 10,
                    top: 10,
                  }}
                  icon={'closecircleo'}
                  type={'AntDesign'}
                  color={Colors.love}
                  size={Sizes.h1}
                  onPress={() => {
                    const list = watchAll[name];
                    list.splice(index, 1);
                    setValue(name, list, {shouldDirty: true});
                  }}
                />
              </View>
            );
          })}
      </View>
    </>
  );
};

export default Services;
