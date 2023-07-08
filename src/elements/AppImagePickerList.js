import React, {useEffect, useState} from 'react';
import {Alert, Linking, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Controller} from 'react-hook-form';

import {
  AppPermission,
  FetchApi,
  IconTypes,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../utils';
import {AppIcon, Loading, TouchableCo, PickImageWithResize} from '../elements';

const ItemRender = ({array, data, index, onChangeImage, length}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const [image, setImage] = useState(data);
  const [loading, setLoading] = useState(false);

  const onChange = result => {
    let newArr = [...array];

    newArr[index] = result.uri;

    if (!newArr[index + 1] && newArr.length < length) {
      newArr[index + 1] = null;
    }
    onChangeImage(newArr);
    setImage(result.uri);
  };

  const onDelete = () => {
    const newArr = [...array];
    const lengthBeforeSplice = newArr.length;

    newArr.splice(index, 1);

    const indexOfNull = newArr.findIndex(itm => !itm);
    if (indexOfNull < 0) {
      newArr[lengthBeforeSplice - 1] = null;
    }
    onChangeImage(newArr);
  };

  const onPressChooseImage = () => {
    setLoading(true);
    PickImageWithResize.fromGallery(async result => {
      try {
        setLoading(false);
        if (result && result.err) {
          if (result.err === 'permission') {
            Alert.alert(
              Strings.Permission_not_granted,
              '',
              [
                {text: Strings.Cancel},
                {
                  text: Strings.Ok,
                  onPress: () => {
                    Linking.openSettings();
                  },
                },
              ],
              {cancelable: true},
            );
            return;
          }
          Alert.alert(result.err);
          return;
        }
        if (result && result.uri) {
          const resApi = await FetchApi.upFile(result.uri);
          if (resApi.success) {
            onChange({uri: resApi.data});
          }
        }
      } catch (error) {
        setLoading(false);
      }
    });
  };
  const renderImage = () => {
    if (loading) {
      return <Loading style={{marginTop: 0}} />;
    }
    if (image) {
      return (
        <View>
          <Image
            style={{
              width: Sizes.width(27.2),
              height: Sizes.width(27.2),
              borderRadius: 5,
            }}
            source={{uri: image}}
            resizeMode="stretch"
          />
          <AppIcon
            icon={'closecircleo'}
            type={IconTypes.AntDesign}
            color={Colors.love}
            size={Sizes.h1}
            hitSlop
            onPress={onDelete}
            styleTouch={{
              backgroundColor: 'white',
              borderRadius: 100,
              position: 'absolute',
              right: -Sizes.h1 / 2,
              top: -12,
            }}
          />
        </View>
      );
    }
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <AppIcon
          icon={'add'}
          type={IconTypes.MaterialIcons}
          color={Colors.greyLight}
          size={Sizes.h1 * 1.3}
        />
      </View>
    );
  };

  return (
    <TouchableCo
      onPress={onPressChooseImage}
      style={{
        marginRight: index !== length - 1 ? Sizes.h1 / 1.5 : 0,
        width: Sizes.width(27.2),
        height: Sizes.width(27.2),
        borderColor: Colors.greyLight,
        backgroundColor: Colors.surface,
        borderStyle: 'dashed',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
      }}>
      {renderImage()}
    </TouchableCo>
  );
};

const AppImagePickerList = ({
  control,
  defaultValue,
  name,
  rules,
  length,
  style,
}) => {
  const navigation = useNavigation();
  // const {errors} = useFormState({control, name});
  // const {Colors} = useAppTheme();
  // const {Strings} = useAppLanguage();

  useEffect(() => {
    // const checkPhotoPermission = async () => {
    //   await AppPermission.photo(() => {
    //     //onError callback
    //     navigation.goBack();
    //   });
    // };
    // checkPhotoPermission();
  }, []);

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({field: {onChange, value}}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: Sizes.padding / 2,
              ...style,
            }}>
            {(Array.isArray(value) ? value : [...Array(1)]).map(
              (item, index) => (
                <ItemRender
                  key={`${index}-${item}`}
                  index={index}
                  data={item}
                  array={value || defaultValue || []}
                  onChangeImage={onChange}
                  length={length}
                />
              ),
            )}
          </View>
        );
      }}
    />
  );
};

export {AppImagePickerList};
