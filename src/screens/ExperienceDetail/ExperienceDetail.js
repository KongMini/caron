import React from 'react';
import {View, ScrollView} from 'react-native';
import {
  AppButton,
  AppContainer,
  AppHeader,
  AppHTML,
  AppImage,
  AppText,
} from '../../elements';
import {Convert, Sizes, useAppLanguage, useAppTheme} from '../../utils';

const ExperienceDetail = ({navigation, route}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const datas = route.params?.dataProps;
  console.log('ExperienceDetail', datas);
  console.log('ExperienceDetail', datas?.content);
  return (
    <AppContainer>
      <AppHeader leftGoBack isChild title={'XEM TIN'} />
      <ScrollView
        style={{padding: Sizes.padding}}
        contentContainerStyle={{paddingBottom: 60}}>
        <AppText style={{fontWeight: 'bold'}}>{datas?.title}</AppText>
        <AppImage
          source={{uri: datas?.image}}
          style={{
            width: Sizes.device_width - Sizes.padding * 2,
            height: ((Sizes.device_width - Sizes.padding * 2) * 9) / 16,
            marginVertical: Sizes.padding / 2,
          }}
        />

        {!!datas?.titleShort && (
          <AppText style={{fontWeight: 'bold', marginBottom: 10}}>
            {datas?.titleShort}
          </AppText>
        )}
        <AppText
          style={{paddingBottom: Sizes.padding / 2, color: Colors.greyBold}}>
          {datas.time}
        </AppText>

        {/* <AppText style={{marginVertical: Sizes.padding}}>
          {datas.content || datas.description}
        </AppText> */}
        <AppHTML source={{html: datas.content || datas.description}} />
      </ScrollView>
    </AppContainer>
  );
};

export default ExperienceDetail;
