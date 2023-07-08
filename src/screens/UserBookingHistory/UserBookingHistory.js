import React, {useState} from 'react';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';

import {Sizes, useAppLanguage, useAppTheme} from '../../utils';
import {AppHeader, AppContainer} from '../../elements';
import TabBooking from './items/TabBooking';
import TabHomeService from './items/TabHomeService';
import TabAppraisal from './items/TabAppraisal';

export default function UserBookingHistory() {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'TabBooking', title: Strings.DV_sua_chua},
    {key: 'TabHomeService', title: Strings.DV_tai_nha},
    {key: 'TabAppraisal', title: Strings.DV_tham_dinh},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      style={{
        backgroundColor: 'white',
        shadowColor: Colors.placeholder,
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 2},
      }}
      activeColor={Colors.primary}
      inactiveColor={'#A0A4AA'}
      getLabelText={({route}) => route.title}
      labelStyle={{fontSize: Sizes.h6, margin: 0}}
      indicatorStyle={{backgroundColor: Colors.primary}}
      tabStyle={{width: Sizes.width(33.3)}}
    />
  );

  return (
    <AppContainer>
      <AppHeader isChild title={Strings.Lich_hen} leftGoBack />
      <TabView
        renderTabBar={renderTabBar}
        lazy
        navigationState={{index, routes}}
        swipeEnabled={false}
        onIndexChange={setIndex}
        initialLayout={{width: Sizes.device_width}}
        renderScene={SceneMap({
          TabBooking: TabBooking,
          TabHomeService: TabHomeService,
          TabAppraisal: TabAppraisal,
        })}
      />
    </AppContainer>
  );
}
