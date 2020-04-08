import React, {Component} from 'react';

import {View, Platform, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../Constants/Colors';
import CustomTextInputStyle from './CustomTextInputStyle';

export default class CustomTextInput extends Component {
  static propTypes = {
    containerStyle: PropTypes.style,
    style: PropTypes.style,

    autoFocus: PropTypes.bool,
    editbale: PropTypes.bool,
    textColor: PropTypes.string,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.bool,
  };

  render() {
    return (
      <TextInput
        textColor={[Colors.black, this.props.textColor]}
        style={[CustomTextInputStyle.textInput, this.props.style]}
        autoCapitalize={false}
        editable={this.props.editable}
        value={this.props.value}
        underlineColorAndroid="transparent"
        onChangeText={this.props.onChangeText}
        placeholder={this.props.placeHolder}
        placeholderTextColor={Colors.grey_600}
        autoFocus={this.props.autoFocus}
        secureTextEntry={this.props.secureTextEntry}
      />
    );
  }
}
