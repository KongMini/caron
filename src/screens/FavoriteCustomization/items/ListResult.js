import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {DraggableGrid} from 'react-native-draggable-grid';

import {AppButton, AppIcon, AppText} from '../../../elements';
import {
  useAppLanguage,
  useAppTheme,
  Sizes,
  IconTypes,
  Svgs,
  Icons,
} from '../../../utils';
import {
  CustomizeFavoriteServices,
  useFavoriteServices,
} from '../services/CustomizeFavoriteServices';

const ListResult = ({scrollview, navigation}) => {
  const {goBack} = useNavigation();
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {favoriteServices, setValue} = useFavoriteServices();

  const onSave = () => {
    const clone = JSON.parse(JSON.stringify(favoriteServices));
    clone.official = clone.temp;
    setValue(clone);
    goBack();
  };
  const onDragRelease = e => {
    const clone = JSON.parse(JSON.stringify(favoriteServices));
    clone.temp = e;
    setValue(clone);
    scrollview.current?.setNativeProps({
      scrollEnabled: true,
    });
  };

  const onRemove = item => {
    const clone = JSON.parse(JSON.stringify(favoriteServices));
    const index = clone.temp.findIndex(itm => itm.key === item.key);
    clone.temp.splice(index, 1);

    const indexAll = clone.allServicesTemp.findIndex(
      itm => itm.key === item.key,
    );
    clone.allServicesTemp[indexAll].isShow = false;

    setValue({...clone});
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: Sizes.padding,
          paddingVertical: 6,
          borderBottomWidth: 0.8,
          borderColor: Colors.superGrey,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AppIcon
            onPress={() => navigation.goBack()}
            icon={Icons.AntDesign_arrowleft}
            type={IconTypes.AntDesign}
            size={Sizes.h2}
            color={Colors.primary}
            hitSlop={{
              top: Sizes.padding,
              left: Sizes.padding,
              bottom: Sizes.padding,
              right: Sizes.padding * 2,
            }}
          />
          <AppText
            style={{
              fontWeight: 'bold',
              color: Colors.greyBold,
              marginLeft: 10,
            }}>
            {Strings.Favorite_service}
          </AppText>
        </View>
        <AppButton
          style={{
            paddingVertical: 4,
            borderWidth: 1,
            borderColor: Colors.greyBold,
            borderRadius: Sizes.border_radius,
          }}
          onPress={onSave}
          renderItem={() => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 8,
              }}>
              <AppIcon
                icon={'save'}
                type={IconTypes.FontAwesome}
                style={{
                  paddingHorizontal: 2,
                  color: Colors.greyLight,
                  fontSize: Sizes.h3,
                  marginRight: 6,
                }}
              />
              <AppText
                style={{
                  fontWeight: '500',
                  color: Colors.greyBold,
                }}>
                {Strings.Save}
              </AppText>
            </View>
          )}
        />
      </View>
    );
  };

  const renderItem = item => {
    return (
      <View
        key={`${item.key}-${item.isShow}`}
        style={{
          height: 60,
          width: Sizes.width(100 / 4.1),
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{position: 'absolute', top: -8, right: 16}}>
            <AppIcon
              onPress={() => onRemove(item)}
              icon={'closecircle'}
              type={'AntDesign'}
              style={{
                paddingHorizontal: 2,
                color: 'black',
                fontSize: Sizes.h5,
              }}
            />
          </View>
          {Svgs[item.icon]()}
          <AppText
            style={{
              fontSize: Sizes.h6,
              textAlign: 'center',
              color: Colors.greyBold,
            }}>
            {Strings[item.key]}
          </AppText>
        </View>
      </View>
    );
  };

  const filteredData = favoriteServices.temp.filter(itm => {
    return itm.isShow;
  });

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: Colors.borderColorGrey,
        paddingBottom: 10,
      }}>
      {renderHeader()}
      <DraggableGrid
        style={{marginTop: 20, marginBottom: 20}}
        itemHeight={120}
        numColumns={(Sizes.device_width < Sizes.device_height) ? 3 : 4}
        renderItem={renderItem}
        data={filteredData}
        onDragStart={() => {
          scrollview.current?.setNativeProps({
            scrollEnabled: false,
          });
        }}
        onDragRelease={onDragRelease}
      />
    </View>
  );
};

export default ListResult;
