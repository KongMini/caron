import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Menu from '../screens/Menu/Menu';
import LanguageSetting from '../screens/LanguageSetting/LanguageSetting';
import ModeSetting from '../screens/ModeSetting/ModeSetting';
import AboutUs from '../screens/AboutUs/AboutUs';

import {useAppLanguage} from '../utils';
import {DrawerButton} from './items/DrawerButton';
import MyCar from '../screens/MyCar/MyCar';
import Booking from '../screens/Booking/Booking';
import AnnouncePriceServices from '../screens/AnnouncePriceServices/AnnouncePriceServices';
import CarAppraisal from '../screens/CarAppraisal/CarAppraisal';
import RemindAccreditation from '../screens/RemindAccreditation/RemindAccreditation';
import Promotion from '../screens/Promotion/Promotion';
import PromotionDetail from '../screens/PromotionDetail/PromotionDetail';
import Experience from '../screens/Experience/Experience';
import ExperienceDetail from '../screens/ExperienceDetail/ExperienceDetail';
import Introduction from '../screens/Introduction/Introduction';
import CaronGarages from '../screens/CaronGarages/CaronGarages';
import History from '../screens/History/History';
import HistoryDetail from '../screens/History/HistoryDetail';
import ServiceRating from '../screens/History/ServiceRating';
import BuyInsurance from '../screens/BuyInsurance/BuyInsurance';
import BuyInsuranceDetail from '../screens/BuyInsuranceDetail/BuyInsuranceDetail';
import FindAccessory from '../screens/FindAccessory/FindAccessory';
import FindTrafficViolation from '../screens/FindTrafficViolation/FindTrafficViolation';
import FindTrafficViolationDetail from '../screens/FindTrafficViolationDetail/FindTrafficViolationDetail';
import FindTrafficSanction from '../screens/FindTrafficSanction/FindTrafficSanction';
import NewAndBlogDetail from '../screens/NewAndBlogDetail/NewAndBlogDetail';
import NewAndBlog from '../screens/NewAndBlog/NewAndBlog';
import NotFound from '../screens/NotFound/NotFound';
import Gift from '../screens/Gift/Gift';
import UserInfo from '../screens/UserInfo/UserInfo';
import UserBookingHistory from '../screens/UserBookingHistory/UserBookingHistory';
import UserInfoDetail from '../screens/UserInfoDetail/UserInfoDetail';
import UserBookingHistoryDetail from '../screens/UserBookingHistoryDetail/UserBookingHistoryDetail';
import Rescue from '../screens/Rescue/Rescue';
import HomeService from '../screens/_HomeService/HomeService';
import CarMarket from '../screens/CarMarket/CarMarket';
import CarMarketDetail from '../screens/CarMarketDetail/CarMarketDetail';
import UserHomeServiceDetail from '../screens/UserHomeServiceDetail/UserHomeServiceDetail';
import Maintain from '../screens/Maintain/Maintain';
import MaintainDetail from '../screens/MaintainDetail/MaintainDetail';
import Insurance from '../screens/Insurance/Insurance';
import InsuranceDetail from '../screens/InsuranceDetail/InsuranceDetail';
import Notification from '../screens/Notification/Notification';
import NotificationDetail from '../screens/NotificationDetail/NotificationDetail';

import CsBaoHanh from '../screens/CsBaoHanh/CsBaoHanh';
import KhBaoHanh from '../screens/KhBaoHanh/KhBaoHanh';
import Web from '../screens/Web/Web';

const Stack = createStackNavigator();

const AllStackNavigator = ({navigation, route}) => {
  const {initialRouteName} = route.params;
  const {Strings} = useAppLanguage();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerTitle: Strings.Settings,
          headerLeft: DrawerButton,
        }}
      />
      <Stack.Screen
        name="LanguageSetting"
        component={LanguageSetting}
        options={{headerTitle: Strings.Language}}
      />
      <Stack.Screen
        name="ModeSetting"
        component={ModeSetting}
        options={{headerTitle: Strings.Mode}}
      />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="MyCar" component={MyCar} />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AnnouncePriceServices"
        component={AnnouncePriceServices}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CarAppraisal" component={CarAppraisal} />
      <Stack.Screen
        name="RemindAccreditation"
        component={RemindAccreditation}
      />
      <Stack.Screen name="Promotion" component={Promotion} />
      <Stack.Screen name="PromotionDetail" component={PromotionDetail} />
      <Stack.Screen name="Experience" component={Experience} />
      <Stack.Screen name="ExperienceDetail" component={ExperienceDetail} />
      <Stack.Screen name="Introduction" component={Introduction} />
      <Stack.Screen name="CaronGarages" component={CaronGarages} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
      <Stack.Screen name="ServiceRating" component={ServiceRating} />
      <Stack.Screen name="BuyInsurance" component={BuyInsurance} />
      <Stack.Screen name="BuyInsuranceDetail" component={BuyInsuranceDetail} />
      <Stack.Screen name="FindAccessory" component={FindAccessory} />
      <Stack.Screen
        name="FindTrafficViolation"
        component={FindTrafficViolation}
      />
      <Stack.Screen
        name="FindTrafficViolationDetail"
        component={FindTrafficViolationDetail}
      />
      <Stack.Screen
        name="FindTrafficSanction"
        component={FindTrafficSanction}
      />
      <Stack.Screen name="NewAndBlog" component={NewAndBlog} />
      <Stack.Screen name="NewAndBlogDetail" component={NewAndBlogDetail} />
      <Stack.Screen name="Gift" component={Gift} />
      <Stack.Screen name="UserInfo" component={UserInfo} />
      <Stack.Screen name="UserBookingHistory" component={UserBookingHistory} />
      <Stack.Screen name="UserInfoDetail" component={UserInfoDetail} />
      <Stack.Screen
        name="UserBookingHistoryDetail"
        component={UserBookingHistoryDetail}
      />
      <Stack.Screen name="Rescue" component={Rescue} />
      <Stack.Screen name="NotFound" component={NotFound} />
      <Stack.Screen name="HomeService" component={HomeService} />
      <Stack.Screen name="CarMarket" component={CarMarket} />
      <Stack.Screen name="CarMarketDetail" component={CarMarketDetail} />
      <Stack.Screen
        name="UserHomeServiceDetail"
        component={UserHomeServiceDetail}
      />
      <Stack.Screen name="Maintain" component={Maintain} />
      <Stack.Screen name="MaintainDetail" component={MaintainDetail} />
      <Stack.Screen name="Insurance" component={Insurance} />
      <Stack.Screen name="InsuranceDetail" component={InsuranceDetail} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetail} />

      <Stack.Screen name="CsBaoHanh" component={CsBaoHanh} />
      <Stack.Screen name="KhBaoHanh" component={KhBaoHanh} />
      <Stack.Screen name="Web" component={Web} />

    </Stack.Navigator>
  );
};
export default AllStackNavigator;
