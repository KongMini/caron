import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {FetchApi} from '.';

const PickImageWithResize = {
  fromGallery: callback => {
    const options = {
      title: 'Caron',
      storageOptions: {
        skipBackup: true,
        path: 'Caron',
      },
      rotation: 360,
      noData: true,
      mediaType: 'photo',
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        callback(null);
        return;
      } else if (response.errorCode) {
        callback(null);
        Alert.alert(response.errorMessage);
        return;
      } else if (response?.assets && response?.assets[0]?.uri) {
        let originalRotation = 0;
        try {
          const resultImg = await ImageResizer.createResizedImage(
            response.assets[0].uri,
            700,
            700,
            'JPEG',
            100,
            originalRotation,
          );
          // const resultUpload = await FetchApi.uploadImage({uri: resultImg});
          return callback({
            uri: resultImg.uri,
          });
        } catch (error) {
          callback({error});
        }
      }
    });
  },
};

export {PickImageWithResize};
