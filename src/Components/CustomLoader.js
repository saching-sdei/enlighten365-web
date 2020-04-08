/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from 'react';
import { View, Dimensions } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import COLORS from '../Constants/Colors';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

CustomLoader = ({ isLoading }) => {
  if (isLoading) {
    return (
      <View
        style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT,
        }}>
        <UIActivityIndicator color={COLORS.gray} count={10} />
      </View>
    );
  } else {
    return null;
  }
};

const styles = {
  textInputBoxStyle: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 3,
    borderWidth: 1.1,
    borderRadius: 5,
    fontSize: 14,
    paddingLeft: 5,
    marginTop: 10,
    // borderColor:COLORS.BORDER_COLOR,
    backgroundColor: COLORS.WHITE_COLOR,
  },
};

export default CustomLoader;
