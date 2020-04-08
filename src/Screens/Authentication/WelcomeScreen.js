/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import { Text, View, SafeAreaView, ImageBackground ,Button} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { withNavigation } from '@react-navigation/compat';
//import { Button } from 'react-native-elements';
//import { Header, CustomLoader } from '../../Components';
import { Strings, Colors } from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AuthStyle from './AuthStyle';
import { validateEmail, validateIsEmpty } from '../../Utils/Validations';
//import { CommonSnackbar } from '../../Components/CommonSnackbar';
import { loginUser, clearAuthReducer } from '../../Actions/ActionCreators';
//import { getItem, storeItem } from '../../Utils/AsyncUtils';

class WelcomeScreen extends Component {
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
      console.log('GETDERIVED STATE Auth --', nextProps.AuthReducer.signInRes);
      console.log('GETDERIVED STATE state --', prevState.signInRes);

      return {
        signInRes: nextProps.AuthReducer.signInRes,
        isLoading: false,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.AuthReducer.signInRes !== prevProps.AuthReducer.signInRes) {
      if (
        this.props.AuthReducer.statusCodeSigIn == Strings.HTTP_STATUS_CODE_OK
      ) {
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
    // storeItem(Strings.KEY_USER_DATA, this.state.signInRes)
    //   .then(value => {
    //     //this callback is executed when your Promise is resolved
    //     this.props.navigation.navigate('MyTab');
    //   })
    //   .catch(error => {
    //     //this callback is executed when your Promise is rejected
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
    if (validateIsEmpty(this.state.userName)) {
      this.showSnackbar('Please enter your name');
    } else if (validateIsEmpty(this.state.userEmail)) {
      this.showSnackbar('Please enter email address');
    } else if (!validateEmail(this.state.userEmail)) {
      this.showSnackbar('Please enter valid email address');
    } else if (validateIsEmpty(this.state.passsword)) {
      this.showSnackbar('Please enter password');
    } else {
      //this.props.navigation.navigate('MyTab');
      this.setState({
        isSnackbarVisible: false,
        snackMessage: '',
        isLoading: true,
      });
      let postData = {
        email: this.state.userEmail,
        password: this.state.passsword,
        device_token: '',
        device_type: '',
        device_id: '',
      };

      this.props.loginUser(postData);
    }
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}
          forceInset={{ top: 'never' }}>
          {/* <Header middleComponent={Strings.LOGIN} /> */}
          <ImageBackground
            source={require('../../Assets/splash.png')}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 50 }}>
            <View>
              <Button
                buttonStyle={{
                  borderColor: Colors.PRIMARY_COLOR,
                  borderWidth: 2,
                  borderRadius: 30,
                  backgroundColor: Colors.PRIMARY_COLOR,
                  height: hp(6),
                  margin: 10
                }}
                containerStyle={{ marginLeft: 5 }}
                titleStyle={{ color: Colors.white, fontStyle: 'normal', fontWeight: '400' }}
                title={Strings.SIGN_UP}
                onPress={() => this.props.navigation.navigate('SignUpScreen')}
              />
              <Text
                style={{
                  color: '#FFF', margin: 10, fontSize: 16, fontWeight: '400'
                }}>
                Got a Enlighten 365 account?
                </Text>
              <Button
                buttonStyle={{
                  borderColor: Colors.WHITE_COLOR,
                  borderWidth: 2,
                  borderRadius: 30,
                  backgroundColor: Colors.WHITE_COLOR,
                  height: hp(6),
                  margin: 10
                }}
                containerStyle={{ marginLeft: 5 }}
                titleStyle={{ color: Colors.black, fontStyle: 'normal' }}
                title={Strings.LOGIN}
                onPress={() => this.props.navigation.navigate('LoginScreen')}
              />
            </View>
          </ImageBackground>
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
)(WelcomeScreen);
