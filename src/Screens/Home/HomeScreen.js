/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation, NavigationEvents } from '@react-navigation/compat';
import { Strings, Colors } from '../../Constants';
import HomeScreenStyle from './HomeScreenStyle';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import { getFoodByDate, deleteFood } from '../../Actions/ActionCreators';
import { getItem } from '../../Utils/AsyncUtils';

let today = new Date();
let breakfastArray = [];
let lunchArray = [];
let snacksArray = [];
let dinnerArray = [];
let dayCount = 0;

let totalCalBreakfast = 0;
let totalCalLunch = 0;
let totalCalsnacks = 0;
let totalCalDinner = 0;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      dayCount: 0,
      totalCount: 0,
      refresh: false,
      waterList: [
        {
          name: Strings.BE_HEALTHIER,
          detail: Strings.BE_HEALTHIER_DETAIL,
          id: 1,
        }, {
          name: Strings.LOSE_WEIGHT,
          detail: Strings.LOSE_WEIGHT_DETAIL,
          id: 2,
        }, {
          name: Strings.LOSE_WEIGHT,
          detail: Strings.LOSE_WEIGHT_DETAIL,
          id: 3,
        },
        {
          name: Strings.LOSE_WEIGHT,
          detail: Strings.LOSE_WEIGHT_DETAIL,
          id: 4,
        },
        {
          name: Strings.LOSE_WEIGHT,
          detail: Strings.LOSE_WEIGHT_DETAIL,
          id: 5,
        },
        {
          name: Strings.LOSE_WEIGHT,
          detail: Strings.LOSE_WEIGHT_DETAIL,
          id: 6,
        },
        {
          name: Strings.LOSE_WEIGHT,
          detail: Strings.LOSE_WEIGHT_DETAIL,
          id: 7,
        },
      ],
      dietFoodList: [
        {
          name: 'BREAKFAST',
        },
        {
          name: 'LUNCH',
        },
        {
          name: 'SNACKS',
        },
        {
          name: 'DINNER',
        },
      ],
      recBreakfast: '',
      recLunch: '',
      recSnack: '',
      recDinner: '',
      mealArray: [],
      recommededCalRes: [],
    };
    this.changeData = this.changeData.bind(this);
  }

  changeData() {
    console.log('PRIYANKA UPDATE SCREEN');
    getItem(Strings.KEY_USER_DATA)
      .then(value => {
        if (value) {
          this.setState({
            userId: value._id,
          });
          let postData = {
            id: value._id,
            date: moment(today).format('YYYY-MM-DD'),
          };
          this.props.getFoodByDate(postData);
        }
      }).catch(error => {
        // alert(JSON.stringify(error));
      });
    //alert('hjghjbbjjjk')
  }

  componentDidMount() {

    console.log('date >>', moment(today).format('YYYY-MM-DD'));
    console.log('name HOME SCREEN >>', this.props.route.name);
    getItem(Strings.KEY_USER_DATA)
      .then(value => {
        if (value) {
          this.setState({
            userId: value._id,
          });
          let postData = {
            id: value._id,
            date: moment(today).format('YYYY-MM-DD'),
          };
          this.props.getFoodByDate(postData);
        }
      }).catch(error => {
        // alert(JSON.stringify(error));
      });
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    console.log('Home screen getFoodByDateRes >>', JSON.stringify(nextProps.HomeReducer.getFoodByDateRes));
    console.log('Home screen DELETE_FOOD >>', JSON.stringify(nextProps.HomeReducer.statusCodeDeleteFood));
    console.log('Home screen getDeleteFoodRes >>', nextProps.HomeReducer.getDeleteFoodRes);

    if (nextProps.HomeReducer.getDeleteFoodRes !== prevState.getDeleteFoodRes) {
      return {
        getDeleteFoodRes: nextProps.HomeReducer.getDeleteFoodRes,
      };
    }


    if (nextProps.AuthReducer.recommededCalRes !== prevState.recommededCalRes) {
      let data = nextProps.AuthReducer.recommededCalRes;
      if (data !== undefined) {
        return {
          recommededCalRes: nextProps.AuthReducer.recommededCalRes,
          recBreakfast: data.rec_breakfast_cal,
          recLunch: data.rec_lunch_cal,
          recSnack: data.rec_snack_cal,
          recDinner: data.rec_dinner_cal,
        };
      }
    }

    console.log('nextProps.HomeReducer.getFoodByDateRes', nextProps.HomeReducer.getFoodByDateRes);
    console.log('prevState.getFoodByDateRes', prevState.mealArray);
    if (nextProps.HomeReducer.getFoodByDateRes !== prevState.mealArray) {
      console.log('prevState does not match!!!');
      breakfastArray = [];
      lunchArray = [];
      snacksArray = [];
      dinnerArray = [];
      totalCalBreakfast = 0;
      totalCalLunch = 0;
      totalCalsnacks = 0;
      totalCalDinner = 0;

      let mealArray = nextProps.HomeReducer.getFoodByDateRes;
      // if (mealArray !== undefined) {

      //   mealArray.forEach(element => {
      //     if (element.meal_type !== null && element.meal_type !== undefined) {
      //       if (element.meal_type === 0) {
      //         breakfastArray.push(element);
      //         totalCalBreakfast += parseFloat(element.cal);
      //         console.log(totalCalBreakfast, 'total cal breakfast');
      //       }
      //       if (element.meal_type === 1) {
      //         lunchArray.push(element);
      //         totalCalLunch += parseFloat(element.cal);
      //         console.log(totalCalLunch, 'total cal lunch');
      //       }
      //       if (element.meal_type === 2) {
      //         snacksArray.push(element);
      //         totalCalsnacks += parseFloat(element.cal);
      //         console.log(totalCalsnacks, 'total cal snacks');
      //       }
      //       if (element.meal_type === 3) {
      //         dinnerArray.push(element);
      //         totalCalDinner += parseFloat(element.cal);
      //         console.log(totalCalDinner, 'total cal Dinner');
      //       }
      //     }
      //   });
      // }
      return {
        mealArray: mealArray,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {

    console.log(' CDM prevProps >>', prevProps);

    if (this.props.HomeReducer.getDeleteFoodRes !== prevProps.HomeReducer.getDeleteFoodRes) {
      if (this.props.HomeReducer.statusCodeDeleteFood === Strings.HTTP_STATUS_CODE_OK) {
        this._toogleList();
      }
    }


    this.props.navigation.addListener("willFocus", () => {
      console.log('aaaaaaa')
      alert('aaaaaaa')
    });


    if (this.props.HomeReducer.getFoodByDateRes !== prevProps.HomeReducer.getFoodByDateRes) {
      console.log('Prev and props are same');
      if (
        this.props.HomeReducer.statusCodeFoodDate === Strings.HTTP_STATUS_CODE_OK
      ) {
        // this.clearState();
      }
      // this.props.clearFoodTypeReducer();
    }
  }

  clearState() {
    this.setState({
      breakfastArray: [],
      lunchArray: [],
      snacksArray: [],
      dinnerArray: [],
    });
  }


  waterListUI = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => this.goToNext()}
        style={{ margin: 3, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ width: 25, height: 40 }}
          source={require('../../Assets/water_empty.png')}
        />
      </TouchableOpacity>
    );
  }

  getFoodImage(item) {
    switch (item) {
      case 'BREAKFAST':
        return require('../../Assets/breakfast_bg.png');

      case 'LUNCH':
        return require('../../Assets/lunch_bg.png');

      case 'SNACKS':
        return require('../../Assets/snack_bg.png');

      case 'DINNER':
        return require('../../Assets/dinner_bg.png');
    }
  }

  _deleteFood(id) {
    let postData = {
      foodId: id,
    };
    this.props.deleteFood(postData);
  }

  addedFoodUI = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ borderRadius: 30, borderWidth: 1, width: 40, height: 40, borderColor: Colors.blue_400, backgroundColor: Colors.blue_400, alignItem: 'center', justifyContent: 'center' }}>
            <Text style={{ color: Colors.WHITE_COLOR, fontSize: 16, textAlign: 'center' }}>d</Text>
          </View>
          <View style={{ marginLeft: 5 }}>
            <Text style={{ textAlign: 'left' }}>{item.food_name}</Text>
            <Text style={{ color: Colors.TEXT_COLOR, paddingTop: 3, textAlign: 'left' }}>{item.cal} Cal {item.servings} serving</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this._deleteFood(item._id)}>
          <AntDesignIcon name="delete" size={24} />
        </TouchableOpacity>

      </TouchableOpacity>
    );
  }

  _toogleList() {
    this.setState({
      refresh: !this.state.refresh,
    });
  }
  dietFoodListUI = ({ item, index }) => {

    var icon = this.getFoodImage(item.name);
    const { navigate } = this.props.navigation;

    return (
      <View style={{ margin: 10, paddingLeft: 10, paddingRight: 20 }}>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem(Strings.MEAL_TYPE, JSON.stringify(item.name));
            navigate('MealCategoryScreen', { name: item.name });
          }
          }
          style={{
            alignItems: 'center', justifyContent: 'center',
          }}>
          <ImageBackground
            source={icon}
            imageStyle={{
              // borderWidth: 0.9,
              borderRadius: 10,
              borderColor: 'transparent'
            }}
            style={{
              opacity: 0.5,
              height: 150, width: wp(90),
              alignItems: 'center', justifyContent: 'center',
            }} />
          {/*   food_bg: '#80000000', */}
          <View style={{
            position: 'absolute', backgroundColor: 'rgba(52, 52, 52, 0.5)', height: 150, width: wp(90),
            alignItem: 'center', justifyContent: 'center', borderWidth: 0.5,
            borderRadius: 10, borderColor: 'transparent'
          }}>
            {item.name === Strings.BREAKFAST ?
              <View style={HomeScreenStyle.foodItemView}>
                <Text style={HomeScreenStyle.foodTypeText}>B</Text>
                <Text style={HomeScreenStyle.recommededText}>REAKFAST</Text>
              </View>
              : null
            }
            {item.name === Strings.LUNCH ?
              <View style={HomeScreenStyle.foodItemView}>
                <Text style={HomeScreenStyle.foodTypeText}>L</Text>
                <Text style={HomeScreenStyle.recommededText}>UNCH</Text>
              </View>
              : null
            }
            {item.name === Strings.SNACKS ?
              <View style={HomeScreenStyle.foodItemView}>
                <Text style={HomeScreenStyle.foodTypeText}>S</Text>
                <Text style={HomeScreenStyle.recommededText}>NACKS</Text>
              </View>
              : null
            }
            {item.name === Strings.DINNER ?
              <View style={HomeScreenStyle.foodItemView}>
                <Text style={HomeScreenStyle.foodTypeText}>D</Text>
                <Text style={HomeScreenStyle.recommededText}>INNER</Text>
              </View>
              : null
            }
            {item.name === Strings.BREAKFAST ?
              <Text style={{ fontSize: 18, color: Colors.WHITE_COLOR, textAlign: 'center' }}>Recommeded {this.state.recBreakfast} Calories</Text>
              : null}

            {item.name === Strings.LUNCH ?
              <Text style={{ fontSize: 18, color: Colors.WHITE_COLOR, textAlign: 'center' }}>Recommeded {this.state.recLunch} Calories</Text>
              : null}

            {item.name === Strings.SNACKS ?
              <Text style={{ fontSize: 18, color: Colors.WHITE_COLOR, textAlign: 'center' }}>Recommeded {this.state.recSnack} Calories</Text>
              : null}

            {item.name === Strings.DINNER ?
              <Text style={{ fontSize: 18, color: Colors.WHITE_COLOR, textAlign: 'center' }}>Recommeded {this.state.recDinner} Calories</Text>
              : null}
          </View>

        </TouchableOpacity>

        <View style={{
          borderTopLeftRadius: 10, borderTopRightRadius: 10, borderTopWidth: 0.5, borderLeftWidth: 0.5, borderRightWidth: 0.5,
          borderColor: Colors.blue_400, marginTop: 5,
        }}>
          {item.name === Strings.BREAKFAST ?
            <FlatList
              bounces={false}
              data={breakfastArray}
              renderItem={this.addedFoodUI}
            // extraData={this.state.refresh}
            />
            : null}
          {item.name === Strings.LUNCH ?
            <FlatList
              bounces={false}
              data={lunchArray}
              renderItem={this.addedFoodUI}
            // extraData={this.state.refresh}
            />
            : null}
          {item.name === Strings.SNACKS ?
            <FlatList
              bounces={false}
              data={snacksArray}
              renderItem={this.addedFoodUI}
              extraData={this.state.refresh}
            />
            : null}
          {item.name === Strings.DINNER ?
            <FlatList
              bounces={false}
              data={dinnerArray}
              renderItem={this.addedFoodUI}
              extraData={this.state.refresh}
            />
            : null}
        </View>
        <View style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 0.5, borderColor: Colors.blue_400 }}>
          {item.name === Strings.BREAKFAST ?
            <Text style={{ fontSize: 18, color: Colors.TEXT_COLOR, padding: 10 }}>{totalCalBreakfast} CAL</Text>
            : null}
          {item.name === Strings.LUNCH ?
            <Text style={{ fontSize: 18, color: Colors.TEXT_COLOR, padding: 10 }}>{totalCalLunch} CAL</Text>
            : null}
          {item.name === Strings.SNACKS ?
            <Text style={{ fontSize: 18, color: Colors.TEXT_COLOR, padding: 10 }}>{totalCalsnacks} CAL</Text>
            : null}
          {item.name === Strings.DINNER ?
            <Text style={{ fontSize: 18, color: Colors.TEXT_COLOR, padding: 10 }}>{totalCalDinner} CAL</Text>
            : null}
        </View>

      </View>
    );
  }

  _onPrevDate() {
    this.setState({ dayCount: this.state.dayCount - 1 });
    dayCount = dayCount - 1;
    let selectedDate = moment(today).add(dayCount, 'day').format('YYYY-MM-DD');
    console.log('PRIYANKA DATE', selectedDate);
    let postData = {
      id: this.state.userId,
      date: selectedDate,
    };
    this.props.getFoodByDate(postData);
  }

  _onNextDate() {
    this.setState({ dayCount: this.state.dayCount + 1 });
    dayCount = dayCount + 1;
    let selectedDate = moment(today).add(dayCount, 'day').format('YYYY-MM-DD');
    console.log('PRIYANKA DATE NEXT', selectedDate);
    let postData = {
      id: this.state.userId,
      date: selectedDate,
    };
    this.props.getFoodByDate(postData);
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={{ backgroundColor: Colors.colorPrimaryDark }}
          forceInset={{ top: 'never' }}
        />
        <SafeAreaView
          style={HomeScreenStyle.mainStyle}
          forceInset={{ top: 'never' }}>

          {/* <NavigationEvents
            onDidFocus={() => alert('Refreshed')}
          /> */}

          <ScrollView style={{ flex: 1 }} bounces={false}>
            <View style={{ flex: 1, backgroundColor: Colors.colorPrimaryMiddle }} >

              <View style={HomeScreenStyle.viewFirstPart}>
                <TouchableOpacity
                  style={{ alignItems: 'center', margin: 10, paddingRight: 20 }}>
                  <Image
                    style={{ width: wp(18), height: wp(18) }}
                    source={require('../../Assets/heart.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <View style={HomeScreenStyle.stepsStyle}>
                  <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity>
                      <Text style={HomeScreenStyle.textStyle}>117</Text>
                      <Text style={HomeScreenStyle.textStyle}>STEPS</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 20 }}>
                      <Text style={HomeScreenStyle.textStyle}>117</Text>
                      <Text style={HomeScreenStyle.textStyle}>EATEN</Text>
                    </View>

                  </View>

                  <TouchableOpacity style={HomeScreenStyle.circleCalStyle}>
                    <View style={{ paddingBottom: 3 }}>
                      <Text style={HomeScreenStyle.textStyleTargetCal}>1276</Text>
                      <Text style={HomeScreenStyle.textStyle}>TARGET CAL</Text>
                      <View style={{ width: 100, height: 2, backgroundColor: Colors.colorPrimary, margin: 7 }} />
                      <Text style={HomeScreenStyle.textStyleTargetCal}>1117</Text>
                      <Text style={HomeScreenStyle.textStyle}>CAL LEFT</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity>
                      <Text style={HomeScreenStyle.textStyle}>117</Text>
                      <Text style={HomeScreenStyle.textStyle}>SLEEP</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 20 }}>
                      <Text style={HomeScreenStyle.textStyle}>117</Text>
                      <Text style={HomeScreenStyle.textStyle}>BURNED</Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                  <View>
                    <Text style={HomeScreenStyle.textStyle}>CARBS</Text>
                    <View style={{ width: 70, height: 2, backgroundColor: Colors.colorPrimary, margin: 3 }} />
                    <Text style={HomeScreenStyle.textStyle}>418.0g left</Text>
                  </View>

                  <View>
                    <Text style={HomeScreenStyle.textStyle}>PROTEIN</Text>
                    <View style={{ width: 70, height: 2, backgroundColor: Colors.colorPrimary, margin: 3 }} />
                    <Text style={HomeScreenStyle.textStyle}>93.0g left</Text>
                  </View>
                  <View>
                    <Text style={HomeScreenStyle.textStyle}>FAT</Text>
                    <View style={{ width: 70, height: 2, backgroundColor: Colors.colorPrimary, margin: 3 }} />
                    <Text style={HomeScreenStyle.textStyle}>138.25g left</Text>
                  </View>
                </View>

                <TouchableOpacity style={{ marginTop: 10, marginBottom: 10 }}>
                  <Text style={{ margin: 10, fontSize: 16, color: Colors.colorAccent, textAlign: 'center' }}>DIET DETAILS</Text>
                </TouchableOpacity>

              </View>

              <View style={{ flex: 0.5, backgroundColor: Colors.WHITE_COLOR, alignItems: 'center' }}>
                {/* Calendar View */}
                <View style={{
                  width: wp(100), height: 40, flexDirection: 'row', backgroundColor: Colors.gray,
                  alignItems: 'center', justifyContent: 'space-between'
                }}>
                  <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => this._onPrevDate()
                    }>
                    <AntDesignIcon name="left" size={24} color={Colors.text_gray} />
                  </TouchableOpacity>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="md-calendar" size={20} color={Colors.text_gray} />
                    <Text style={{ paddingLeft: 10, fontSize: 16 }}>{moment(today).add(this.state.dayCount, 'day').format('dddd DD MMM')} </Text>
                  </View>

                  <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onPress={() => this._onNextDate()}>
                    <AntDesignIcon name="right" size={24} color={Colors.text_gray} />
                  </TouchableOpacity>
                </View>

                {/* Water design  */}
                <View>
                  <View style={{
                    height: 130, backgroundColor: Colors.WHITE_COLOR, marginTop: 20,
                    borderTopLeftRadius: 10, borderTopRightRadius: 10,
                    borderWidth: 1,
                    borderColor: Colors.outline_light,
                  }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
                      <Text style={HomeScreenStyle.textStyleBlack}>Water</Text>
                      <Text style={HomeScreenStyle.textStyleBlack}>16 OZ</Text>
                    </View>
                    <View style={{ height: 1, width: wp(90), backgroundColor: Colors.outline_light }} />

                    <View style={{ alignItems: 'center', margin: 10, justifyContent: 'center' }}>
                      <FlatList
                        bounces={false}
                        data={this.state.waterList}
                        renderItem={this.waterListUI}
                        horizontal={true}
                      />
                    </View>

                  </View>

                  <ImageBackground
                    source={require('../../Assets/water_bg.png')}
                    imageStyle={{
                      borderWidth: 1,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                    style={{
                      height: 120,
                      // marginLeft: 10, marginRight: 10,
                      alignItems: 'center',
                      blurRadius: 10,
                      opacity: 0.3,
                    }} />
                </View>
                <View style={{ marginTop: -100, alignContent: 'center', justifyContent: 'center', marginLeft: 20, marginRight: 20 }}>
                  <Text style={{ fontSize: 22, color: Colors.black, textAlign: 'center', justifyContent: 'center' }}>INSIGHT OF THE DAY</Text>
                  <Text style={{ fontSize: 17, textAlign: 'center', color: Colors.black, marginTop: 10 }}>
                    A Glass or two of water before dinner {'\n'} will make it easier for you to control your {'\n'} portion sizes.</Text>
                </View>

                <View style={{ alignItems: 'center', marginTop: 10 }}>
                  <FlatList
                    bounces={false}
                    data={this.state.dietFoodList}
                    renderItem={this.dietFoodListUI}
                  // style={{ width: wp(90) }}
                  />
                </View>

              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    AuthReducer: state.AuthReducer,
    HomeReducer: state.HomeReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getFoodByDate,
      deleteFood,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(HomeScreen));