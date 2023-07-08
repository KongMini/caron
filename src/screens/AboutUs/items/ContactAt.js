//import liraries
import React from 'react';
import {AppText} from '../../../elements';
import {ComonStyle, Sizes, useAppLanguage, useAppTheme} from '../../../utils';

const ContactAt = () => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();

  return (
    <AppText
      style={[
        ComonStyle.bold,
        {
          fontSize: Sizes.h3,
          padding: Sizes.padding,
        },
      ]}>
      {Strings.Contact_at('fresco.company.work@gmail.com')}
    </AppText>
  );
};

export {ContactAt};
