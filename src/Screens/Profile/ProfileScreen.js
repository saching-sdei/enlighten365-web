/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, TextInput, NativeModules } from 'react-native';
// eslint-disable-next-line prettier/prettier
import { Header, CustomLoader, TextInputComponent, ProfileTextComponent } from '../../Components';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { withNavigation } from '@react-navigation/compat';
import { Dropdown } from 'react-native-material-dropdown';
import { useNavigationParam } from '@react-navigation/native';
import { Strings, Colors, APIUrls } from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Avatar, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'; import { } from 'react-native-paper';
import { removeItem, getItem } from '../../Utils/AsyncUtils';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProfileDetails, updateProfileDetails, clearProfile } from '../../Actions/ActionCreators';
var ImagePicker = NativeModules.ImageCropPicker;
var moment = require('moment');

var radio_props = [
  { label: 'Male', value: 0 },
  { label: 'Female', value: 1 },
];
let heightFit = [
  { value: 0 },
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
];

let heightInch = [
  { value: 0 },
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
  { value: 11 },
];

let yourGoalData = [{
  value: Strings.BE_HEALTHIER,
  detail: Strings.BE_HEALTHIER_DETAIL,
  id: 1,
}, {
  value: Strings.LOSE_WEIGHT,
  detail: Strings.LOSE_WEIGHT_DETAIL,
  id: 2,
}, {
  value: Strings.GAIN_WEIGHT,
  detail: Strings.GAIN_WEIGHT_DETAIL,
  id: 3,
},
];

