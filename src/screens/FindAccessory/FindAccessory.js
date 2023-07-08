import React from 'react';
import {useForm} from 'react-hook-form';
import {AppContainer, AppHeader, AppIcon, AppInput} from '../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme} from '../../utils';
import CarPicker from './items/CarPicker';
import List from './items/List';
import {useQueryClient} from 'react-query';
import {View} from 'react-native';

const FindAccessory = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const queryClient = useQueryClient();
  const {control, handleSubmit, setValue, getValues} = useForm({
    defaultValues: {totalServicesPiked: [], totalCost: 0, listPicked: []},
  });

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

  return (
    <AppContainer>
      <AppHeader leftGoBack isChild title={Strings.Find_accessary} />

      {/* <CarPicker control={control} /> */}

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <AppInput
          style={{borderColor: Colors.greyThin}}
          control={control}
          name="servicesSearchText"
          containerStyle={{paddingHorizontal: 10, width: Sizes.width(75)}}
          inputStyle={{height: 34, paddingVertical: 0}}
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

      <List
        control={control}
        getValues={getValues}
        setValue={setValue}
        handleSubmit={handleSubmit}
      />
    </AppContainer>
  );
};

export default FindAccessory;
