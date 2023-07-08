import React, {useRef, useState} from 'react';
import {useWatch} from 'react-hook-form';
import {View, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {AppButton, AppIcon, AppText} from '../../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme} from '../../../utils';

const TabBar = ({control, setValue, watch}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const searchInput = React.useRef();
  const searchString = React.useRef('');
  const tabs = useWatch({control, name: 'tabs'});
  const screen = watch('screen');
  const timeout = useRef();

  const [showSearch, setShowSearch] = useState(false);

  React.useEffect(() => {
    if (showSearch) {
      searchInput.current.focus();
    }
  }, [showSearch]);

  let DATA = [];
  if (Array.isArray(tabs)) {
    DATA = [
      {type: 'SEARCH', label: Strings.Search},
      ...tabs.map(item => {
        return {label: item.title, id: item.id};
      }),
    ];
  }

  const onSearch = async () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setValue('keysearch', searchString.current);
    }, 1000);
  };

  return (
    <View>
      <ScrollView
        bounces={false}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {DATA.map((item, index) => {
          if (item.type === 'SEARCH') {
            return (
              <View
                key={`${index}`}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderColor: Colors.greyThin,
                  paddingHorizontal: 8,
                }}>
                <AppIcon
                  icon="search"
                  type="Fontisto"
                  size={Sizes.h5}
                  onPress={() => {
                    setShowSearch(prev => !prev);
                    setValue('screen', '');
                  }}
                />
                {showSearch && (
                  <>
                    <TextInput
                      ref={searchInput}
                      style={{
                        width: 170,
                        marginLeft: 6,
                        padding: 8,
                      }}
                      defaultValue={searchString.current}
                      onChangeText={e => (searchString.current = e)}
                    />
                    <AppButton
                      onPress={onSearch}
                      type="primary"
                      title={Strings.Search}
                      textStyle={{fontSize: Sizes.h5, fontWeight: '400'}}
                      style={{
                        paddingVertical: 0,
                        marginHorizontal: 0,
                        marginVertical: 0,
                        paddingVertical: 3,
                        paddingHorizontal: 3,
                      }}
                    />
                  </>
                )}
              </View>
            );
          }
          return (
            <TouchableOpacity
              key={`${index}`}
              onPress={() => {
                setValue('screen', item.id);
              }}
              activeOpacity={0.8}
              style={{
                borderColor: Colors.greyThin,
                borderTopWidth: 1,
                borderRightWidth: item.id !== 'Video' ? 1 : 0,
                borderBottomWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 6,
                justifyContent: 'center',
                width: Sizes.width(48),
              }}>
              <AppText
                style={{
                  color: item.id == screen ? Colors.primary : Colors.text,
                }}>
                {item.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TabBar;