let dietData = [{
  value: 'Vegan',
  id: 1,
}, {
  value: 'Vegetarian',
  id: 2,
}, {
  value: 'Keto Diet',
  id: 3,
}, {
  value: 'Low Crab',
  id: 4,
}, {
  value: 'Adkins',
  id: 5,
}, {
  value: 'Dash',
  id: 6,
}, {
  value: 'Mediterraneam Diet',
  id: 7,
}, {
  value: 'The Flexitarian Diet',
  id: 8,
}, {
  value: 'Weight Watchers Diet',
  id: 9,
}, {
  value: 'MIND Diet',
  id: 10,
}, {
  value: 'TLC Diet',
  id: 11,
}, {
  value: 'Volumetrics Diet',
  id: 12,
}, {
  value: 'Mayo Clinic Diet',
  id: 13,
}, {
  value: 'Ornish Diet',
  id: 14,
}, {
  value: 'The Fertility Diet',
  id: 15,
}, {
  value: 'Low Crab (General)',
  id: 16,
}, {
  value: 'No Specific Diet',
  id: 17,
},
];

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      isEdit: false,
      isModelVisible: 0,
      visibleModal: 0,
      value: 0,
      genderValue: 0,
      createdAt: '',
      checked: 'first',
      slectedGender: '',
      selectedWeight: '',
      selectedHeightFit: 0,
      selectedHeightInch: 0,
      selectedAge: '',
      isFitLable: true,
      selectedHealthGoal: '',
      selectedDietPlan: '',
      isHeightLable: true,
      goalList: [],
      dietList: [],
      getProfileRes: '',

      profileUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      // isLoading: false,
      updateProfileRes: [],
    };
  }

  componentDidMount() {
    getItem(Strings.KEY_USER_DATA)
      .then(value => {
        if (value) {
          let postData = {
            userId: value._id,
          };
          this.props.getProfileDetails(postData, value.loginToken);
        }
      })
      .catch(error => {
        // alert(JSON.stringify(error));
      });

    this.fetchAPICall(APIUrls.GET_GOAL, 1);
    this.fetchAPICall(APIUrls.GET_DIET, 2);
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.ProfileReducer.updateProfileRes !== prevState.updateProfileRes) {
      return {
        updateProfileRes: nextProps.ProfileReducer.updateProfileRes,
      };
    }

    if (nextProps.ProfileReducer.getProfileRes !== prevState.getProfileRes) {
      console.log('GETDERIVED STATE Auth --', JSON.stringify(nextProps.ProfileReducer.getProfileRes));
      console.log('GETDERIVED STATE state --', JSON.stringify(prevState.getProfileRes));
      let data = nextProps.ProfileReducer.getProfileRes;
      // console.log('email', data.email);
      if (nextProps.ProfileReducer.statusCode === Strings.HTTP_STATUS_CODE_OK) {
        if (data !== null && data !== undefined) {
          return {
            getProfileRes: data,
            isLoading: false,
            userName: data.firstname,
            createdAt: data.createdAt,
            userEmail: data.email,
            slectedGender: data.gender,
            selectedWeight: data.weight,
            selectedAge: data.age,
            selectedHeightFit: data.height_feet,
            selectedHeightInch: data.height_inches,
            selectedHealthGoal: data.goals[0].name,
            selectedDietPlan: data.diet[0].name,
            selectedHealthGoalId: data.goals[0]._id,
            selectedDietPlanId: data.diet[0]._id,

            updatedUserName: data.firstname,
            gender: data.gender,
            weight: data.weight,
            age: data.age,
            heightFit: data.height_feet,
            heightInches: data.height_inches,
            healthGoal: data.goals[0].name,
            dietPlan: data.diet[0].name,
            healthGoalId: data.goals[0]._id,
            dietPlanId: data.diet[0]._id,

            userId: data._id,
          };
        }
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ProfileReducer.getProfileRes !== prevProps.ProfileReducer.getProfileRes) {
      if (this.props.ProfileReducer.statusCode === Strings.HTTP_STATUS_CODE_OK) {
        this.clearState();
      } else {
        alert(this.props.ProfileReducer.getProfileRes.message)
      }
      this.props.clearProfile();
    }
  }

  fetchAPICall(APIURL, apiCall) {

    // this.setState({ isLoading: true });
    fetch(APIURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 2000,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('signup responseJson', responseJson);

        this.setState({ isLoading: false });
        if (responseJson.statusCode === Strings.HTTP_STATUS_CODE_OK) {
          if (apiCall === 1) {
            console.log('responseJson GOAL>>>', responseJson);
            this.setState({ goalList: this.prepareDropDownData(responseJson.data.Goals) });
          }
          if (apiCall === 2) {
            console.log('responseJson DIET>>>', responseJson);
            this.setState({ dietList: this.prepareDropDownData(responseJson.data.Goals) });
          }
        }
      })
      .catch(error => {
        console.log('signup error', error);
        this.setState({ isLoading: false });
      });
  }

  prepareDropDownData(listdata) {
    var tempArray = [];
    listdata.map((data, index) => {
      var tempData = {
        value: listdata[index].name,
        id: listdata[index]._id,
      };
      tempArray.push(tempData);
    });
    return tempArray;
  }

  goBack() {
    this.props.navigation.goBack();
  }

  goLogout() {
    removeItem(Strings.KEY_USER_DATA);
    this.props.navigation.navigate('WelcomeScreen');
  }
  onGenderClick() {
    // alert('Gender click')
    this.setState({ isModelVisible: 0 })
    if (this.state.genderValue === 0) {
      this.setState({ slectedGender: 'Male' })
    } else {
      this.setState({ slectedGender: 'Female' })
    }
  }

  renderModalContent() {
    const { checked } = this.state;
    return (
      <View style={styles.content} >
        <View style={{ marginTop: 10, marginLeft: 24, }}>
          <RadioForm
            buttonColor={Colors.black}
            selectedButtonColor={Colors.black}
            radio_props={radio_props}
            initial={0}
            buttonSize={15}
            onPress={(value) => { this.setState({ genderValue: value }) }}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button
            buttonStyle={{
              backgroundColor: Colors.gray2,
              width: wp(40),
              margin: 10
            }}
            titleStyle={{ fontSize: 14, color: Colors.black, fontWeight: '600' }}
            title={Strings.CANCEL}
            onPress={() => this.setState({ isModelVisible: 0 })}
          />
          <Button
            buttonStyle={{
              backgroundColor: Colors.gray2,
              width: wp(40),
              margin: 10
            }}
            titleStyle={{ fontSize: 14, color: Colors.black, fontWeight: '600' }}
            title={Strings.DONE}
            onPress={() => this.onGenderClick()}
          />

        </View>
      </View>
    );
  }

  renderModalHeight() {
    const { checked } = this.state;
    return (
      <View style={styles.content} >

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ flex: 0.2, fontSize: 14, color: Colors.black, paddingTop: 20 }}>Feet</Text>
            <Dropdown
              label={this.state.isFitLable ? this.state.selectedHeightFit : ''}
              data={heightFit}
              onChangeText={this.onHeightChange.bind(this)}
              containerStyle={styles.fullDropDownViewStyle}
              baseColor={Colors.text_gray}
              inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
            // itemTextStyle={{ fontWeight: 'bold', textAlign: 'center', color: Colors.text_gray }}
            // pickerStyle={{ height: hp(100), paddingBottom: 20 }}
            />
          </View>

          <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ flex: 0.2, fontSize: 14, color: Colors.black, paddingTop: 20 }}>Inch</Text>
            <Dropdown
              label={this.state.isHeightLable ? this.state.selectedHeightInch : ''}
              data={heightInch}
              onChangeText={this.onHeightInchChange.bind(this)}
              containerStyle={styles.fullDropDownViewStyle}
              baseColor={Colors.text_gray}
              inputContainerStyle={{ borderBottomColor: 'transparent', marginTop: 5 }}
            // pickerStyle={{ height: hp(100), paddingBottom: 20 }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
          <Button
            buttonStyle={{
              backgroundColor: Colors.gray2,
              width: wp(40),
              margin: 10
            }}
            titleStyle={{ fontSize: 14, color: Colors.black, fontWeight: '600' }}
            title={Strings.CANCEL}
            onPress={() => this.setState({ isModelVisible: 0 })}
          />
          <Button
            buttonStyle={{
              backgroundColor: Colors.gray2,
              width: wp(40),
              margin: 10
            }}
            titleStyle={{ fontSize: 14, color: Colors.black, fontWeight: '600' }}
            title={Strings.DONE}
            onPress={() => this.onGenderClick()}
          />

        </View>
      </View>
    );
  }

  handleAge = (text) => {
    this.setState({ selectedAge: text });
  }

  handleWeight = (text) => {
    this.setState({ selectedWeight: text });
  }

  onHealthChange = (text) => {
    this.setState({
      selectedHealthGoal: text,
      selectedHealthGoalId: this.state.goalList[this.refs.ref_health.selectedIndex()].id,
    });
    console.log("selectedHealthGoal >>" + this.state.goalList[this.refs.ref_health.selectedIndex()].id);
  }

  onDietChange = (text) => {
    this.setState({
      selectedDietPlan: text,
      selectedDietPlanId: this.state.dietList[this.refs.ref_diet.selectedIndex()].id,
    });
    console.log("selectedDietPlan >>" + this.state.dietList[this.refs.ref_diet.selectedIndex()].id);
  }

  onHeightChange(text) {
    this.setState({ isFitLable: false, selectedHeightFit: text });
  }
  onHeightInchChange(text) {
    this.setState({ isHeightLable: false, selectedHeightInch: text });
  }

  onEditButtonClick() {
    this.setState({ visibleModal: 1 });
  }

  CameraOpen() {
    ImagePicker.openCamera(
      { width: 300, height: 300, cropping: true }
    ).then(image => {
      this.setState({
        isLoading: true,
        visibleModal: null,
        profileUrl: image.path,
      });
      let fileName = moment().unix() + '.jpg';
      let cameraPath = image.path;
      let file = {
        uri: cameraPath,
        type: 'image/jpeg',
        name: fileName,
      };
      const formData = new FormData();
      formData.append('file', file);
      // this.fetchAPiCallingCode(formData);
    });
  }

  GalleryOpen() {
    ImagePicker.openPicker({
      width: 300, height: 400, cropping: true,
    }).then(image => {
      console.log('==Gallery image==', image);
      this.setState({
        // isLoading: true,
        visibleModal: null,
        profileUrl: 'file://' + image.path,
      });
      let galleryPath = 'file://' + image.path;
      let file = {
        uri: galleryPath,
        type: 'image/jpeg',
        name: 'abc.jpg',
      };
      const formData = new FormData();
      formData.append('file', file);
      console.log('==FormData==', formData);
      // this.fetchAPiCallingCode(formData);
    });
  }

  fetchAPiCallingCode(formData) {
    console.log('==FormData==', formData);
    fetch(APIUrls.IMAGE_UPLOAD, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: this.state.token,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ isLoading: false });
        console.log('===ImageUpload ', JSON.stringify(responseJson));
      })
      .catch(error => {
        console.log('Error', error);
      });
  }

  _renderAttachmentTypeModal = () => (
    <View style={styles.content} >
      <View style={styles.gallaryViewStyle}>
        <View style={{ marginRight: 20, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => this.CameraOpen()}
          >
            <MaterialCommunityIconsIcon
              name="camera"
              color={Colors.SECONDARY_COLOR}
              size={40}
            />
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 16 }}>
            Camera
          </Text>
        </View>

        <View style={{ marginLeft: 20, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => this.GalleryOpen()}
          >
            <MaterialCommunityIconsIcon
              name="camera-burst"
              color={Colors.SECONDARY_COLOR}
              size={40}
            />
          </TouchableOpacity>
          <Text style={{ textAlign: 'left', marginTop: 10, fontSize: 16 }}>
            Gallery
          </Text>
        </View>
      </View>
    </View>
  );

  onUpdateProfileClick() {
    let postData = {
      userId: this.state.userId,
      firstname: this.state.updatedUserName,
      lastname: this.state.updatedUserName,
      // email: this.state.userEmail,
      // password: 'e10adc3949ba59abbe56e057f20f883e',
      gender: this.state.slectedGender,
      weight: this.state.selectedWeight,
      age: this.state.selectedAge,
      height_feet: this.state.selectedHeightFit,
      height_inches: this.state.selectedHeightInch,
      goals: this.state.selectedHealthGoalId,
      diet: this.state.selectedDietPlanId,
    };
    console.log('Update postData >>', JSON.stringify(postData));
    this.props.updateProfileDetails(postData);
  }

  onCrossClick() {
    console.log('onCrossClick');
    this.setState({
      updatedUserName: this.state.userName,
      slectedGender: this.state.gender,
      selectedWeight: this.state.weight,
      selectedAge: this.state.age,
      selectedHeightFit: this.state.heightFit,
      selectedHeightInch: this.state.heightInches,
      selectedHealthGoal: this.state.healthGoal,
      selectedDietPlan: this.state.dietPlan,
      selectedHealthGoalId: this.state.healthGoalId,
      selectedDietPlanId: this.state.dietPlanId,
    });
    this.setState({ isEdit: false });
  }

  onUserNameChange = (text) => {
    this.setState({ updatedUserName: text });
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: Colors.colorPrimaryMiddle }}
          forceInset={{ top: 'never' }}
        />
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: 'never' }}>

          <View style={{ flex: 0.1 }}>
            <Header
              // leftComponent={
              //   <TouchableOpacity onPress={() => this.goBack()}>
              //     <Icon name="ios-arrow-back" size={28} color={Colors.WHITE_COLOR} />
              //   </TouchableOpacity>
              // }
              middleComponent={Strings.PROFILE}
              rightComponent={
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                  {this.state.isEdit ?
                    <TouchableOpacity
                      onPress={() => this.onUpdateProfileClick()}>
                      <MaterialIcons name="check" size={28} color={Colors.WHITE_COLOR} style={{ paddingRight: 10 }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.setState({ isEdit: true })}
                      style={{ paddingRight: 10 }}>
                      <MaterialIcons name="edit" size={28} color={Colors.WHITE_COLOR} />
                    </TouchableOpacity>
                  }

                  {this.state.isEdit ?
                    <TouchableOpacity
                      style={{ paddingRight: 10, paddingLeft: 5 }}
                      onPress={() => this.onCrossClick()}>
                      <Entypo name="cross" size={28} color={Colors.red} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.goLogout()}
                      style={{ paddingRight: 10, paddingLeft: 10 }}>
                      <Image source={require('../../Assets/logout.png')}
                        style={{ width: wp(6), height: wp(6), tintColor: Colors.red }}
                      />
                    </TouchableOpacity>
                  }

                </View>
              }
            />
          </View>

          <ScrollView
            style={{ flex: 0.9 }}
            bounces={false}>
            <View>
              <View style={{ alignItems: 'center' }}>
                <Avatar
                  source={{
                    uri: this.state.profileUrl,
                  }}
                  showEditButton
                  size="large"
                  rounded
                  onEditPress={() => this.onEditButtonClick()}
                // activeOpacity={0.7}
                />
                <TextInput
                  style={{ marginTop: 10, color: Colors.text_gray, fontSize: 18, fontWeight: 'bold' }}
                  underlineColorAndroid="transparent"
                  placeholder={this.state.updatedUserName}
                  placeholderTextColor={Colors.text_gray}
                  autoCapitalize="none"
                  textColor={Colors.text_gray}
                  onChangeText={this.onUserNameChange}
                  value={this.state.updatedUserName}
                  editable={this.state.isEdit ? true : false}
                />
                {/* <Text style={{ marginTop: 10, color: Colors.text_gray, fontSize: 18, fontWeight: 'bold' }}>{this.state.userName}</Text> */}
                <Text style={{ marginTop: 5, color: Colors.text_gray, fontSize: 12 }}>{this.state.userEmail}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <Text style={{ color: Colors.text_gray, fontSize: 12 }}>{'Member since: '}</Text>
                  <Text style={{ color: Colors.text_gray, fontSize: 12 }}>{moment(this.state.createdAt).format('MMM, YYYY')}</Text>
                </View>
              </View>


              <View style={{ flexDirection: 'row', margin: 5, marginTop: 10 }}>
                <View style={styles.mainViewStyle}>
                  <Text style={styles.textStyle}>{'Gender'}</Text>
                  {this.state.isEdit ?
                    <TouchableOpacity onPress={() => this.setState({ isModelVisible: 1 })}>
                      <Text style={styles.textStyle}>{this.state.slectedGender}</Text>
                    </TouchableOpacity>
                    : <Text style={styles.textStyle}>{this.state.slectedGender}</Text>}
                </View>
                <View style={styles.mainViewStyle}>
                  <Text style={styles.textStyle}>{'Weight(pound):'}</Text>
                  <TouchableOpacity>
                    {/* <Text style={styles.textStyle}>{this.state.selectedWeight}</Text> */}
                    <TextInput
                      style={styles.textStyle}
                      underlineColorAndroid="transparent"
                      placeholder={this.state.selectedWeight.toString()}
                      placeholderTextColor={Colors.text_gray}
                      autoCapitalize="none"
                      textColor={Colors.text_gray}
                      maxLength={3}
                      onChangeText={this.handleWeight}
                      value={this.state.selectedWeight}
                      editable={this.state.isEdit ? true : false}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: 5 }}>
                <View style={styles.mainViewStyle}>
                  <Text style={styles.textStyle}>{"Age(year's):"}</Text>
                  <TouchableOpacity>
                    {/* <TextInput style={styles.textStyle}
                    value={this.state.selectedAge} /> */}
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder={this.state.selectedAge.toString()}
                      placeholderTextColor={Colors.text_gray}
                      autoCapitalize="none"
                      textColor={Colors.text_gray}
                      maxLength={2}
                      onChangeText={this.handleAge}
                      value={this.state.selectedAge}
                      editable={this.state.isEdit ? true : false}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.mainViewStyle}>
                  <Text style={styles.textStyle}>{'Height:'}</Text>
                  {this.state.isEdit ?
                    <TouchableOpacity onPress={() => { this.setState({ isModelVisible: 2 }) }}>
                      <Text style={styles.textStyle}>{this.state.selectedHeightFit}' {this.state.selectedHeightInch}''</Text>
                    </TouchableOpacity>
                    :
                    <Text style={styles.textStyle}>{this.state.selectedHeightFit}' {this.state.selectedHeightInch}''</Text>
                  }
                </View>
              </View>

              <View style={{ margin: 5 }}>
                <View style={styles.fullViewStyle}>
                  <Text style={[styles.textStyle, { flex: 0.3 }]}>{'Health Goal:'}</Text>
                  <Dropdown
                    ref="ref_health"
                    data={this.state.goalList}
                    onChangeText={this.onHealthChange.bind(this)}
                    containerStyle={{
                      flex: 0.7,
                      height: 50,
                      marginTop: -40,
                    }}
                    value={this.state.selectedHealthGoal}
                    baseColor={Colors.text_gray}
                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                    disabled={this.state.isEdit ? false : true}
                  />
                </View>
              </View>

              <View style={{ margin: 5 }}>
                <View style={styles.fullViewStyle}>
                  <Text style={[styles.textStyle, { flex: 0.3 }]}>{'Diet Plan:'}</Text>
                  <Dropdown
                    ref="ref_diet"
                    value={this.state.selectedDietPlan}
                    data={this.state.dietList}
                    onChangeText={this.onDietChange.bind(this)}
                    containerStyle={{
                      flex: 0.7,
                      height: 50,
                      marginTop: -40,
                    }}
                    baseColor={Colors.text_gray}
                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                    pickerStyle={{ height: hp(40) }}
                    disabled={this.state.isEdit ? false : true}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.resultStyle}
                onPress={() => this.props.navigation.navigate('MyNutritionSystem')}
              >
                <Text style={styles.resultTextSttyle}>My Nutrition System Results</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.blendStyle}
              // onPress={() => this.props.navigation.navigate('ReportsViewScreen')}
              >
                <Text style={{ fontSize: 18, color: Colors.colorAccent }}>
                  Order My Custom Blend Now
              </Text>

                <Text style={styles.subTextStyle}>
                  Dietary supplements that 'll help to achieve your fitness goals
              </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={{ margin: 20, alignItems: 'center' }}
              onPress={() => this.props.navigation.navigate('ReportsViewScreen')}>
              <Text style={{ fontSize: 18, color: Colors.SECONDARY_COLOR }}>VIEW REPORT SCREEN</Text>
            </TouchableOpacity> */}

              <Modal
                isVisible={this.state.isModelVisible === 1}
                onSwipeComplete={() => this.setState({ isModelVisible: 0 })}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.bottomModal}
                onBackdropPress={() => this.setState({ isModelVisible: 0 })}
              >
                {this.renderModalContent()}
              </Modal>

              <Modal
                isVisible={this.state.isModelVisible === 2}
                onSwipeComplete={() => this.setState({ isModelVisible: 0 })}
                swipeDirection={['left', 'right']}
                style={styles.bottomModal}
                onBackdropPress={() => this.setState({ isModelVisible: 0 })}
              >
                {this.renderModalHeight()}
              </Modal>

              <Modal
                isVisible={this.state.visibleModal === 1}
                onBackdropPress={() => this.setState({ visibleModal: null })}
                style={styles.bottomModal}
              >
                {this._renderAttachmentTypeModal()}
              </Modal>

              {<CustomLoader isLoading={this.state.isLoading} />}
            </View>
          </ScrollView>

        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainViewStyle: {
    borderWidth: 1, borderColor: Colors.colorPrimaryDark,
    flexDirection: 'row', margin: 5, alignItems: 'center',
    paddingRight: 20, paddingTop: 10, paddingBottom: 10, paddingLeft: 10,
    flex: 0.5, justifyContent: 'space-between',
  },
  fullViewStyle: {
    borderWidth: 1, borderColor: Colors.colorPrimaryDark,
    flexDirection: 'row', margin: 5, alignItems: 'center',
    paddingRight: 20, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, justifyContent: 'space-evenly'
  },

  textStyle: { fontSize: 16, color: Colors.text_gray },
  blendStyle: {
    margin: 20, alignItems: 'center', paddingTop: 20, paddingBottom: 20,
    backgroundColor: Colors.colorPrimaryMiddle,
  },
  resultStyle: { marginTop: hp(2), alignItems: 'center', marginBottom: 10 },
  resultTextSttyle: { fontSize: 20, color: Colors.outline, fontWeight: '400' },
  subTextStyle: {
    fontSize: 12, color: Colors.colorAccent,
    paddingLeft: 20, paddingRight: 20, textAlign: 'center',
  },
  bottomModal: { justifyContent: 'flex-end', margin: 0 },
  content: { flex: 0.3, backgroundColor: 'white', height: 350, borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.1)' },

  fullDropDownViewStyle: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    flex: 0.5,
    height: hp(3),
  },

  modalContentAttachmentChat: {
    backgroundColor: Colors.WHITE,
    padding: 0,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: hp(10),
    width: wp(50),
    // marginTop: 90
  },

  gallaryViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

// export default withNavigation(ProfileScreen);
function mapStateToProps(state) {
  return {
    ProfileReducer: state.ProfileReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProfileDetails,
      updateProfileDetails,
      clearProfile,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(ProfileScreen))