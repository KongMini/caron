import React from 'react';
import {ScrollView} from 'react-native';
import ListResult from './items/ListResult';
import ListSelect from './items/ListSelect';

const FavoriteCustomization = ({navigation}) => {
  const scrollview = React.useRef();
  return (
    <ScrollView
      ref={scrollview}
      style={{flex: 1}}
      contentContainerStyle={{paddingBottom: 40}}>
      <ListResult scrollview={scrollview} navigation={navigation} />
      <ListSelect />
    </ScrollView>
  );
};

export default FavoriteCustomization;
