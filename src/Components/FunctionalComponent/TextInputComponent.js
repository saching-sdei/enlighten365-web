/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { View, Dimensions, Text } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../../Constants/Colors";
const { height, width } = Dimensions.get('window');

export default TextInputComponent = (props) => {
  return (
    <View style={{ marginLeft: 10, marginRight: 10 }}>
      <TextField
        labelTextStyle={props.labelTextStyle}
        label={props.label}
        textColor={props.textColor}
        baseColor={props.baseColor}
        tintColor={props.tintColor}
        fontSize={14}
        labelFontSize={14}
        autoCorrect={false}
        underlineColorAndroid="transparent"
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        maxLength={props.maxLength}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        onTouchStart={props.onTouchStart}
        editable={props.editable}
        returnKeyType={props.returnKeyType}
        onSubmitEditing={props.onSubmitEditing}
        blurOnSubmit={props.blurOnSubmit}
        containerStyle={props.containerStyle}
      />
      <View style={props.viewStyle}>
        <Text style={{ fontSize: 12, color: COLORS.PRIMARY_COLOR, fontWeight: '400' }}>{props.text}</Text>
      </View>

    </View>
  );
}