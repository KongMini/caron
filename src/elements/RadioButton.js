import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Sizes} from '../utils';

const RadioButton = (props) => {
  const [value, setValue] = useState(1);
  return (
    <View style={{flexDirection: 'row'}}>
      {props.data.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.container}
            onPress={() => {
              setValue(item.id);
              props.onChangeData && props.onChangeData(item);
            }}>
            <View style={styles.radioCircle}>
              {value === item.id && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioText}>{item.gender}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioText: {
    marginRight: 35,
    fontSize: Sizes.h5,
    color: '#000',
  },
  radioCircle: {
    height: 26,
    width: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#C5C5C5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedRb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#06B700',
  },
  result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
  },
});

export {RadioButton};
