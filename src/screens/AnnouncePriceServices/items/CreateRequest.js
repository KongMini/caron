import dayjs from 'dayjs';
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';

import {
  AppButton,
  AppDropdown,
  AppImagePickerList,
  AppInput,
  AppText,
} from '../../../elements';
import {useGetMyCar} from '../../../hooks';
import {
  FetchApi,
  ModalBase,
  Sizes,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

const CreateRequest = ({
  setScreen,
  handleSubmit,
  control,
  setValue,
  getValues,
  reset,
  refetch,
}) => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {myCar} = useGetMyCar();
  const [submiting, setSubmiting] = useState(false);

  const FIELD = [
    {
      type: 'DROPDOWN',
      name: 'id_xe',
      label: Strings.Choose_car,
      required: {
        required: {value: true, message: Strings.This_field_is_required},
      },
      dataDropDown: myCar?._data || [],
      keyValueDropdown: 'name',
      keyResult: 'id',
    },
    {
      type: 'TEXT_AREA',
      name: 'content',
      label: Strings.Content_request_announce_price,
    },
    {
      type: 'IMAGE_PICKER',
      name: 'image',
      label: Strings.Image,
      inputSize: '100%',
    },
  ];

  const onSubmit = async e => {
    const biensoxe = (myCar?._data || []).find(
      itm => itm.id == e.id_xe,
    )?.license_plates;
    const item = {
      content: e.content,
      image: e.image,
      id_xe: e.id_xe,
      biensoxe: biensoxe,
    };
    setSubmiting(true);
    const result = await FetchApi.createBaoGia(item);
    setSubmiting(false);
    if (result._msg_code === 1) {
      refetch();
      ModalBase.success('Thêm mới báo giá thành công');
      setScreen('Request_announce_service');
    } else {
      ModalBase.error({
        message: 'Có lỗi xảy ra vui lòng thực hiện lại hoặc liên lạc với CarOn',
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{padding: Sizes.padding, paddingBottom: 100}}>
      {FIELD.map(item => {
        return (
          <View
            key={`${item.name}`}
            style={{
              justifyContent: 'center',
              marginBottom: Sizes.padding,
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <AppText style={{marginBottom: 6, color: Colors.greyBold}}>
                  {item.label}
                  {!!item.required && ' *'}
                </AppText>
              </View>

              {item.type === 'TEXT_AREA' && (
                <AppInput
                  containerStyle={{paddingHorizontal: 0, width: '100%'}}
                  control={control}
                  name={item.name}
                  rules={item.required}
                  multiline={true}
                  style={{
                    paddingTop: 4,
                    alignItems: 'flex-start',
                    borderRadius: Sizes.border_radius,
                    borderColor: Colors.greyLight,
                    height: 140,
                  }}
                />
              )}
              {item.type === 'DROPDOWN' && (
                <AppDropdown
                  control={control}
                  name={item.name}
                  rules={item.required}
                  dataDropDown={item.dataDropDown}
                  defaultValue={item.data || ''}
                  styleInput={{
                    borderWidth: Sizes.border,
                    borderColor: Colors.greyLight,
                    height: 40,
                    marginTop: 0,
                    backgroundColor: 'white',
                  }}
                  itemTextStyle={{fontSize: Sizes.h5}}
                  styleValue={{fontSize: Sizes.h5}}
                  styleItemContainer={{
                    width: Sizes.width(100) - Sizes.padding * 2 - 1,
                  }}
                  keyValueDropdown={item.keyValueDropdown}
                  keyResult={item.keyResult}
                />
              )}
              {item.type === 'IMAGE_PICKER' && (
                <AppImagePickerList
                  control={control}
                  name={item.name}
                  defaultValue={item.data || ['']}
                  length={3}
                  style={{paddingHorizontal: 0}}
                />
              )}
            </View>
          </View>
        );
      })}
      <AppButton
        title={Strings.Send_request_announce_price}
        type="primary"
        disabled={submiting}
        style={{
          marginTop: 10,
          paddingVertical: 4,
          paddingHorizontal: 10,
          alignSelf: 'center',
          marginHorizontal: 0,
          marginRight: Sizes.width(2),
        }}
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
};

export default CreateRequest;
