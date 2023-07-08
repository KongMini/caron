import React from 'react';
import {View} from 'react-native';

import {AppButton, AppIcon, AppText} from '../../../elements';
import {useAppLanguage, useAppTheme, Sizes, Svgs} from '../../../utils';
import {useFavoriteServices} from '../services/CustomizeFavoriteServices';

const ListSelect = () => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {favoriteServices, setValue} = useFavoriteServices();

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: Sizes.padding,
          borderBottomWidth: 0.8,
          borderColor: Colors.superGrey,
          paddingVertical: 10,
        }}>
        <AppText style={{fontWeight: 'bold', color: Colors.greyBold}}>
          {Strings.Choose_service}
        </AppText>
      </View>
    );
  };

  const onHandleShowItem = item => {
    const clone = JSON.parse(JSON.stringify(favoriteServices));
    const index = clone.allServicesTemp.findIndex(itm => itm.key == item.key);
    clone.allServicesTemp[index].isShow = !item.isShow;

    if (item.isShow) {
      const indexTemp = clone.temp.findIndex(itm => itm.key === item.key);
      clone.temp.splice(indexTemp, 1);
    } else {
      clone.temp.push(clone.allServices[index]);
    }

    setValue(clone);
  };

  const Item = ({item}) => {
    return (
      <AppButton
        key={`${item.key}-${item.isShow}`}
        style={{
          width: (Sizes.device_width < Sizes.device_height) ? Sizes.width(100 / 3.1) : Sizes.width(100 / 4.1),
          marginVertical: 10,
        }}
        onPress={() => onHandleShowItem(item)}
        renderItem={() => {
          return (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <AppIcon
                icon={item.isShow ? 'checkcircle' : 'pluscircleo'}
                type={'AntDesign'}
                style={{
                  paddingHorizontal: 2,
                  color: item.isShow ? 'green' : 'tomato',
                  fontSize: Sizes.h5,
                  position: 'absolute',
                  right: 16,
                  top: 0,
                }}
              />
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
          );
        }}
      />
    );
  };

  return (
    <View>
      {renderHeader()}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 10,
        }}>
        {favoriteServices.allServicesTemp.map(item => {
          return <Item key={item.key} item={item} />;
        })}
      </View>
    </View>
  );
};

export default ListSelect;
