/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */

import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Strings, Colors } from '../../Constants';

Header = ({
  middleComponent,
  textStyle,
  leftComponent,
  rightComponent,
  height,
  isCover,
  coverImage,
  onPress,
}) => {
  const StatusBarHeight = StatusBar.currentHeight;
  const headerHeight = height == '' || height == null ? hp(6) : height;
  return (
    <View
      style={{
        borderBottomLeftRadius: 50,
        backgroundColor: 'transparent',
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.PRIMARY_COLOR,
          height: headerHeight,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            height: hp(4),
            flex: 0.15,
          }}>
          {/* <Text style={{color: Colors.blue_800, fontSize: hp(2)}}>
            {Strings.BACK}
          </Text> */}
          {leftComponent}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            flex: 0.8,
          }}>
          {/* {middleComponent} */}
          <Text
            style={{
              color: Colors.WHITE_COLOR,
              fontSize: hp(2),
              fontWeight: 'bold',
            }}>
            {middleComponent}
          </Text>
        </View>
        <View
          style={{
            flex: 0.1,
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: height == '' || height == null ? 'center' : 'flex-start',
            alignItems: 'flex-end',
          }}>
          {rightComponent}
        </View>
      </View>
      <View
        style={{
          width: wp(100),
          height: hp(6),
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        {/* <Image
          style={{ alignSelf: 'center' }}
          resizeMode="contain"
          source={require('../../Assets/toptip.png')}
        /> */}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2980b9',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default Header;
