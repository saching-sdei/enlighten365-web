/**
 * @format
 */
import 'react-native-gesture-handler';
/**
 * @format
 */

/* eslint-disable no-undef */
import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import configureStore from './src/Store/configureStore';
import KeyboardManager from 'react-native-keyboard-manager';
import Colors from './src/Constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

const store = configureStore();
console.disableYellowBox = true;

const theme = {
  ...DefaultTheme,
  roundness: hp(2),
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.black,
    accent: Colors.BACKGROUND_COLOR,
    background: Colors.WHITE_COLOR,
    surface: Colors.WHITE_COLOR,
    text: Colors.TEXT_COLOR,
    disabled: Colors.blue_grey_400,
    placeholder: Colors.grey_500,
  },
};

if (Platform.OS === 'ios') {
  KeyboardManager.setToolbarPreviousNextButtonEnable(true);
}

const ReduxApp = () => (
  <PaperProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </PaperProvider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
