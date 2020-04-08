/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  ImageBackground,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Strings, APIUrls } from '../../Constants';
import { getItem } from '../../Utils/AsyncUtils';
import { CommonActions } from '@react-navigation/native';
import { CustomLoader } from '../../Components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from '@react-navigation/compat';
import { getRecommededCal } from '../../Actions/ActionCreators';

class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: '',
    };
  }
  componentDidMount() {

    getItem(Strings.KEY_USER_DATA)
      .then(value => {
        if (value) {
          // this.props.getRecommededCal(value._id);
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'MyTab',

                },
              ],
            }),
          );
        } else {
          setTimeout(() => {
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'WelcomeScreen',
                  },
                ],
              }),
            );
          }, 2000);
        }
      })
      .catch(error => {
        // alert(JSON.stringify(error));
      });
  }

  render() {
    return (
      <View>
        <ImageBackground
          source={require('../../Assets/mainbg.jpg')}
          style={{
            width: wp(100),
            height: hp(100),
            alignItems: 'center',
            justifyContent: 'center',
          }} >
          <CustomLoader isLoading={this.state.isLoading} />
        </ImageBackground>
      </View>

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
      getRecommededCal,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(SplashScreen));