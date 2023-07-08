import React, {useEffect} from 'react';
import {useWatch} from 'react-hook-form';
import {View, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import {useQuery} from 'react-query';
import {AppImage, AppText, Loading} from '../../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme} from '../../../utils';

const Item = ({item, navigation}) => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  console.log('dsad', item);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ExperienceDetail', {dataProps: item})}
      activeOpacity={0.8}
      style={{padding: 10, flexDirection: 'row'}}>
      <AppImage
        source={{
          uri:
            item.image ||
            'https://channel.mediacdn.vn/2021/10/18/photo-2-16345510055741138813844.jpg',
        }}
        style={{
          width: Sizes.width(32),
          height: Sizes.width(32),
          marginRight: 10,
          borderWidth: 1,
          borderColor: Colors.greyThin,
        }}
      />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <AppText
            style={{fontWeight: '600'}}
            multipleLines={true}
            numberOfLines={2}>
            {item.title}
          </AppText>
          <AppText
            style={{fontSize: Sizes.h6, marginVertical: 10}}
            multipleLines={true}
            numberOfLines={3}>
            {item.note}
          </AppText>
        </View>
        <AppText
          style={{
            color: Colors.greyBold,
            fontSize: Sizes.h6,
            textAlign: 'right',
          }}>
          {item.created_at}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const List = ({control, setValue, navigation}) => {
  const screen = useWatch({control, name: 'screen'});
  const list = useWatch({control, name: 'list'});
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`Experience-list-${screen}`],
    () => FetchApi.getListExperience(screen || ''),
  );

  useEffect(() => {
    setValue('list', data?._data?.kinhnghiem);
    setValue('tabs', data?._data?.danhMuc);
    if (!screen) {
      setValue('screen', data?._data?.danhMuc[0]?.id);
    }
  }, [data]);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 50}}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }>
      {(Array.isArray(list) ? list : []).map((item, index) => {
        return <Item key={item.id} item={item} navigation={navigation} />;
      })}
    </ScrollView>
  );
};

export default List;
