import React, {useState} from 'react';
import {View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Loading} from './Loading';

const getResizeMode = resizeMode => {
  switch (resizeMode) {
    case 'contain':
      return FastImage.resizeMode.contain;
    default:
      return FastImage.resizeMode.cover;
  }
};
/**image url **/
const isValidUrl = url => {
  if (!url) {
    return false;
  }
  if (url.substring(0, 4) !== 'http') {
    return false;
  }
  return url.match(/\.(jpeg|jpg|gif|png|JPEG|JPG|PNG)$/) != null;
};

const AppImage = ({
  resizeMode,
  style,
  defaultSource,
  source,
  sizeSpinner,
  noCache,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageSource, setImageSource] = useState(source);
  //local image
  if ((source && source.uri === undefined) || noCache) {
    return (
      <Image
        style={[
          {
            width: 86,
            height: 86,
          },
          style,
        ]}
        resizeMode={resizeMode}
        source={source}
      />
    );
  }
  const valid = source && source.uri && isValidUrl(source.uri);
  if (!valid) {
    return null;
  }

  //make loading animation while loading image
  if (loading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FastImage
          style={[{width: 86, height: 86}, style]}
          source={imageSource}
          resizeMode={getResizeMode(resizeMode)}
          onLoadEnd={() => {
            setLoading(false);
          }}
          onError={e => {
            console.log('onError', e);
            setImageSource(defaultSource);
            setLoading(false);
          }}
        />
        <Loading
          sizeSpinner={sizeSpinner}
          style={[
            {
              width: 86,
              height: 86,
              position: 'absolute',
            },
            style,
          ]}
        />
      </View>
    );
  }
  //render image after loading image
  return (
    <FastImage
      style={[{width: 86, height: 86}, style]}
      source={imageSource}
      resizeMode={getResizeMode(resizeMode)}
    />
  );
};

export {AppImage};
