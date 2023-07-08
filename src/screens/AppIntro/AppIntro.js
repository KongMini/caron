import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';

import {
  AppContainer,
  AppText,
  AppButton,
  Loading,
  AppImage,
} from '../../elements';
import {
  ResetFunction,
  Sizes,
  useAppTheme,
  useAppLanguage,
  ComonStyle,
  useAppAccount,
  AccountService,
} from '../../utils';
import {AppIntroService} from './modules/AppIntroService';

const StartUseApp = ({onPressNext}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const insert = useSafeAreaInsets();
  return (
    <View
      style={{
        // backgroundColor: '#FFFFFFB3',
        position: 'absolute',
        width: Sizes.device_width,
        bottom: 0,
        paddingBottom: insert.bottom || Sizes.padding,
        paddingTop: Sizes.padding,
        elevation: Sizes.elevation,
        shadowOpacity: 0.6,
        shadowOffset: {width: 0.5, height: 1},
        shadowRadius: 2,
        shadowColor: Colors.sub_text,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: Sizes.height('10%'),
      }}>
      <AppButton
        title={Strings.AppIntro_next}
        textStyle={{color: Colors.background, fontWeight: 'bold'}}
        onPress={onPressNext}
        style={{
          width: (Sizes.device_width < Sizes.device_height) ? Sizes.width('85%') :  Sizes.width('30%'),
          paddingVertical: Sizes.padding,
          backgroundColor: Colors.success,
          borderRadius: Sizes.border_radius,
        }}
      />
    </View>
  );
};

const AppIntro = ({navigation}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const account = AccountService.get();
  console.log('accoutt', account);

  const swiperRef = useRef(null);

  const {hasShow} = AppIntroService.get();
  useEffect(() => {
    if (hasShow) {
      //TODO: currently don't need a account to use app
      if (account?.api_token) {
        ResetFunction.resetToHome(navigation);
      } else {
        ResetFunction.resetToLogin(navigation);
      }
    }
  }, []);

  // if (hasShow) {
  //   return (
  //     <View
  //       style={{
  //         width: Sizes.device_width,
  //         height: Sizes.device_height,
  //         justifyContent: 'center',
  //       }}>
  //       <Loading />
  //     </View>
  //   );
  // }

  const data = (Sizes.device_width > Sizes.device_height)?[{
      image: require('../../utils/images/appintro1.jpg'),
    },
    {
      image: require('../../utils/images/appintro2.jpg'),
    },
    {
      image: require('../../utils/images/appintro3.jpg'),
    }]: [
      {
        image: require('../../utils/images/appintro_1.png'),
      },
      {
        image: require('../../utils/images/appintro_2.png'),
      },
      {
        image: require('../../utils/images/appintro_3.png'),
      },
    ];
  

  const length = data.length;
  const onPressNext = () => {
    if (!swiperRef.current) {
      return;
    }

    if (swiperRef.current?.state?.index === length - 1) {
      AppIntroService.set(true);
      if (account?.accessToken) {
        ResetFunction.resetToHome();
      } else {
        ResetFunction.resetToLogin();
      }
      return;
    }
    swiperRef.current.scrollBy(1);
  };

  return (
    <AppContainer style={{marginBottom: 0}}>
      <Swiper
        loop={false}
        ref={swiperRef}
        showsPagination={false}
        // onIndexChanged={index => {
        //   console.log('onIndexChanged', index);
        //   if (index === data.length - 1) {
        //     AppLayoutAnimation.linear();
        //     setLast(true);
        //   }
        // }}
      >
        {data.map((item, index) => {
          return (
            <AppContainer
              edges={[]}
              key={`${index}`}
              style={{alignItems: 'center'}}>
              {item.image !== undefined && (
                <View style={{flex: 1, position: 'absolute'}}>
                  <AppImage
                    source={item.image}
                    style={{
                      width: Sizes.device_width,
                      height: Sizes.device_height,
                    }}
                  />
                </View>
              )}

              <View
                style={[
                  ComonStyle.center,
                  {
                    padding: Sizes.padding,
                    position: 'absolute',
                    bottom: Sizes.height('10%') + Sizes.padding,
                  },
                ]}>
                <View
                  style={{
                    paddingBottom: Sizes.padding,
                    alignSelf: 'flex-start',
                  }}>
                  {item.title}
                </View>
                <AppText
                  style={{
                    fontSize: Sizes.h3,
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  {item.description}
                </AppText>
              </View>
            </AppContainer>
          );
        })}
      </Swiper>
      <StartUseApp onPressNext={onPressNext} />
    </AppContainer>
  );
};
export default AppIntro;
