import React, {useEffect} from 'react';
import {UIManager} from 'react-native';
import CodePush from 'react-native-code-push';
import {QueryClient, QueryClientProvider} from 'react-query';

import {enableScreens} from 'react-native-screens';
import RNBootSplash from 'react-native-bootsplash';

enableScreens();

import {appKeys} from './utils';
import AppContent from './AppContent';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    RNBootSplash.show();
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    // Orientation.lockToPortrait();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
  deploymentKey: appKeys.codePush,
};

export default CodePush(codePushOptions)(App);
