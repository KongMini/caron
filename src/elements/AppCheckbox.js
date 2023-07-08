import React from 'react';
import {Controller} from 'react-hook-form';

import {AppIcon} from '.';
import {Sizes} from '../utils';

const AppCheckbox = ({
  control,
  defaultValue,
  name,
  rules,
  activeColor,
  inactiveColor,
  icon,
  iconInactive,
  type,
  onChangeData,
  style,
}) => {
  const [isChecked, setIsChecked] = React.useState(defaultValue);

  return (
    <Controller
      defaultValue={isChecked}
      name={name}
      control={control}
      rules={rules}
      render={({field: {onChange, value}}) => (
        <AppIcon
          icon={value ? icon || 'checkmark-circle' : iconInactive || icon}
          type={type || 'Ionicons'}
          style={{
            width: Sizes.width(10),
            textAlign: 'center',
            color: value ? activeColor || 'green' : inactiveColor || '#c1c1c1',
            fontSize: Sizes.h1,
            ...style,
          }}
          hitSlop
          onPress={() => {
            onChangeData && onChangeData(!isChecked);
            setIsChecked(!isChecked);
            onChange(!isChecked);
          }}
        />
      )}
    />
  );
};

const AppCheckboxWithoutController = ({
  defaultValue,
  activeColor,
  inactiveColor,
  icon,
  iconInactive,
  type,
  onChangeData,
  style,
  id,
  hitSlop = {},
}) => {
  const [isChecked, setIsChecked] = React.useState(defaultValue);

  return (
    <AppIcon
      icon={isChecked ? icon || 'checkmark-circle' : iconInactive || icon}
      type={type || 'Ionicons'}
      style={{
        width: Sizes.width(10),
        textAlign: 'center',
        color: isChecked ? activeColor || 'green' : inactiveColor || '#c1c1c1',
        fontSize: Sizes.h1,
        ...style,
      }}
      hitSlop={hitSlop}
      onPress={() => {
        onChangeData && onChangeData(!isChecked, id);
        setIsChecked(!isChecked);
      }}
    />
  );
};

export {AppCheckbox, AppCheckboxWithoutController};
