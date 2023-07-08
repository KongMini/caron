import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';

import {AppContainer, AppHeader} from '../../elements';
import {Convert, useAppAccount, useAppLanguage, Sizes} from '../../utils';
import Step from './items/Step';
import Information from './items/Information';
import BookingSchedule from './items/BookingSchedule';
import dayjs from 'dayjs';

function HomeService({navigation, route}) {
  const {Strings} = useAppLanguage();
  const [account] = useAppAccount();
  const {control, handleSubmit, setValue, getValues, watch, trigger, reset} =
    useForm({
      mode: 'all',
      defaultValues: {date_at: dayjs().add(1, 'hour')},
    });

  const [screen, setScreen] = useState(
    route.params?.screenActive || 'Information',
  );

  useEffect(() => {
    setValue('isMe', true);
    setValue(
      'name',
      account?.user_info?.first_name + ' ' + account?.user_info?.last_name,
    );
    setValue('phone', account?.user_info?.phone || '');
    setValue('email', account?.user_info?.user_email);
  }, []);

  const onGoBack = () => {
    if (screen === 'Information') {
      reset();
      navigation.goBack();
    }
    if (screen === 'Booking') {
      setScreen('Information');
    }
  };

  const getScreen = () => {
    switch (screen) {
      case 'Information':
        return {
          component: Information,
          config: {
            watch: watch,
            setScreen: setScreen,
            control: control,
            handleSubmit: handleSubmit,
            getValues: getValues,
            setValue: setValue,
            trigger: trigger,
          },
        };
      case 'Booking':
        return {
          component: BookingSchedule,
          config: {
            setScreen: setScreen,
            control: control,
            handleSubmit: handleSubmit,
            getValues: getValues,
            watch: watch,
            setValue: setValue,
            reset: reset,
          },
        };
    }
  };

  const DataRendering =  Sizes.isMobile ? [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.Booking_home_service.toUpperCase(),
        onPressLeft: onGoBack,
      },
    },
    {
      component: Step,
      config: {
        screen: screen,
      },
    },
    {...getScreen()},
  ] :  [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.Booking_home_service.toUpperCase(),
        onPressLeft: onGoBack,
      },
    },
    {...getScreen()},
  ];

  return (
    <AppContainer style={{marginBottom: 0}}>
      <View>
        {DataRendering.map((item, index) => {
          const Component = item.component;
          const children = Convert.dataRenderingChildren({item});
          return (
            <Component key={`${index}`} {...item.config}>
              {children}
            </Component>
          );
        })}
      </View>
    </AppContainer>
  );
}

export default HomeService;
