import {View, FlatList} from 'react-native';
import React from 'react';
import {useGetListProduct} from '../../../hooks';
import {AppButton, AppText, ErrorView, Loading} from '../../../elements';
import {Convert, Sizes, useAppLanguage, useAppTheme} from '../../../utils';
import {AppCheckboxWithoutController} from '../../../elements/AppCheckbox';
import {useNavigation} from '@react-navigation/native';

const List = ({control, getValues, setValue, handleSubmit}) => {
  const navigation = useNavigation();
  const {Strings} = useAppLanguage();
  const {listProduct, isLoadingListProduct, isFetchingListProduct} =
    useGetListProduct();

  const onSubmit = e => {
    const {totalServicesPiked, totalCost, listPicked, car} = getValues();

    navigation.navigate('Booking', {
      dataBooking: {
        id_xe: car,
        totalServicesPiked: totalServicesPiked,
        totalCost: totalCost,
        listPicked: listPicked,
      },
    });
  };

  const onSetListPicked = (e, id) => {
    const dataTotalServicesPiked = getValues().totalServicesPiked;
    let totalCost = getValues().totalCost;
    let listPicked = getValues().listPicked;
    if (e) {
      const item = (listProduct.Data || []).find(itm => itm.ma_vattu === id);
      listPicked = [...listPicked, item];
      totalCost = Number(totalCost) + Number(item.Gia2);
      setValue('totalServicesPiked', [...dataTotalServicesPiked, id]);
      setValue('listPicked', listPicked);
      setValue('totalCost', totalCost);
    } else {
      const filtered = dataTotalServicesPiked.filter(item => {
        return item != id;
      });
      const item = (listProduct.Data || []).find(itm => itm.ma_vattu === id);
      totalCost = Number(totalCost) - Number(item.Gia2);
      listPicked = listPicked.filter(itm => {
        return itm.ma_vattu != id;
      });
      setValue('totalServicesPiked', filtered);
      setValue('listPicked', listPicked);
      setValue('totalCost', totalCost);
    }
  };

  if (isLoadingListProduct || isFetchingListProduct) {
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
    <View style={{paddingTop: 10, flex: 1}}>
      <FlatList
        data={listProduct?.Data || []}
        renderItem={({item, index}) => {
          return (
            <Item
              key={`${index}`}
              item={item}
              index={index}
              control={control}
              onSetListPicked={onSetListPicked}
            />
          );
        }}
        keyExtractor={(item, index) => index + ''}
      />
      <AppButton
        control={control}
        title={Strings.Booking_accessory_selected}
        type="primary"
        style={{
          marginVertical: 8,
          paddingVertical: 4,
          paddingHorizontal: 10,
          alignSelf: 'center',
        }}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const Item = ({item, index, onSetListPicked}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderTopWidth: index === 0 ? 1 : 0,
        borderColor: Colors.greyThin,
        padding: 10,
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
};

export default List;
