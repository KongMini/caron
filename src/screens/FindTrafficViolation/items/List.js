import React from 'react';
import {useEffect} from 'react';
import {useWatch} from 'react-hook-form';
import {RefreshControl, ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native-ui-lib';
import {useQuery} from 'react-query';
import {AppImage, AppText, Loading} from '../../../elements';
import {FetchApi, Sizes, useAppTheme} from '../../../utils';

const List = ({navigation, control, setValue}) => {
  const {Colors} = useAppTheme();

  const screen = useWatch({control, name: 'screen'});
  const id_xe = useWatch({control, name: 'id_xe'});
  const keysearch = useWatch({control, name: 'keysearch'});

  const {data, isLoading, refetch, isFetching} = useQuery(
    [`FindTrafficViolation-${screen}-${id_xe}-${keysearch}`],
    () =>
      FetchApi.getListLoiThuongGap({
        category_id: screen,
        id_xe: id_xe,
        keysearch: keysearch,
      }),
  );

  useEffect(() => {
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
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }>
      {data?._data?.cauhoi?.map?.(item => {
        console.log('dsa', item);
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FindTrafficViolationDetail', {
                dataProps: item,
              })
            }
            key={item.id}
            style={{flexDirection: 'row', padding: 10}}>
            <AppImage
              source={
                item.image
                  ? {uri: item.image}
                  : require('../../../utils/images/camnang.png')
              }
              style={{
                width: Sizes.width(20),
                height: Sizes.width(20),
                borderWidth: 1,
                borderColor: Colors.greyThin,
              }}
            />

            <View style={{marginHorizontal: 10, flex: 1}}>
              <AppText>{item.title}</AppText>
              <AppText
                style={{
                  fontSize: Sizes.h6,
                  marginVertical: 10,
                }}
                multipleLines={true}
                numberOfLines={3}>
                {item.note}
              </AppText>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default List;
