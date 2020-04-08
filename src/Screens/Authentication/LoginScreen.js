/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment, useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Alert, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from '@react-navigation/compat';
import { Button, Card, Image } from 'react-native-elements';
import { TextInput, Header, CustomLoader, TextInputComponent } from '../../Components';
import { Strings, Colors } from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AuthStyle from './AuthStyle';
import { validateEmail, validateIsEmpty } from '../../Utils/Validations';
import { CommonSnackbar } from '../../Components/CommonSnackbar';
import { loginUser, clearAuthReducer } from '../../Actions/ActionCreators';
import { getItem, storeItem } from '../../Utils/AsyncUtils';
import Icon from 'react-native-vector-icons/Ionicons';
import IconZocial from 'react-native-vector-icons/Zocial';
import IconFontAwsome from 'react-native-vector-icons/FontAwesome';

import { LoginButton, AccessToken, ShareDialog, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';

import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';

const SHARE_LINK_CONTENT = {
  contentType: 'link',
  contentUrl: 'https://www.facebook.com/',
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      passsword: '',
      isSnackbarVisible: false,
      snackMessage: '',
      signInRes: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.AuthReducer.signInRes !== prevState.signInRes) {
      console.log('LOGIN GETDERIVED STATE Auth --', nextProps.AuthReducer.signInRes);
      console.log('LOGIN GETDERIVED STATE state --', prevState.signInRes);

      return {
        signInRes: nextProps.AuthReducer.signInRes,
        isLoading: false,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '1048240127393-tf665np7qadcjo6ddpoksdcl93udlv9c.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      loginHint: '',
      forceConsentPrompt: true,
      accountName: '',
      iosClientId: '1048240127393-pih12mkn8t4eepd6os0tr03h8ggj4hhj.apps.googleusercontent.com',
    });
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo >>>', userInfo);
      this.setState({ userInfo: userInfo, loggedIn: true });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.AuthReducer.signInRes !== prevProps.AuthReducer.signInRes) {
      if (this.props.AuthReducer.statusCodeSigIn === Strings.HTTP_STATUS_CODE_OK) {
        this.clearState();
      }
      this.props.clearAuthReducer();
      // console.log(
      //   'Register res in state =====> ',
      //   JSON.stringify(this.state.registerRes),
      // );
      // console.log(
      //   'Register res in reducer =====> ',
      //   JSON.stringify(this.props.AuthReducer),
      // );
    }
  }

  clearState() {
    this.setState({
      userName: '',
      userEmail: '',
      passsword: '',
      isSnackbarVisible: false,
      snackMessage: '',
      signInRes: '',
    });

    console.log('USer Data ', this.state.signInRes);
    AsyncStorage.setItem(Strings.KEY_USER_DATA, JSON.stringify(this.state.signInRes));
    this.props.navigation.navigate('MyTab');
    // storeItem(Strings.KEY_USER_DATA, this.state.signInRes)
    //   .then(value => {
    //     //this callback is executed when your Promise is resolved
    //     this.props.navigation.navigate('MyTab');
    //   })
    //   .catch(error => {
    //     //this callback is executed when your Promise is rejected
    //     //JSON.stringify(error)
    //     alert(JSON.stringify(error));
    //   });
  }

  showSnackbar(message) {
    this.setState({
      isSnackbarVisible: true,
      snackMessage: message,
    });

    setTimeout(() => {
      this.setState({
        isSnackbarVisible: false,
        snackMessage: '',
      });
    }, 2000);
  }

  _verifyData() {
    if (validateIsEmpty(this.state.userEmail)) {
      this.showSnackbar('Please enter email address');
    } else if (!validateEmail(this.state.userEmail)) {
      this.showSnackbar('Please enter valid email address');
    } else if (validateIsEmpty(this.state.passsword)) {
      this.showSnackbar('Please enter password');
    } else {
      // this.props.navigation.navigate('MyTab');
      this.setState({
        isSnackbarVisible: false,
        snackMessage: '',
        isLoading: true,
      });
      let postData = {
        email: this.state.userEmail,
        password: this.state.passsword,
      };
      this.props.loginUser(postData);
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
            result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken.toString());
            console.log('result-->', result);
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: Colors.PRIMARY_COLOR }}
          forceInset={{ top: 'never' }}
        />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}
          forceInset={{ top: 'never' }}>
          <Header
            leftComponent={
              <TouchableOpacity onPress={() => this.goBack()}>
                <Icon name="ios-arrow-back" size={24} color={Colors.WHITE_COLOR} />
              </TouchableOpacity>
            }
            middleComponent={Strings.LOGIN} />

          <View style={{ alignItems: 'center' }}>
            <Text style={{
              alignSelf: 'center', textAlign: 'center', fontSize: 16, color: Colors.black,
              fontWeight: '400'
            }}>Welcome back! {'\n'} It's good to see you again.</Text>
          </View>

          <View style={{ marginTop: 10 }}>

            {/* <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this._signIn}
              disabled={this.state.isSigninInProgress} /> */}

            <Button
              icon={
                <IconFontAwsome
                  name="google"
                  size={18}
                  color={Colors.red_600}
                  style={{ paddingRight: 10, paddingTop: 2, alignItems: 'center' }}
                />
              }
              containerStyle={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}
              buttonStyle={{
                backgroundColor: Colors.WHITE_COLOR, justifyContent: 'flex-start',
                borderRadius: 20, paddingLeft: 20, borderColor: Colors.black, borderWidth: 1,
              }}
              titleStyle={{ color: Colors.TEXT_COLOR, fontSize: 14 }}
              title="LOGIN WITH GOOGLE"
              type="solid"
              onPress={() => this._signIn()}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <View>
              {/* <LoginButton
                publishPermissions={["publish_actions"]}
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      alert("login has error: " + result.error);
                      console.log("login has error: " + result.error);
                    } else if (result.isCancelled) {
                      alert("login is cancelled.");
                      console.log("login is cancelled. " + result);
                    } else {
                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          let accessToken = data.accessToken;
                          alert(accessToken.toString());
                          console.log('access token', accessToken.toString());

                          const responseInfoCallback = (error, result) => {
                            if (error) {
                              console.log(error)
                              alert('Error fetching data: ' + error.toString());
                              console.log('Error fetching data: ' + error.toString());
                            } else {
                              console.log(result)
                              alert('Success fetching data: ' + result.toString());
                              console.log('Success fetching data: ' + result.toString());
                            }
                          };

                          const infoRequest = new GraphRequest(
                            '/me',
                            {
                              accessToken: accessToken,
                              parameters: {
                                fields: {
                                  string: 'email,name,first_name,middle_name,last_name'
                                }
                              }
                            },
                            responseInfoCallback
                          );

                          // Start the graph request.
                          new GraphRequestManager().addRequest(infoRequest).start();

                        })
                    }
                  }
                }
                onLogoutFinished={() => alert("logout.")} /> */}

            </View>
            <Button
              icon={
                <IconFontAwsome
                  name="facebook-official"
                  size={18}
                  color="white"
                  style={{ paddingRight: 10, paddingTop: 2, alignItems: 'center' }}
                />
              }
              containerStyle={{ marginLeft: 20, marginRight: 20 }}
              buttonStyle={{
                backgroundColor: Colors.facebook, justifyContent: 'flex-start',
                borderRadius: 20, paddingLeft: 20,
              }}
              titleStyle={{ fontSize: 14 }}
              title="LOGIN WITH FACEBOOK"
              type="solid"
              onPress={() => this.loginWithFacebook()}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, alignItems: 'center' }}>
            <View style={{ height: hp(0.1), width: wp(40), backgroundColor: Colors.BACK_ARROW_COLOR, marginLeft: 25 }}></View>
            <Text style={{ fontSize: 14, color: Colors.TEXT_COLOR }}>OR</Text>
            <View style={{ height: hp(0.1), width: wp(40), backgroundColor: Colors.BACK_ARROW_COLOR, marginRight: 25 }}></View>
          </View>

          <View>
            <TextInputComponent
              label={"Enter Email"}
              onChangeText={userEmail => this.setState({ userEmail: userEmail })}
              textColor={Colors.TEXT_COLOR}
              baseColor={Colors.TEXT_COLOR}
              tintColor={Colors.TEXT_COLOR}
              containerStyle={{ marginLeft: 10, marginRight: 10 }}
              value={this.state.userEmail}
              autoCapitalize={false}
            />

            <TextInputComponent
              label={"Enter Password"}
              onChangeText={passsword => this.setState({ passsword: passsword })}
              textColor={Colors.TEXT_COLOR}
              baseColor={Colors.TEXT_COLOR}
              tintColor={Colors.TEXT_COLOR}
              containerStyle={{ marginLeft: 10, marginRight: 10 }}
              secureTextEntry={true}
              value={this.state.passsword}
            />

          </View>

          <View style={{ marginTop: hp(5), justifyContent: 'center' }}>
            <Button
              icon={
                <IconZocial
                  name="email"
                  size={18}
                  color="white"
                  style={{ paddingRight: 10, paddingTop: 2, alignItems: 'center' }}
                />
              }
              containerStyle={{ margin: 20 }}
              buttonStyle={{
                backgroundColor: Colors.PRIMARY_COLOR, justifyContent: 'flex-start',
                borderRadius: 20, paddingLeft: 20,
              }}
              titleStyle={{ fontSize: 14 }}
              title="LOGIN WITH EMAIL"
              type="solid"
              onPress={() => this._verifyData()}
            />

            {/* <Button
              buttonStyle={{
                borderColor: Colors.yellow_900,
                borderWidth: 2,
                backgroundColor: Colors.yellow_900,
                height: hp(6.5),
              }}
              containerStyle={{ marginLeft: 5, flex: 0.5 }}
              titleStyle={{ color: Colors.white, fontStyle: 'italic' }}
              title={Strings.LOGIN}
              onPress={() => this._verifyData()}
            /> */}
          </View>

          {<CustomLoader isLoading={this.state.isLoading} />}
          <CommonSnackbar
            visible={this.state.isSnackbarVisible}
            message={this.state.snackMessage}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    AuthReducer: state.AuthReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginUser,
      clearAuthReducer,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(LoginScreen));
