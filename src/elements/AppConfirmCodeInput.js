import React, {useState, useRef, useLayoutEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const AppConfirmCodeInput = props => {
  const {
    codeLength,
    textInputStyle,
    wrapperStyle,
    autoFocus,
    codeInputLength,
    onChange,
    secureTextEntry,
    onDone,
    defaultValue,
    setAccessoryVisible,
    setShowButton,
  } = props;

  const [codeArr, setCodeArr] = useState(new Array(codeLength).fill(''));
  const [isFocused, setIsFocused] = useState(false);
  const currentIndex = useRef(0);
  const codeInputRefs = useRef([]);
  const timeout = useRef();

  useLayoutEffect(() => {
    if (defaultValue && codeLength && codeInputLength) {
      let newArr = [];
      for (let i = 0; i < codeLength; i++) {
        newArr[i] = defaultValue.substring(
          codeInputLength * i,
          codeInputLength * (i + 1),
        );
      }
      setCodeArr(newArr);
    }
    return () => timeout.current && clearTimeout(timeout.current);
  }, [defaultValue]);

  const setFocus = index => {
    codeInputRefs.current[index].focus();
  };

  const blur = index => {
    codeInputRefs.current[index].blur();
  };

  const onInputCode = (text, index) => {
    currentIndex.current = index;
    let newCodeArr = [...codeArr];
    newCodeArr[index] = text;
    onChange && onChange(newCodeArr.join(''));

    if (codeArr[index].length === 1 && text.length === 0 && index > 0) {
      setFocus(index - 1);
    }
    if (index == codeLength - 1) {
      if (newCodeArr[index].length === codeInputLength) {
        blur(index);
        onDone && onDone();
      }
    } else {
      if (newCodeArr[index].length < codeInputLength) {
        setCodeArr(newCodeArr);
      } else {
        setFocus(index + 1);
      }
    }
    setCodeArr(newCodeArr);
  };

  const renderItem = () => {
    let codeInputs = [];
    for (let i = 0; i < codeLength; i++) {
      codeInputs.push(
        <TextInput
          {...props}
          key={`${i}`}
          ref={ref => (codeInputRefs.current[i] = ref)}
          style={{
            // flex: 1,
            textAlign: 'center',
            padding: 8,
            width: 34,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'black',
            marginHorizontal: 6,
            // color: isFocused === i ? '#00A2AB' : 'black',
            ...textInputStyle,
          }}
          selectionColor={'#00A2AB'}
          onFocus={() => {
            setAccessoryVisible && setAccessoryVisible(false);
            setShowButton && setShowButton(false);
            if (timeout.current) {
              clearTimeout(timeout.current);
            }
            timeout.current = setTimeout(() => {
              setIsFocused(i);
            }, 300);
          }}
          onBlur={() => {
            setAccessoryVisible && setAccessoryVisible(true);
            setShowButton && setShowButton(true);
            setIsFocused(-1);
          }}
          secureTextEntry={secureTextEntry}
          underlineColorAndroid="transparent"
          returnKeyType={'done'}
          autoFocus={autoFocus && i == 0}
          onChangeText={text => onInputCode(text, i)}
          maxLength={codeInputLength}
          keyboardType={'numeric'}
          defaultValue={
            codeArr?.[i]
            // defaultValue?.substring(
            //   codeInputLength * i,
            //   codeInputLength * (i + 1),
            // )
          }
        />,
      );
    }
    return codeInputs;
  };

  console.log('fefe', codeArr);

  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        ...wrapperStyle,
      }}>
      {renderItem()}
    </View>
  );
};

export {AppConfirmCodeInput};
