import React from 'react';
import {ScrollView} from 'react-native';
import {useQuery} from 'react-query';
import {
  AppHTML,
  AppContainer,
  AppHeader,
  AppImage,
  AppText,
  Loading,
} from '../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme} from '../../utils';

const NewAndBlogDetail = ({navigation, route}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const datas = route.params?.dataProps;

  const {data, isError, refetch, error, isLoading} = useQuery(
    ['NewAndBlogDetail'],
    () => FetchApi.getNewsDetail(datas.id),
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppContainer>
      <AppHeader leftGoBack isChild title={'XEM TIN'} />
      <ScrollView
        style={{padding: Sizes.padding}}
        contentContainerStyle={{paddingBottom: 60}}>
        <AppText style={{fontWeight: 'bold'}}>{data?._data?.title}</AppText>
        <AppImage
          source={{uri: data?._data?.file_name}}
          style={{
            width: Sizes.device_width - Sizes.padding * 2,
            height: ((Sizes.device_width - Sizes.padding * 2) * 9) / 16,
            marginVertical: Sizes.padding / 2,
          }}
        />

        {!!data?._data?.note && (
          <AppText style={{fontWeight: 'bold', marginBottom: 10}}>
            {data?._data?.note}
          </AppText>
        )}

        <AppHTML source={{html: data?._data?.description}} />
      </ScrollView>
    </AppContainer>
  );
};

export default NewAndBlogDetail;
