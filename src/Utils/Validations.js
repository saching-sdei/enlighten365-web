import * as React from 'react';
import {View, StyleSheet} from 'react-native';
// import { AsyncStorage,Alert} from "react-native";
import {Snackbar} from 'react-native-paper';
import {Colors} from '../Constants';

const isSnackBarVisible = false;

export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/;

  return re.test(password);
}
export function validateIsEmpty(text) {
  var result = false;
  if (text == '' || text == undefined) {
    result = true;
  }
  return result;
}
export function validateName(text) {
  var re = /^[a-zA-Z ]*$/;
  return re.test(text);
}
export function validateAboutMe(text) {
  var re = /^[a-zA-Z _ '.,-]{0,500}$/;
  return re.test(text);
}

export function validateNumber(text) {
  var re = /^[0-9]*$/;
  return re.test(text);
}

export function validateMaxAndMinLength(text) {
  var re = /^[a-zA-Z0-9]{4,10}$/;
  return re.test(text);
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function commafy(num) {
  var str = num.toString().split('.');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

export function showErrorSnackBar(text) {
  return (
    <View style={styles.container}>
      <Snackbar
        style={{backgroundColor: Colors.PRIMARY_COLOR}}
        duration={3000}
        visible={true}>
        {text}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
