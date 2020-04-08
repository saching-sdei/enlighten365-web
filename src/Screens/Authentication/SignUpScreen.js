/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from '@react-navigation/compat';
import { Button } from 'react-native-elements';
import { TextInput, Header, CustomLoader, TextInputComponent } from '../../Components';
import { Strings, Colors, APIUrls } from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AuthStyle from './AuthStyle';
import { validateEmail, validateIsEmpty } from '../../Utils/Validations';
import { CommonSnackbar } from '../../Components/CommonSnackbar';
import { registerUser, clearAuthReducer } from '../../Actions/ActionCreators';
import { getItem, storeItem } from '../../Utils/AsyncUtils';
import ViewPager from '@react-native-community/viewpager';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextField } from 'react-native-material-textfield';
// import { Slider } from 'react-native-slider';
import { Slider, CheckBox } from 'react-native-elements';

let yourGoalData = [{
  name: Strings.BE_HEALTHIER,
  detail: Strings.BE_HEALTHIER_DETAIL,
  id: 1,
}, {
  name: Strings.LOSE_WEIGHT,
  detail: Strings.LOSE_WEIGHT_DETAIL,
  id: 2,
}, {
  name: Strings.GAIN_WEIGHT,
  detail: Strings.GAIN_WEIGHT_DETAIL,
  id: 3,
},
];

