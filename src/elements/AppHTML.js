import React from 'react';
import HTML from 'react-native-render-html';
import {isIOS, ModeService, Sizes, useAppTheme} from '../utils';
import {Linking, View, useWindowDimensions} from 'react-native';
import {AppImage} from './AppImage';
import {AppText} from './AppText';

const AppHTML = props => {
  const {Colors, code} = useAppTheme();
  const {source, style, whiteSpace} = props;
  const contentWidth = useWindowDimensions().width;
  const computeEmbeddedMaxWidth = availableWidth => {
    return Math.min(availableWidth, Sizes.width(81));
  };
  if (source && source.html) {
    const isDarkMode = code === 'dark';
    return (
      <HTML
        containerStyle={{flex: 1, width: '100%', ...style}}
        ignoredStyles={['height', 'display', 'width']}
        contentWidth={contentWidth}
        computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
        allowWhitespaceNodes={whiteSpace}
        baseStyle={
          isDarkMode
            ? {
                color: Colors.text,
              }
            : {}
        }
        renderers={{
          span: (htmlAttribs, children, convertedCSSStyles) => {
            let styles = {};
            if (isDarkMode) {
              styles = {color: Colors.text};
            }
            return (
              <AppText style={{...convertedCSSStyles, ...styles}}>{htmlAttribs?.tnode?.init?.textNode?.data}</AppText>
            );
          }, 
        }}
        // renderers={{
        //   img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
        //     return (
        //       <AppImage
        //         key={`${Math.random()}`}
        //         source={{uri: htmlAttribs.src}}
        //         style={{
        //           ...convertedCSSStyles,
        //           marginBottom: Sizes.padding,
        //           minWidth: Sizes.width(50),
        //         }}
        //         resizeMode="cover"
        //       />
        //     );
        //   },
        // }}
        // onLinkPress={(evt, href) => {
        //   if (href.includes('http')) {
        //     Linking.openURL(href).catch(() => {});
        //   } else {
        //     let phoneNumber = href;
        //     if (isIOS) {
        //       phoneNumber = `telprompt:${href}`;
        //     } else {
        //       phoneNumber = `tel:${href}`;
        //     }
        //     Linking.canOpenURL(phoneNumber)
        //       .then(supported => {
        //         if (!supported) {
        //         } else {
        //           return Linking.openURL(phoneNumber);
        //         }
        //       })
        //       .catch(err => console.log(err));
        //   }
        // }}
        {...props}
      />
    );
  }
  return null;
};

export {AppHTML};
