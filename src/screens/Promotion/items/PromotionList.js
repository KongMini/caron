import React from 'react';
import {View} from 'react-native';
import {Sizes} from '../../../utils';
import PromotionItem from './PromotionItem';

const PromotionList = ({navigation, data, refetch}) => {
  return (
    <View
      style={{
        paddingTop: Sizes.padding,
        width: Sizes.width(94),
        alignSelf: 'center',
      }}>
      {(data || []).map(item => {
        return (
          <PromotionItem
            key={item.id}
            item={item}
            refetch={refetch}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};

export default PromotionList;
