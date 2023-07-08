import React, {useState} from 'react';
import {useWatch} from 'react-hook-form';
import {View, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {AppButton, AppIcon, AppText} from '../../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme} from '../../../utils';

const TabBar = ({setValue, control}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const searchInput = React.useRef();
  const searchString = React.useRef('');
  const tabs = useWatch({control, name: 'tabs'});
  const screen = useWatch({control, name: 'screen'});

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
    setValue('list', []);
    const result = await FetchApi.searchExperience({
      keysearch: searchString.current,
    });
    if (Array.isArray(result._data?.kinhnghiem)) {
      setValue('list', result._data?.kinhnghiem);
    }
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
                  borderBottomWidth: 0.7,
                  borderRightWidth: 0.7,
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
                borderTopWidth: 0,
                borderRightWidth: item.id !== 'Video' ? 0.7 : 0,
                borderBottomWidth: 0.7,
                paddingHorizontal: 10,
                paddingVertical: 6,
                justifyContent: 'center',
              }}>
              <AppText
                style={{
                  color: item.id === screen ? Colors.primary : Colors.text,
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
