import {StyleSheet} from 'react-native';

const ComonStyle = {
  shadow: {
    shadowOffset: {width: 0, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: 'white',
  },
  bold: {
    fontWeight: 'bold',
  },
  borderBottom: color => ({
    borderColor: color,
    borderBottomWidth: StyleSheet.hairlineWidth,
  }),
  border: color => ({
    borderColor: color,
    borderWidth: StyleSheet.hairlineWidth,
  }),
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};
export {ComonStyle};
