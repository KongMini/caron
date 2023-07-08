import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useQuery} from 'react-query';
import {AppImage, AppText, Loading} from '../../../elements';
import {FetchApi, Sizes, useAppLanguage} from '../../../utils';

const Item = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewAndBlogDetail', {dataProps: item})}
      activeOpacity={0.8}
      style={{padding: 10, flexDirection: 'row'}}>
      <AppImage
        source={{uri: item.file_name}}
        style={{
          width: Sizes.width(32),
          height: Sizes.width(32),
          marginRight: 10,
        }}
      />
      <View style={{flex: 1}}>
        <AppText
          style={{fontWeight: '600'}}
          multipleLines={true}
          numberOfLines={2}>
          {item.title}
        </AppText>
        {!!item.note && (
          <AppText
            style={{fontSize: Sizes.h6, marginVertical: 10}}
            multipleLines={true}
            numberOfLines={3}>
            {item.note}
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
};

const List = ({navigation}) => {
  const {data, isLoading} = useQuery('useGetNewsType', () =>
    FetchApi.getNewsType(1),
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      {(data || []).map((item, index) => {
        return (
          <Item
            key={`${item.id}`}
            item={item}
            navigation={navigation}
            last={index === data?.length - 1}
          />
        );
      })}
    </View>
  );
};

export default List;
