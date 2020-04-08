/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { View, Dimensions, Text, TouchableOpacity } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../../Constants/Colors";
const { height, width } = Dimensions.get('window');
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default TextInputComponent = (props) => {
  return (

    <View style={[{
      borderWidth: 1, borderColor: COLORS.colorPrimaryDark,
      flexDirection: 'row', margin: 5, alignItems: 'center',
      paddingRight: 20, paddingTop: 10, paddingBottom: 10, paddingLeft: 10,
    }, { flex: props.flexValue, justifyContent: props.justifyContent }]}>
      <Text style={{ fontSize: 16, color: COLORS.text_gray }}>{props.headingText}</Text>

      <TouchableOpacity onPress={() => props.onClick}>
        <Text
          style={{ fontSize: 14, color: COLORS.text_gray }}
        >{props.valueText}</Text>
      </TouchableOpacity>

      {/* } */}
      <MaterialIcons name={props.iconName} color={Colors.text_gray} size={24} />
    </View>
  );
}