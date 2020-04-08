/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, TextInput, StyleSheet } from 'react-native';
import { Strings, Colors } from '../../Constants';
// eslint-disable-next-line prettier/prettier
import { Header, CustomLoader } from '../../Components';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from '@react-navigation/compat';
import MealCategoryStyle from './MealCategoryStyle';
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";

import { getFoodListNutrition, clearFoodTypeReducer } from '../../Actions/ActionCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Voice from '@react-native-community/voice';
import { getItem } from '../../Utils/AsyncUtils';

class MealCategoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      isSearchList: false,
      searchTextValue: '',
      foodItemList: [],
      isModelVisible: 0,
      results: '',
    };

    // Voice.onSpeechStart = this.onSpeechStartHandler(this);
    // Voice.onSpeechEnd = this.onSpeechEndHandler(this);
    // Voice.onSpeechResults = this.onSpeechResultsHandler(this);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e) => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = (e) => {
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = (e) => {
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = (e) => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e) => {
    console.log('PRI_onSpeechResults: ', e);
    console.log('PRI_onSpeechResults value: ', e.value[0]);
    this.setState({
      results: e.value[0],
    });

    if (e.value.length > 0) {
      setTimeout(() => {
        this.setState({
          isSearchList: true,
          searchTextValue: e.value[0],
          isModelVisible: 0,
          results: '',
        });
        let postData = {
          query: e.value[0],
        };
        this.props.getFoodListNutrition(postData);
        this._stopRecognizing();
      }, 5000);
    }
  };

  onSpeechPartialResults = (e) => {
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e) => {
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  // onStartButtonPress(e) {
  //   Voice.start('en-US');
  // }

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      // results: '',
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: '',
      partialResults: [],
      end: '',
    });
  };


  componentDidMount() {
    console.log('name first comp', this.props.route.params.name);
    // this.setState({ isLoading: true });
    // this.getReasturentMappingApiCall();
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.FoodTypeReducer.foodListRes !== prevState.foodListRes) {
      // console.log(' PRIYANKA nextProps --', JSON.stringify(nextProps.FoodTypeReducer.foodListRes));
      // if (nextProps.FoodTypeReducer.foodListRes === []) {
      //   return {
      //     noDataFound: true,
      //   };
      // } else {
      return {
        foodItemList: nextProps.FoodTypeReducer.foodListRes,
        isLoading: false,
      };
      // }

    }
    // Return null if the state hasn't changed
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.FoodTypeReducer.foodListRes !== prevProps.FoodTypeReducer.foodListRes) {
      this.clearState();
      // this.props.clearFoodTypeReducer();
    }
  }

  clearState() {
    this.setState({ foodItemList: [] });
  }

  searchUpdated(text) {
    if (text !== '') {
      // const filteredFoodList = this.state.allServiceItemList.filter(createFilter(term, KEYS_TO_FILTERS))
      this.setState({ isSearchList: true, searchTextValue: text });
      let postData = {
        query: text,
      };
      this.props.getFoodListNutrition(postData);
    } else {
      this.setState({ isSearchList: false, searchTextValue: '' });
    }

  }

  onSearchClose() {
    this.setState({ isSearchList: false, searchTextValue: '' });
  }

  goBack() {
    this.props.navigation.goBack();
    // this.props.navigation.navigate('HomeScreen', {
    //   doChange:
    //     this.changeData
    // });
  }

  categoriesUI = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={{ margin: 10 }}
          onPress={() =>
            this.props.navigation.navigate('FoodDetailScreen', { 'foodName': item.food_name })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ width: wp(15), height: hp(7) }}
              source={{ uri: item.photo.thumb }}
            />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ color: Colors.TEXT_COLOR, fontSize: 16, fontWeight: '700' }}>{item.food_name}</Text>
              <Text style={{ color: Colors.TEXT_COLOR, fontSize: 16, paddingTop: 5 }}>{item.serving_unit}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={MealCategoryStyle.lineView} />
      </View>
    );
  }

  _voiceUI() {
    // console.log('Priyanka >>', this.state.results);
    return (
      <View style={styles.content} >
        <View style={{
          flex: 0.1, marginTop: 10, margin: 10, flexDirection: 'row', alignItems: 'center',
          // justifyContent: 'space-evenly'
        }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ isModelVisible: 0, results: '' });
              this._stopRecognizing();
            }}
            style={{ flex: 0.1 }}>
            <Ionicons name='md-close' size={32} color={Colors.WHITE_COLOR} />
          </TouchableOpacity>

          <View style={{ flex: 0.9, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, color: Colors.WHITE_COLOR, textAlign: 'center' }}>Try say something</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this._startRecognizing()}
          style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesome name='microphone' size={72} color={Colors.WHITE_COLOR} style={{ paddingRight: 10 }} />
        </TouchableOpacity>
        <View style={{ flex: 0.3, marginBottom: 10 }}>
          <Text style={{ fontSize: 24, color: Colors.WHITE_COLOR, paddingLeft: 20, textAlign: 'center' }}>
            {this.state.results !== undefined &&
              this.state.results.length > 0 ? this.state.results : Strings.SPEECH_TEXT}</Text>
        </View>
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
          style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}
          forceInset={{ top: 'never' }}>
          <View style={{ flex: 0.1 }}>
            <Header
              leftComponent={
                <TouchableOpacity onPress={() => this.goBack()}>
                  <Icon name="ios-arrow-back" size={24} color={Colors.WHITE_COLOR} />
                </TouchableOpacity>
              }
              middleComponent={this.props.route.params.name} />
          </View>

          <View style={{ flex: 0.9 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 5 }}>
              <View style={MealCategoryStyle.searchInputView}>
                <EvilIcons name='search' size={24} color={Colors.TEXT_COLOR} style={{ paddingLeft: 5 }} />
                <TextInput
                  onChangeText={(term) => { this.searchUpdated(term) }}
                  style={MealCategoryStyle.searchInput}
                  placeholder={!this.state.isSearchList ? "Search" : null}
                  placeholderTextColor={Colors.TEXT_COLOR}
                  value={this.state.searchTextValue}
                />
                <TouchableOpacity onPress={() => this.onSearchClose()}>
                  <Ionicons name='md-close-circle' size={24} color={Colors.TEXT_COLOR} style={{ paddingRight: 10 }}
                  />
                </TouchableOpacity>

              </View>
              <TouchableOpacity onPress={() => this.setState({ isModelVisible: 1 })}>
                <FontAwesome name='microphone' size={24} color={Colors.TEXT_COLOR} style={{ paddingRight: 10 }} />
              </TouchableOpacity>
            </View>

            {!this.state.isSearchList ?
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('CategoriesListScreen')}
                  style={{
                    backgroundColor: Colors.orange, height: hp(15), margin: 10,
                    borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                  }}>
                  <Image
                    style={{ width: wp(15), height: wp(15) }}
                    source={require('../../Assets/categories.png')}
                  />
                  <Text style={{ marginTop: 5, fontSize: 14, color: Colors.black }}>{Strings.CATEGORY}</Text>
                </TouchableOpacity>

                <View style={{
                  height: hp(30),
                  margin: 10,
                  borderRadius: 10,
                  borderColor: Colors.PRIMARY_COLOR, borderWidth: 0.5,
                }}>
                  <View style={MealCategoryStyle.headingViewStyle}>
                    <Text style={{ fontSize: 18, color: Colors.WHITE_COLOR, padding: 3 }}>{this.props.route.params.name}</Text>
                  </View>

                  <View style={{ justifyContent: 'center', }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('FrequentRecentScreen', { name: Strings.RECENT })}
                      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                      <Image
                        style={{ width: wp(11), height: wp(11) }}
                        source={require('../../Assets/alarm_clock.png')}
                      />
                      <Text style={{ fontSize: 18, color: Colors.TEXT_COLOR, marginLeft: 10 }}>{Strings.RECENT}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('FrequentRecentScreen', { name: Strings.FREQUENT })}
                      style={{ flexDirection: 'row', alignItems: 'center', margin: 10, marginTop: 5 }}>
                      <Image
                        style={{ width: wp(11), height: wp(11) }}
                        source={require('../../Assets/pressure.png')}
                      />
                      <Text style={{ fontSize: 18, color: Colors.TEXT_COLOR, marginLeft: 10 }}>{Strings.FREQUENT}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('RestaurantsMapScreen')}
                      style={{ flexDirection: 'row', alignItems: 'center', margin: 10, marginTop: 5 }}>
                      <Image
                        style={{ width: wp(11), height: wp(11) }}
                        source={require('../../Assets/calories.png')}
                      />
                      <Text style={{ fontSize: 18, color: Colors.TEXT_COLOR, marginLeft: 10 }}>{Strings.RESTAURANTS}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
              :
              <View style={{ flex: 0.9 }}>
                {this.state.foodItemList.length > 0 ?
                  <FlatList
                    bounces={false}
                    data={this.state.foodItemList}
                    renderItem={this.categoriesUI}
                  />
                  :
                  <View style={{ alignItems: 'center', marginTop: 40, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 16, color: Colors.TEXT_COLOR, alignSelf: 'center' }}>No search result found!</Text>
                  </View>
                }
              </View>
            }

            <Modal
              isVisible={this.state.isModelVisible === 1}
              onSwipeComplete={() => this.setState({ isModelVisible: 0 })}
              swipeDirection={['up', 'left', 'right', 'down']}
              style={styles.bottomModal}
              onBackdropPress={() => this.setState({ isModelVisible: 0 })}
            >
              {this._voiceUI()}
            </Modal>
            {<CustomLoader isLoading={this.state.isLoading} />}

          </View>
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
  bottomModal: { justifyContent: 'center', margin: 10 },
  content: { flex: 0.5, backgroundColor: Colors.colorPrimaryMiddle, height: 350, borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.1)' },
});
// export default withNavigation(MealCategoryScreen);

function mapStateToProps(state) {
  return {
    FoodTypeReducer: state.FoodTypeReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getFoodListNutrition,
      clearFoodTypeReducer,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(MealCategoryScreen));
