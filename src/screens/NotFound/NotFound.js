import React from 'react';
import {AppContainer, AppText} from '../../elements';

function NotFound() {
  return (
    <AppContainer
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AppText
        style={{paddingHorizontal: 40, textAlign: 'center', color: 'purple'}}>
        Tính năng này đang trong quá trình phát triển. Vui lòng thử lại sau.
      </AppText>
    </AppContainer>
  );
}

export default NotFound;