let dietData = [{
  name: 'Vegan',
  id: 1,
}, {
  name: 'Vegetarian',
  id: 2,
}, {
  name: 'Keto Diet',
  id: 3,
}, {
  name: 'Low Crab',
  id: 4,
}, {
  name: 'Adkins',
  id: 5,
}, {
  name: 'Dash',
  id: 6,
}, {
  name: 'Mediterraneam Diet',
  id: 7,
}, {
  name: 'The Flexitarian Diet',
  id: 8,
}, {
  name: 'Weight Watchers Diet',
  id: 9,
}, {
  name: 'MIND Diet',
  id: 10,
}, {
  name: 'TLC Diet',
  id: 11,
}, {
  name: 'Volumetrics Diet',
  id: 12,
}, {
  name: 'Mayo Clinic Diet',
  id: 13,
}, {
  name: 'Ornish Diet',
  id: 14,
}, {
  name: 'The Fertility Diet',
  id: 15,
}, {
  name: 'Low Crab (General)',
  id: 16,
}, {
  name: 'No Specific Diet',
  id: 17,
},
];

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGoal: '',
      selectedGoalName: '',
      selectedDiet: '',
      selectedGender: '',
      yourAge: '',
      yourHeightFit: '',
      yourHeightInches: '',
      yourWeight: '',
      goalWeight: '',
      setYourGoal: '',
      weeks: 0,
      perWeekWt: 0.0,
      userName: '',
      userEmail: '',
      passsword: '',
      confirmPassword: '',
      isSnackbarVisible: false,
      snackMessage: '',
      signUpRes: '',
      active: 0,
      value: 0,
      sliedValue: 0,

      dietList: [],
      goalList: [],

      checked: false,
    };
    this.viewPager = React.createRef();
  }


  componentDidMount() {

    this.fetchAPICall(APIUrls.GET_GOAL, 1);
    this.fetchAPICall(APIUrls.GET_DIET, 2);
  }

  fetchAPICall(APIURL, apiCall) {

    this.setState({ isLoading: true });
    fetch(APIURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 2000,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('signup responseJson', responseJson)

        this.setState({ isLoading: false });
        if (responseJson.statusCode === Strings.HTTP_STATUS_CODE_OK) {
          if (apiCall === 1) {
            console.log('responseJson GOAL>>>', responseJson.Goals);
            this.setState({ goalList: responseJson.data.Goals });
          }
          if (apiCall === 2) {
            console.log('responseJson DIET>>>', responseJson.Goals);
            this.setState({ dietList: responseJson.data.Goals });
          }
        }
      })
      .catch(error => {
        console.log('signup error', error)
        this.setState({ isLoading: false });
      });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.AuthReducer.registerRes !== prevState.signInRes) {
      console.log('GETDERIVED STATE Auth --', nextProps.AuthReducer.registerRes);
      console.log('GETDERIVED STATE state --', prevState.registerRes);
      return {
        signInRes: nextProps.AuthReducer.registerRes,
        isLoading: false,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.AuthReducer.registerRes !== prevProps.AuthReducer.signInRes) {
      if (
        this.props.AuthReducer.statusCode === Strings.HTTP_STATUS_CODE_OK
      ) {
        // alert('')
        this.clearState();
      }
      this.props.clearAuthReducer();
    }
  }

  clearState() {
    this.setState({

      selectedGoal: '',
      selectedDiet: '',
      selectedGender: '',
      yourAge: '',
      yourHeightFit: '',
      yourHeightInches: '',
      yourWeight: '',
      goalWeight: '',
      setYourGoal: '',
      weeks: 0,
      perWeekWt: 0.0,
      userName: '',
      userEmail: '',
      passsword: '',
      confirmPassword: '',
      isSnackbarVisible: false,
      snackMessage: '',
      signUpRes: '',
      active: 0,
      value: 0,
      sliedValue: 0,

      dietList: [],
      goalList: [],
    });

    this.props.navigation.navigate('LoginScreen');
    // console.log('USer Data ', this.state.signInRes);
    // storeItem(Strings.KEY_USER_DATA, this.state.signInRes)
    //   .then(value => {
    //     //this callback is executed when your Promise is resolved

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

  _verifyDataFourthPage() {
    if (validateIsEmpty(this.state.yourAge)) {
      this.showSnackbar(Strings.EMPTY_ERROR_MESSAGE);
    } else if (validateIsEmpty(this.state.yourHeightFit)) {
      this.showSnackbar(Strings.EMPTY_ERROR_MESSAGE);
    } else if (validateIsEmpty(this.state.yourWeight)) {
      this.showSnackbar(Strings.EMPTY_ERROR_MESSAGE);
    } else if (validateIsEmpty(this.state.goalWeight)) {
      this.showSnackbar(Strings.EMPTY_ERROR_MESSAGE);
    } else {
      //this.props.navigation.navigate('MyTab');
      this.viewPager.current.setPage(4);
      this.setState({ active: this.state.active + 1 });
    }
  }

  _verifyDataFinalPage() {

    if (validateIsEmpty(this.state.userName)) {
      this.showSnackbar(Strings.EMPTY_USER_NAME);
    } else if (validateIsEmpty(this.state.userEmail)) {
      this.showSnackbar(Strings.EMPTY_USER_EMAIL);
    } else if (!validateEmail(this.state.userEmail)) {
      this.showSnackbar(Strings.EMPTY_USER_VALID_EMAIL);
    } else if (validateIsEmpty(this.state.passsword)) {
      this.showSnackbar(Strings.EMPTY_USER_PASSWORD);
    } else if (validateIsEmpty(this.state.confirmPassword)) {
      this.showSnackbar(Strings.EMPTY_CONFIRM_PASSWORD);
    } else if (this.state.confirmPassword !== this.state.passsword) {
      this.showSnackbar(Strings.PASSWORD_MISSMACH);
    } else if (!this.state.checked) {
      this.showSnackbar(Strings.ACCEPT_TERMS_CONDITION);
    } else {
      this.setState({
        isSnackbarVisible: false,
        snackMessage: '',
        // isLoading: true,
      });

      let postData = {
        firstname: this.state.userName,
        lastname: this.state.userName,
        age: this.state.yourAge,
        gender: this.state.selectedGender,
        height_inches: this.state.yourHeightInches,
        height_feet: this.state.yourHeightFit,
        weight: this.state.yourWeight,
        set_goal_weight: this.state.goalWeight,
        set_goal_weeks: this.state.weeks,
        email: this.state.userEmail,
        password: this.state.passsword,
        confirm_password: this.state.confirmPassword,
        goals: this.state.selectedGoal,
        diet: this.state.selectedDiet,
      };

      console.log('POST DATA REGISTER>>', JSON.stringify(postData));
      this.setState({ isLoading: true });
      this.props.registerUser(postData);
    }

  }

  goBack() {
    if (this.state.active > 0) {
      this.viewPager.current.setPage(this.state.active - 1);
      this.setState({ active: this.state.active - 1 });
    } else {
      this._clearState();
      this.props.navigation.goBack();
    }
  }

  goToNext(goalId, goalName) {
    this.viewPager.current.setPage(1);
    this.setState({ active: this.state.active + 1, selectedGoal: goalId, selectedGoalName: goalName });
  }

  goToThirdPage(diet) {
    this.viewPager.current.setPage(2);
    this.setState({ active: this.state.active + 1, selectedDiet: diet });
  }

  goToSignup(gender) {
    this.viewPager.current.setPage(3);
    this.setState({ active: this.state.active + 1, selectedGender: gender });
  }
  // goToFinalPage() {
  //   this.viewPager.current.setPage(4);
  //   this.setState({ active: this.state.active + 1 });
  // }

  _clearState() {
    this.setState({
      userName: '',
      userEmail: '',
      passsword: '',
      isSnackbarVisible: false,
      snackMessage: '',
      signInRes: '',
    });
  }

  yourGoalUI = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => this.goToNext(item._id, item.name)}
        style={{
          backgroundColor: Colors.WHITE_COLOR, padding: 10, borderWidth: 1, borderColor: Colors.teal_300,
          borderRadius: 10, margin: 5, alignItems: 'center', marginLeft: 30, marginRight: 30,
        }}>
        <Text style={{ alignSelf: 'center', color: Colors.PRIMARY_COLOR, fontWeight: '500' }}>{item.name}</Text>
        <Text style={{ alignSelf: 'center', color: Colors.TEXT_COLOR, fontWeight: '500', marginTop: 10 }}>{item.label}</Text>
      </TouchableOpacity>
    );
  }

  dietUI = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => this.goToThirdPage(item._id)}
        style={{
          backgroundColor: Colors.WHITE_COLOR, padding: 10, borderWidth: 1, borderColor: Colors.teal_300,
          borderRadius: 10, margin: 5, alignItems: 'center', marginLeft: 30, marginRight: 30,
        }}>
        <Text style={{ fontSize: 16, alignSelf: 'center', color: Colors.PRIMARY_COLOR, fontWeight: '400' }}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderFirstPage() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }} >
        <View style={{ flex: 0.5 }}>
          <Text style={{ color: Colors.WHITE_COLOR, fontSize: 16, fontWeight: '500', alignSelf: 'center' }}>
            {Strings.YOUR_GOAL}
          </Text>
          <FlatList
            bounces={false}
            data={this.state.goalList}
            renderItem={this.yourGoalUI}
            extraData={this.state.refresh}
            style={{ marginTop: 10 }}
          />
        </View>
      </View>
    );
  }

  renderSecondPage() {
    return (
      <View style={{ flex: 1 }} >
        <FlatList
          bounces={false}
          data={this.state.dietList}
          renderItem={this.dietUI}
          extraData={this.state.refresh}
        />
      </View>
    );
  }

  renderThirdPage() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR, justifyContent: 'center' }} >
        <View>
          <Text style={{ color: Colors.PRIMARY_COLOR, fontSize: 18, fontWeight: '500', alignSelf: 'center' }}>
            {Strings.HI}
          </Text>
          <Text style={{ color: Colors.TEXT_COLOR, fontSize: 16, fontWeight: '500', alignSelf: 'center', marginLeft: 10, marginRight: 10 }}>
            {Strings.LETS_START_BASICS}
          </Text>
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
            <Button
              buttonStyle={{
                borderColor: Colors.PRIMARY_COLOR,
                borderWidth: 2,
                borderRadius: 4,
                backgroundColor: Colors.PRIMARY_COLOR,
                height: hp(5),
                width: wp(25),
                margin: 2,
              }}
              containerStyle={{ marginLeft: 5 }}
              titleStyle={{ color: Colors.WHITE_COLOR, fontStyle: 'normal' }}
              title={Strings.FEMALE}
              onPress={() => this.goToSignup('Female')}
            />
            <Button
              buttonStyle={{
                borderColor: Colors.PRIMARY_COLOR,
                borderWidth: 2,
                borderRadius: 4,
                backgroundColor: Colors.PRIMARY_COLOR,
                height: hp(5),
                width: wp(25),
                margin: 2,
              }}
              containerStyle={{ marginLeft: 5 }}
              titleStyle={{ color: Colors.WHITE_COLOR, fontStyle: 'normal' }}
              title={Strings.MALE}
              onPress={() => this.goToSignup('Male')}
            />
          </View>

        </View>
      </View>
    );
  }

  onAgeChange(text) {
    this.setState({ yourAge: text });
  }

  onHeightFitChange(text) {
    this.setState({ yourHeightFit: text });
  }

  onHeightInchesChange(text) {
    this.setState({ yourHeightInches: text });
  }

  onWeightChange(text) {
    this.setState({ yourWeight: text });
  }

  onGoalWeightChange(text) {
    this.setState({ goalWeight: text });
  }

  onSliderClick(sliderValue) {
    this.setState({ value: sliderValue });
    var splitData = sliderValue.toString().split('.');
    var getWeeksValue = splitData[0];
    var current_wt = 160;
    var goal_wt = 130;
    var wt_diff = (goal_wt - current_wt) > 0 ? goal_wt - current_wt : -(goal_wt - current_wt);

    if (getWeeksValue <= 5) {
      let perWeek = wt_diff / 6;
      this.setState({ weeks: 6, perWeekWt: perWeek.toFixed(2) });
    } else {
      this.setState({ weeks: getWeeksValue, perWeekWt: wt_diff / getWeeksValue });
    }

    if (goal_wt === 0) {
      this.setState({ weeks: 0, perWeekWt: 0.0 });
    }
  }

  onUserNameChange(text) {
    this.setState({ userName: text });
  }

  onEmailChange(text) {
    this.setState({ userEmail: text });
  }

  onPasswordChange(text) {
    this.setState({ passsword: text });
  }

  onConfirmPasswordChange(text) {
    this.setState({ confirmPassword: text });
  }

  renderFourthPage() {
    // alert(weeks)
    return (
      <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }} >
        <View>
          <TextInputComponent
            label={Strings.AGE}
            onChangeText={this.onAgeChange.bind(this)}
            textColor={Colors.TEXT_COLOR}
            baseColor={Colors.TEXT_COLOR}
            tintColor={Colors.TEXT_COLOR}
            maxLength={3}
            keyboardType={'number-pad'}
          />
          <Text style={{ fontSize: 14, color: Colors.TEXT_COLOR, marginTop: 10, marginLeft: 10, marginRight: 10 }}>{Strings.HEIGHT}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -20 }}>
            <View style={{ flex: 0.5, marginTop: -10 }}>
              <TextInputComponent
                // label={Strings.FIT}
                onChangeText={this.onHeightFitChange.bind(this)}
                textColor={Colors.TEXT_COLOR}
                baseColor={Colors.TEXT_COLOR}
                tintColor={Colors.TEXT_COLOR}
                labelTextStyle={{ alignSelf: 'flex-end' }}
                maxLength={1}
                keyboardType={'number-pad'}
              />
              <View style={[AuthStyle.roundViewStyle, { marginTop: -50, marginRight: 10 }]}>
                <Text style={{ fontSize: 12, color: Colors.PRIMARY_COLOR, fontWeight: '400' }}>{Strings.FIT}</Text>
              </View>
            </View>
            <View style={{ flex: 0.5, marginTop: -10 }}>
              <TextInputComponent
                // label={Strings.INCHES}
                onChangeText={this.onHeightInchesChange.bind(this)}
                textColor={Colors.TEXT_COLOR}
                baseColor={Colors.TEXT_COLOR}
                tintColor={Colors.TEXT_COLOR}
                labelTextStyle={{ alignSelf: 'flex-end' }}
                maxLength={2}
                keyboardType={'number-pad'}
              />
              <View style={[AuthStyle.roundViewStyle, { marginTop: -50, marginRight: 10 }]}>
                <Text style={{ fontSize: 12, color: Colors.PRIMARY_COLOR, fontWeight: '400' }}>{Strings.INCHES}</Text>
              </View>
            </View>
          </View>

          <TextInputComponent
            label={Strings.WEIGHT}
            onChangeText={this.onWeightChange.bind(this)}
            textColor={Colors.TEXT_COLOR}
            baseColor={Colors.TEXT_COLOR}
            tintColor={Colors.TEXT_COLOR}
            text={Strings.POUND}
            viewStyle={AuthStyle.roundViewStyle}
            containerStyle={{ marginTop: 10 }}
            maxLength={3}
            keyboardType={'number-pad'}
          />

          <TextInputComponent
            label={Strings.GOAL_WEIGHT}
            onChangeText={this.onGoalWeightChange.bind(this)}
            textColor={Colors.TEXT_COLOR}
            baseColor={Colors.TEXT_COLOR}
            tintColor={Colors.TEXT_COLOR}
            text={Strings.POUND}
            viewStyle={AuthStyle.roundViewStyle}
            containerStyle={{ marginTop: 20 }}
            maxLength={3}
            keyboardType={'number-pad'}
          />

          <View style={{ alignItems: 'stretch', justifyContent: 'center', marginTop: 30, marginLeft: 10, marginRight: 10 }}>
            <Text style={{ fontSize: 14, color: Colors.TEXT_COLOR }}>{Strings.SET_GOAL}</Text>
            <Slider
              value={this.state.value}
              onValueChange={value => this.onSliderClick(value)}
              // style={{ marginTop: 10, color: Colors.PRIMARY_COLOR }}
              maximumTrackTintColor={Colors.PRIMARY_COLOR}
              minimumTrackTintColor={Colors.PRIMARY_COLOR}
              tintColor={Colors.yellow_100}
              thumbTintColor={Colors.grey_400}
              minimumValue={6}
              maximumValue={45}
            />
            <View style={{ marginTop: 10, paddingLeft: 10 }}>
              <Text style={{ color: Colors.TEXT_COLOR, fontSize: 16 }}>{this.state.weeks} Weeks - Gradual</Text>
              <Text style={{ color: Colors.TEXT_COLOR, fontSize: 14, marginTop: 10 }}>{this.state.selectedGoalName} {this.state.perWeekWt} pound/week</Text>
            </View>

          </View>

          <View style={{ marginTop: hp(10) }}>
            <Button
              buttonStyle={{
                borderColor: Colors.PRIMARY_COLOR,
                borderWidth: 2,
                borderRadius: 4,
                backgroundColor: Colors.PRIMARY_COLOR,
                height: hp(5),
                marginLeft: 30,
                marginRight: 30,
              }}
              titleStyle={{ color: Colors.WHITE_COLOR, fontStyle: 'normal' }}
              title={Strings.NEXT}
              onPress={() => this._verifyDataFourthPage()}
            />
          </View>
        </View>

      </View>
    );
  }
  // /renderFifthPage
  renderFifthPage() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR, marginBottom: 20 }} >
        <View >

          <TextInputComponent
            label={Strings.NAME}
            onChangeText={this.onUserNameChange.bind(this)}
            textColor={Colors.TEXT_COLOR}
            baseColor={Colors.TEXT_COLOR}
            tintColor={Colors.TEXT_COLOR}
          />

          <TextInputComponent
            label={Strings.EMAIL}
            onChangeText={this.onEmailChange.bind(this)}
            textColor={Colors.TEXT_COLOR}
            baseColor={Colors.TEXT_COLOR}
            tintColor={Colors.TEXT_COLOR}
            keyboardType={'email-address'}
            autoCapitalize={false}
          />
          <TextInputComponent
            label={Strings.PASSWORD}
            onChangeText={this.onPasswordChange.bind(this)}
            textColor={Colors.TEXT_COLOR}
            baseColor={Colors.TEXT_COLOR}
            tintColor={Colors.TEXT_COLOR}
            secureTextEntry={true}
            autoCapitalize={false}
          />

          <TextInputComponent
            label={Strings.CONFIRM_PASSWORD}
            onChangeText={this.onConfirmPasswordChange.bind(this)}
            textColor={Colors.TEXT_COLOR}
            baseColor={Colors.TEXT_COLOR}
            tintColor={Colors.TEXT_COLOR}
            secureTextEntry={true}
            autoCapitalize={false}
          />

          <CheckBox
            title={Strings.AGREE_TERMS_CONDITION}
            checked={this.state.checked}
            onPress={() => this.setState({ checked: !this.state.checked })}
            checkedColor={Colors.TEXT_COLOR}
          />

          <View style={{ marginTop: hp(10) }}>
            <Button
              buttonStyle={{
                borderColor: Colors.PRIMARY_COLOR,
                borderWidth: 2,
                borderRadius: 4,
                backgroundColor: Colors.PRIMARY_COLOR,
                height: hp(5),
                marginLeft: 30,
                marginRight: 30,
              }}
              titleStyle={{ color: Colors.WHITE_COLOR, fontStyle: 'normal' }}
              title={Strings.SIGN_UP}
              onPress={() => this._verifyDataFinalPage()}
            />
          </View>

        </View>

      </View>

    );
  }

  renderSixthPage() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR, marginBottom: 20 }} >

      </View>
    );
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: Colors.PRIMARY_COLOR }}
          forceInset={{ top: 'never' }}
        />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: this.state.active === 2 ? Colors.WHITE_COLOR : Colors.PRIMARY_COLOR }}
          forceInset={{ top: 'never' }}>

          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => this.goBack()}>
              <Icon name="close" size={24} color={this.state.active === 2 ? Colors.PRIMARY_COLOR : Colors.WHITE_COLOR} />
            </TouchableOpacity>
            <View style={{ flex: 0.9 }}>
              <Text
                style={{
                  color: Colors.WHITE_COLOR,
                  fontSize: hp(2),
                  fontWeight: 'bold',
                  padding: 10,
                  alignItems: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                {this.state.active === 1 ? Strings.SELECT_DIET : ''}
                {this.state.active === 3 || this.state.active === 4 ? Strings.SIGN_UP : ''}
              </Text>
            </View>

          </View>
          <ViewPager
            ref={this.viewPager}
            scrollEnabled={false}
            style={{ flex: 1, backgroundColor: Colors.PRIMARY_COLOR, alignItems: 'center', justifyContent: 'center' }}
            initialPage={this.state.initialPage}>
            {this.renderSixthPage()}
            {this.renderFirstPage()}
            {this.renderSecondPage()}
            {this.renderThirdPage()}
            {this.renderFourthPage()}
            {this.renderFifthPage()}


          </ViewPager>

          {<CustomLoader isLoading={this.state.isLoading} />}
        </SafeAreaView>
        <CommonSnackbar
          visible={this.state.isSnackbarVisible}
          message={this.state.snackMessage}
        />
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
      registerUser,
      clearAuthReducer,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(SignUpScreen));
