import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useQuery} from 'react-query';
import {AppHTML, AppIcon, AppImage, AppText} from '../../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme} from '../../../utils';

const Header = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const {data} = useQuery(`Introduction-gara`, FetchApi.introductionGara);

  console.log(data)

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <AppText
          style={{
            color: Colors.greyBold,
            fontSize: Sizes.h4,
            width: '70%',
            fontWeight: 'bold',
          }}>
          {data?._data?.dsTin?.title || ''}
        </AppText>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <AppHTML source={{html: data?._data?.dsTin?.description}} />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('CaronGarages')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: Colors.greyThin,
          marginVertical: 14,
          padding: 12,
          alignItems: 'center',
        }}>
        <AppText
          style={{
            fontSize: Sizes.h4,
            color: Colors.greyBold,
            fontWeight: 'bold',
          }}>
          {Strings.Find_caron_gara.toUpperCase()}
        </AppText>
        <AppIcon icon="arrowright" type="AntDesign" color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
