import React from 'react';
import {AppContainer} from '../../elements';
import {useAppLanguage, Convert} from '../../utils';
import {LanguageList} from './items';

const LanguageSetting = () => {
  const {Strings} = useAppLanguage();

  const DataRendering = [
    // {
    //   component: AppHeader,
    //   config: {
    //     leftGoBack: true,
    //     title: Strings.Language,
    //   },
    // },
    {
      component: LanguageList,
    },
  ];

  return (
    <AppContainer>
      {DataRendering.map((item, index) => {
        const Component = item.component;
        const children = Convert.dataRenderingChildren({item});
        return (
          <Component key={`${index}`} {...item.config}>
            {children}
          </Component>
        );
      })}
    </AppContainer>
  );
};
export default LanguageSetting;
