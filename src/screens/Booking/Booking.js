import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';

import {AppContainer, AppHeader} from '../../elements';
import {Convert, useAppAccount, useAppLanguage} from '../../utils';
import Information from './items/Information';
import Step from './items/Step';
import Services from './items/Services';
import BookingSchedule from './items/BookingSchedule';
import ServicesAddition from './items/ServicesAddition';
import Cost from './items/Cost';
import PromotionList from './items/PromotionList';
import { Sizes } from '../../utils';

function Booking({navigation, route}) {
  const {Strings} = useAppLanguage();
  const [account] = useAppAccount();
  const {control, handleSubmit, setValue, getValues, watch, trigger, reset} =
    useForm({
      mode: 'all',
      defaultValues: {...route.params?.dataBooking},
    });
  console.log('dataBooking', {...route.params?.dataBooking});

  useEffect(() => {
    if (!route.params?.dataBooking || route.params?.dataBooking.isMe) {
      setValue('isMe', true);
      setValue(
        'name',
        account?.user_info?.first_name + ' ' + account?.user_info?.last_name,
      );
      setValue('phone', account?.user_info?.phone || '');
      setValue('email', account?.user_info?.user_email);
    }
  }, []);

  const [screen, setScreen] = useState(
    route.params?.screenActive || 'Information',
  ); //Information, Booking_2, Services, Add_services, Cost

  const onGoBack = () => {
    if (screen === 'Information') {
      reset();
      navigation.goBack();
    }
    if (screen === 'Booking_2') {
      setScreen('Information');
    }
    if (screen === 'Services') {
      setScreen('Booking_2');
    }
    if (screen === 'Cost' || screen === 'Add_services') {
      setScreen('Services');
    }
    if (screen === 'PromotionList') {
      setScreen('Cost');
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
      case 'Booking_2':
        return {
          component: BookingSchedule,
          config: {
            setScreen: setScreen,
            control: control,
            handleSubmit: handleSubmit,
            getValues: getValues,
            watch: watch,
            setValue: setValue,
          },
        };
      case 'Services':
        return {
          component: Services,
          config: {
            setScreen: setScreen,
            control: control,
            setValue: setValue,
            getValues: getValues,
          },
        };
      case 'Add_services':
        return {
          component: ServicesAddition,
          config: {
            setScreen: setScreen,
            control: control,
            handleSubmit: handleSubmit,
            setValue: setValue,
            getValues: getValues,
          },
        };
      case 'Cost':
        return {
          component: Cost,
          config: {
            setScreen: setScreen,
            control: control,
            handleSubmit: handleSubmit,
            setValue: setValue,
            reset: reset,
          },
        };
      case 'PromotionList':
        return {
          component: PromotionList,
          config: {
            setScreen: setScreen,
            control: control,
            handleSubmit: handleSubmit,
            setValue: setValue,
            watch: watch,
          },
        };
    }
  };

  const DataRendering = Sizes.isMobile ? [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.Services_booking.toUpperCase(),
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
  ]: 
  [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.Services_booking.toUpperCase(),
        onPressLeft: onGoBack,
      },
    },
    {...getScreen()},
  ]
  ;

  return (
    <AppContainer style={{marginBottom: 0}}>
      {DataRendering.map((item, index) => {
        const Component = item.component;
        const children = Convert.dataRenderingChildren({item});
        return (
          <Component key={`${index}`} {...item.config}>
            {children}
          </Component>
        );
      })}
    </AppContainer>
  );
}

export default Booking;
