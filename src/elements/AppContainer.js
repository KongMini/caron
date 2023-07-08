import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useInteractionManager} from '@react-native-community/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Sizes, useAppTheme} from '../utils';
import {Loading} from './Loading';

//TODO: include AppKeyBoardAccessory as default
const AppContainer = ({children, style, edges = ['right', 'left']}) => {
  const {Colors} = useAppTheme();
  const interaction = useInteractionManager();
  const inserts = useSafeAreaInsets();

  const renderContent = () => {
    if (!interaction) {
      return <Loading style={{marginTop: Sizes.padding}} />;
    }
    return children;
  };

  return (
    <SafeAreaView
      edges={edges}
      style={[
        {
          flex: 1,
          backgroundColor: Colors.background,
          justifyContent: 'flex-start',
          marginBottom: inserts.bottom,
          // alignItems: 'center',
        },
        style,
      ]}>
      {renderContent()}
    </SafeAreaView>
  );
};

export {AppContainer};
