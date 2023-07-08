import React from 'react';
import {ScrollView} from 'react-native';
import {useQuery} from 'react-query';
import {
  AppHTML,
  AppContainer,
  AppHeader,
  AppText,
  Loading,
  ErrorView,
} from '../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme} from '../../utils';

export default function InsuranceDetail({navigation, route}) {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const datas = route.params?.dataProps;

  const {data, isError, refetch, error, isLoading} = useQuery(
    [`InsuranceDetail-${datas.id}`],
    () => FetchApi.detailNotification(datas.id),
  );

  return (
    <AppContainer>
      <AppHeader
        leftGoBack
        isChild
        title={Strings.Notification_detail.toUpperCase()}
      />
      {isLoading && <Loading />}
      {isError ||
        (data?._error_code == 1 ? (
          <ErrorView title={data?.Message || data?.message || data?._message} />
        ) : (
          <ScrollView
            style={{padding: Sizes.padding}}
            contentContainerStyle={{paddingBottom: 60}}>
            <AppText style={{fontWeight: 'bold'}}>{data?._data?.title}</AppText>
            <AppText style={{color: Colors.greyBold, marginTop: 10}}>
              {data?._data?.sub_title}
            </AppText>
            <AppText
              style={{
                color: Colors.greyBold,
                marginTop: 10,
                marginBottom: 30,
                fontSize: Sizes.h7,
              }}>
              {data?._data?.created_at.slice(0, -3)}
            </AppText>

            {!!data?._data?.content && (
              <AppText style={{fontWeight: 'bold', marginBottom: 10}}>
                {data?._data?.content}
              </AppText>
            )}

            <AppHTML source={{html: data?._data?.description}} />
          </ScrollView>
        ))}
    </AppContainer>
  );
}
