import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import Colors from '../Constants/Colors';

export const CommonSnackbar = ({ visible, message }) => {
  return (
    <View>
      <Snackbar
        visible={visible}
        onDismiss={() => (visible = false)}
        duration={2000}>
        {message}
        {/* theme={Colors.SECONDARY_COLOR} */}
      </Snackbar>
    </View>
  );
};
{
  /* <svg width="375" height="663" viewBox="0 0 375 663" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="375" height="663" fill="#F3F3F3"/> </svg> */
}
