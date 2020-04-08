/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';

export default class LadderScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Ladder Screen</Text>
      </View>
    );
  }
}
