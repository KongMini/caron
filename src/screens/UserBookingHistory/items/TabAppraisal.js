import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import {FlatList} from 'react-native';
import {View} from 'react-native';
import {useQuery} from 'react-query';
import {
  AppButton,
  AppContainer,
  AppText,
  Loading,
  DataNull,
} from '../../../elements';
import {
  Convert,
  FetchApi,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

function TabAppraisal({}) {
  const {Strings} = useAppLanguage();
  const {data, isLoading, refetch, isFetching} = useQuery(`TabAppraisal`, () =>
    FetchApi.bookingList(1),
  );

  const renderContent = () => {
    return (
      <FlatList
        contentContainerStyle={{
          padding: Sizes.padding,
          paddingBottom: 100,
          paddingTop: 12,
        }}
        keyExtractor={(item, index) => `${item.ROWNUM}-${index}`}
        renderItem={({item, index}) => {
          return <Item key={`${item.id}`} item={item} />;
        }}
        refreshing={isFetching}
        onRefresh={refetch}
        onEndReachedThreshold={0.8}
        data={data?._data || []}
        ListEmptyComponent={<DataNull title={Strings.Not_update_yet} />}
      />
    );
  };
  const renderBeforeCall = () => {
    if (isLoading) {
      return <Loading />;
    }
    return renderContent();
  };

  return <AppContainer>{renderBeforeCall()}</AppContainer>;
}

const Item = ({item}) => {
  const navigation = useNavigation();
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const status = {
    1: Strings.Seen,
    0: Strings.Not_have,
    2: Strings.Cancel,
  };

  return (
    <View
      key={item.code}
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderColor: Colors.greyThin,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <AppText style={{flex: 1, fontSize: Sizes.h6, marginBottom: 8}}>
            {Strings.License_plates + '\n' + item.license_plates}
          </AppText>
          <AppButton
            title={Strings.Status + ': ' + status[item.status]}
            textStyle={{
              fontSize: Sizes.h5,
              color: item.status == 1 ? Colors.primary : Colors.greyBold,
            }}
            onPress={() => {}}
          />
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <AppText style={{fontSize: Sizes.h6, color: Colors.primary}}>
            {Strings.Date}: {dayjs(item.date_at).format('DD/MM/YYYY')}
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 6,
            }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
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
            <AppText style={{fontSize: Sizes.h6, color: Colors.primary}}>
              {Strings.All_cost}: {Convert.vnd(item.total || 0)}
            </AppText>
          </View>
        </View>
      </View>

      <AppButton
        onPress={() =>
          navigation.navigate('UserBookingHistoryDetail', {data: item})
        }
        title={Strings.Detail}
        type="primary"
        style={{
          paddingVertical: 4,
          minWidth: 100,
          marginHorizontal: 0,
        }}
        textStyle={{fontSize: Sizes.h5, fontWeight: '400'}}
        wrapperStyle={{width: '30%', alignSelf: 'flex-end'}}
      />
    </View>
  );
};

export default TabAppraisal;
