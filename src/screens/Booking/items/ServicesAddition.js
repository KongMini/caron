import React from 'react';
import {useWatch} from 'react-hook-form';
import {View, ScrollView, FlatList} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  AppButton,
  AppCheckbox,
  AppIcon,
  AppInput,
  AppText,
  ErrorView,
  Loading,
} from '../../../elements';
import {AppCheckboxWithoutController} from '../../../elements/AppCheckbox';
import {useGetListProduct} from '../../../hooks';
import {
  Sizes,
  useAppLanguage,
  useAppTheme,
  Convert,
  FetchApi,
} from '../../../utils';

const ServicesAddition = ({
  control,
  handleSubmit,
  setValue,
  getValues,
  setScreen,
}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {listProduct, isLoadingListProduct} = useGetListProduct();
  const queryClient = useQueryClient();

  const onSearch = async () => {
    if (!getValues().servicesSearchText) {
      queryClient.refetchQueries(`useGetListProduct-${1}`);
      return;
    }
    const result = await FetchApi.searchProduct(getValues().servicesSearchText);
    if (Array.isArray(result.Data)) {
      queryClient.setQueryData(`useGetListProduct-${1}`, result);
    }
  };

  const onSetListPicked = (e, id) => {
    const dataTotalServicesPiked = getValues().totalServicesPiked || [];
    let totalCost = getValues().totalCost || 0;
    let listPicked = getValues().listPicked || [];
    if (e) {
      const item = (listProduct?.Data || []).find(itm => itm.ma_vattu === id);
      listPicked = [...listPicked, item];
      totalCost = Number(totalCost) + Number(item.Gia2);
      setValue('totalServicesPiked', [...dataTotalServicesPiked, id]);
      setValue('listPicked', listPicked);
      setValue('totalCost', totalCost);
    } else {
      const filtered = dataTotalServicesPiked.filter(item => {
        return item != id;
      });
      const item = (listProduct?.Data || []).find(itm => itm.ma_vattu === id);
      totalCost = Number(totalCost) - Number(item.Gia2);
      listPicked = listPicked.filter(itm => {
        return itm.ma_vattu != id;
      });
      setValue('totalServicesPiked', filtered);
      setValue('listPicked', listPicked);
      setValue('totalCost', totalCost);
    }
  };

  const onSubmit = e => {
    setScreen('Services');
  };

  if (isLoadingListProduct) {
    return <Loading />;
  }

  if (listProduct?._error_code === 1) {
    return (
      <ErrorView
        title={
          listProduct.message ||
          listProduct.Message ||
          listProduct._message ||
          Strings.something_wrong
        }
      />
    );
  }

  return (
    <View style={{marginTop: 10, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 10,
          borderBottomWidth: 10,
          borderColor: '#F5F7FB',
        }}>
        <AppInput
          control={control}
          name="servicesSearchText"
          containerStyle={{flex: 3}}
          style={{borderColor: Colors.text}}
        />
        <AppIcon
          icon={'search'}
          type={'Fontisto'}
          styleTouch={{flex: 1, alignItems: 'flex-start'}}
          style={{
            textAlign: 'center',
            color: '#c1c1c1',
            fontSize: Sizes.h2,
          }}
          hitSlop
          onPress={onSearch}
        />
      </View>
      <FlatList
        data={listProduct?.Data || []}
        renderItem={({item, index}) => {
          const listPicked = getValues().listPicked || [];
          const isChecked = listPicked.some(
            itm => itm.ma_vattu === item.ma_vattu,
          );
          return (
            <View
              key={`${index}`}
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: Colors.greyThin,
                padding: Sizes.padding,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <AppText style={{width: '60%', paddingRight: 6}}>
                {item.ten_vattu}
              </AppText>
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

                <AppCheckboxWithoutController
                  defaultValue={isChecked}
                  activeColor={Colors.greyLight}
                  inactiveColor={Colors.greyLight}
                  icon="ios-checkbox-outline"
                  iconInactive="ios-square-outline"
                  type="Ionicons"
                  id={item.ma_vattu}
                  onChangeData={onSetListPicked}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index + ''}
      />

      <AppButton
        control={control}
        title={Strings.Accept_services}
        type="primary"
        style={{
          marginTop: 8,
          marginBottom: Sizes.padding * 1.5,
          paddingVertical: 4,
          paddingHorizontal: 10,
          alignSelf: 'center',
        }}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default ServicesAddition;
