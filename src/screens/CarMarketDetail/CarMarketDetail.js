import {View, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {
  FetchApi,
  Sizes,
  useAppLanguage,
  useAppTheme,
  Convert,
} from '../../utils';
import {
  AppContainer,
  AppHeader,
  AppHTML,
  AppIcon,
  AppImage,
  AppText,
  ErrorView,
  Loading,
} from '../../elements';
import {useQuery} from 'react-query';

function CarMarketDetail({navigation, route}) {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {id} = route.params.data;
  const {data, isLoading} = useQuery(`CarMarketDetail-${id}`, () =>
    FetchApi.detailCarMarket(id),
  );

  const renderContent = () => {
    return (
      <View>
        <AppText
          style={{fontWeight: 'bold', color: '#5603fc', marginBottom: 10}}>
          {data._data?.tenxe}
        </AppText>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppText style={{flex: 1, color: Colors.primary, fontWeight: 'bold'}}>
            {Strings.price}: {Convert.vnd(data._data?.giaxe, true)}
          </AppText>
          <AppText style={{fontWeight: 'bold', color: Colors.primary}}>
            {data._data?.status == 1 ? Strings.Chua_ban : ''}
          </AppText>
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {!!data._data?.image1 && (
            <AppImage
              style={{
                width: Sizes.width(45),
                height: Sizes.width(45),
                marginBottom: 10,
              }}
              resizeMode="contain"
              source={{uri: data._data?.image1}}
            />
          )}
          {!!data._data?.image2 && (
            <AppImage
              style={{
                width: Sizes.width(45),
                height: Sizes.width(45),
                marginBottom: 10,
              }}
              resizeMode="contain"
              source={{uri: data._data?.image2}}
            />
          )}
          {!!data._data?.image3 && (
            <AppImage
              style={{
                width: Sizes.width(45),
                height: Sizes.width(45),
                marginBottom: 10,
              }}
              resizeMode="contain"
              source={{uri: data._data?.image3}}
            />
          )}
          {!!data._data?.image4 && (
            <AppImage
              style={{
                width: Sizes.width(45),
                height: Sizes.width(45),
                marginBottom: 10,
              }}
              resizeMode="contain"
              source={{uri: data._data?.image4}}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            paddingVertical: 10,
          }}>
          <AppText style={{width: '50%'}}>
            - {Strings.Car_color}: {data._data?.mausac}
          </AppText>
          <AppText style={{width: '50%'}}>
            - {Strings.Nam_dang_ky}: {data._data?.namdangky}
          </AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 6,
          }}>
          <View style={{flex: 1}}>
            {!!data._data?.name && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppIcon
                  icon={'user'}
                  type={'AntDesign'}
                  size={Sizes.h5}
                  color={'#5603fc'}
                  hitSlop={{
                    top: Sizes.padding,
                    left: Sizes.padding,
                    bottom: Sizes.padding,
                    right: Sizes.padding * 2,
                  }}
                />
                <AppText style={{fontWeight: 'bold', marginLeft: 6}}>
                  {data._data?.name}
                </AppText>
              </View>
            )}
            {!!data._data?.phone && (
              <TouchableOpacity
                onPress={() => onCall(item.phone)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <AppIcon
                  icon={'phone'}
                  type={'AntDesign'}
                  size={Sizes.h5}
                  color={'#5603fc'}
                  hitSlop={{
                    top: Sizes.padding,
                    left: Sizes.padding,
                    bottom: Sizes.padding,
                    right: Sizes.padding * 2,
                  }}
                />
                <AppText style={{fontWeight: 'bold', marginLeft: 6}}>
                  {data._data?.phone}
                </AppText>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {!!data._data?.note && (
          <View style={{paddingHorizontal: 10}}>
            <AppHTML source={{html: data._data?.note}} />
          </View>
        )}
      </View>
    );
  };
  const renderView = () => {
    if (isLoading) {
      return <Loading style={{marginTop: 40}} />;
    }

    if (data._error_code) {
      return <ErrorView title={data.message} />;
    }

    return renderContent();
  };

  return (
    <AppContainer>
      <AppHeader leftGoBack isChild title={Strings.Thong_tin_xe} />
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 10, paddingTop: 10}}>
        {renderView()}
      </ScrollView>
    </AppContainer>
  );
}

export default CarMarketDetail;
