//import liraries
import React from 'react';
import {AppText} from '../../../elements';
import {Sizes, useAppLanguage, useAppTheme} from '../../../utils';

const Description = () => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();

  return (
    <AppText
      style={{
        fontSize: Sizes.h3,
        paddingHorizontal: Sizes.padding,
      }}>
      {Strings.About_us_description}
    </AppText>
  );
};

export {Description};
