import React from 'react';
import {AppRegistry,View,Text} from 'react-native';
import Name from './src/Name'
import WelcomeScreen from './src/Screens/Authentication/WelcomeScreen'


const App=()=>{
    return <WelcomeScreen />
}


AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("react-root"),
});
