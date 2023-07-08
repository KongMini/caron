import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

import {AppContainer} from './AppContainer';
import {AppHeader} from './AppHeader';
import {Loading} from './Loading';
import {DataNull} from './DataNull';
import {Sizes, useAppLanguage} from '../utils';

//TODO: refactor code
const AppWeb = ({title, source}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({status: false, message: ''});
  const {Strings} = useAppLanguage();
  const webViewRef = useRef(null);

  const onPressRetry = () => {
    error.status = false;
    setLoading(true);
    webViewRef.current.reload();
  };
  const onError = e => {
    console.log('onError', e);
    setError({status: true, message: Strings.Tap_to_retry});
  };
  const onLoadStart = () => {
    error.status = false;
    setLoading(true);
  };
  const onLoadEnd = () => {
    setLoading(false);
  };
  const renderError = () => {
    if (loading) {
      return null;
    }
    if (error.status) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: Sizes.device_width,
            padding: Sizes.padding,
          }}>
          <DataNull title={Strings.Tap_to_retry} onPress={onPressRetry} />
        </View>
      );
    }
  };
  const renderLoading = () => {
    if (loading) {
      return (
        <Loading
          style={{
            padding: Sizes.padding,
          }}
        />
      );
    }
    return null;
  };
  return (
    <AppContainer style={{flex: 1}}>
      {(title) ? 
      <AppHeader hasRightMenu leftGoBack title={title} />: null}
      {renderLoading()}
      {renderError()}
      <WebView
        ref={webViewRef}
        style={{
          width: Sizes.device_width,
          height:Sizes.device_height,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 1,
          opacity: 0.99,
        }}
        containerStyle={{overflow: 'hidden'}} // Fix bug crash on some android devices
        originWhitelist={['*']}
        onError={onError}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        source={{uri: source}}
      />
    </AppContainer>
  );
};

export {AppWeb};
