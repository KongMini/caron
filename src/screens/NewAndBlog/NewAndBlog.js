import React from 'react';
import {useForm} from 'react-hook-form';

import {AppContainer, AppHeader} from '../../elements';
import {Convert, useAppLanguage} from '../../utils';
import List from './items/List';

function NewAndBlog({navigation}) {
  const {Strings} = useAppLanguage();
  const {control} = useForm();

  const DataRendering = [
    {
      component: AppHeader,
      config: {
        isChild: true,
        leftGoBack: true,
        title: Strings.News_and_blog.toUpperCase(),
      },
    },
    {
      component: List,
      config: {navigation: navigation},
    },
  ];

  return (
    <AppContainer style={{marginBottom: 0}}>
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
}

export default NewAndBlog;
