/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import {
  View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput, Image,
  ImageBackground, ScrollView, Animated, Dimensions, StyleSheet,
} from 'react-native';
import { Strings, Colors } from '../../Constants';
// eslint-disable-next-line prettier/prettier
import { Header, CustomLoader, TextInputComponent } from '../../Components';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from '@react-navigation/compat';
import { useNavigationParam } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MealCategoryStyle from './MealCategoryStyle';
import Pie from 'react-native-pie';
import {
  getFoodDetailsNutrition, clearFoodTypeReducer,
  updateServingValue, saveNutritionFood,
} from '../../Actions/ActionCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getItem } from '../../Utils/AsyncUtils';
const scroll = React.createRef();


class FoodDetailScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      mealType: '',
      foodDetailData: '',
      carbs_percentage: 0,
      protein_percentage: 0,
      fat_percentage: 0,
      carbs_pie_value: 0,
      protein_pie_value: 0,
      fat_pie_value: 0,
      image_path: '',

      food_name: '',
      servingValue: 0,
      servings: 0,
      cal: 0,
      updatedCal: '',
      // food_rating: data.nf_calories,
      protein: 0,
      getProtein: 0,
      carbs: 0,
      getCarbs: 0,
      sugar: 0,
      getSugar: 0,
      fat: 0,
      getFat: 0,
      saturated_fat: 0,
      getSaturated_fat: 0,
      unsaturated_fat: 0,
      getUnsaturated_fat: 0,
      cholesterol: 0,
      getCholesterol: 0,
      sodium: 0,
      getSodium: 0,
      potassium: 0,
      getPotassium: 0,
      brand_name: 'abcd',
      serving_unit: 0,

      serving_weight_grams: 0,
      food_rating: 0,
    };
  }

  handleScrollTo = () => {
    this.container.scrollTo = 10;
  };

  componentDidMount() {
    // console.log('name first comp', this.props.route.params.name);
    // this.getFoodListApiCall();
    getItem(Strings.KEY_USER_DATA)
      .then(value => {
        if (value) {
          this.setState({
            userId: value._id,
          });
        }
      })
      .catch(error => {
      });

    getItem(Strings.MEAL_TYPE)
      .then(value => {
        if (value) {
          this.setState({
            mealType: value,
          });
        }
      })
      .catch(error => {
      });

    let postData = {
      query: this.props.route.params.foodName,
      timezone: 'US/Eastern',
    };
    this.props.getFoodDetailsNutrition(postData);
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    console.log('statusCodeSaveFood >>', nextProps.FoodTypeReducer.statusCodeSaveFood);
    if (nextProps.FoodTypeReducer.statusCodeSaveFood === undefined) {
      if (nextProps.FoodTypeReducer.statusCodeSaveFood === Strings.HTTP_STATUS_CODE_OK) {
        // alert("Save successfully")
        this.props.navigation.push('HomeScreen', {
          doChange:
            this.changeData,
        });
        // this.props.clearFoodTypeReducer();
      }
    }

    // console.log(' << @@@@@ nextProps.FoodTypeReducer.foodDetailRes @@@@@@@@>>', nextProps.FoodTypeReducer.foodDetailRes);
    if (nextProps.FoodTypeReducer.foodDetailRes !== prevState.foodDetailData) {
      let data = nextProps.FoodTypeReducer.foodDetailRes;
      // console.log(' << @@@@@nextstate data >>', data);
      if (nextProps.FoodTypeReducer.statusCodeSaveFood === Strings.HTTP_STATUS_CODE_OK) {
        if (data !== undefined && data !== '') {
          let servingData = data.serving_qty;
          let carbs_value1 = parseInt(((data.nf_total_carbohydrate * servingData / 300) * 100) + 0.5);
          let carbs_value2 = 100 - carbs_value1;

          let protine_value1 = parseInt(((data.nf_protein * servingData / 60) * 100) + 0.5);
          let protine_value2 = 100 - protine_value1;

          let fat_value1 = parseInt(((data.nf_total_fat * servingData / 65) * 100) + 0.5);
          let fat_value2 = 100 - fat_value1;

          console.log('GET_DERIVE_carbs_value1', carbs_value1, ' = ', carbs_value2);
          console.log('GET_DERIVE_protine_value1', protine_value1, ' = ', protine_value2);
          console.log('GET_DERIVE_fat_value1', fat_value1, ' = ', fat_value2);

          return {
            isLoading: false,
            foodDetailData: data,

            carbs_percentage: carbs_value1,
            protein_percentage: protine_value1,
            fat_percentage: fat_value1,
            carbs_pie_value: carbs_value2,
            protein_pie_value: protine_value2,
            fat_pie_value: fat_value2,

            servingValue: data.serving_qty,
            food_name: data.food_name,
            servings: data.serving_qty,
            cal: data.nf_calories,
            updatedCal: data.nf_calories,
            // food_rating: data.nf_calories,
            protein: data.nf_protein,
            getProtein: data.nf_protein,
            carbs: data.nf_total_carbohydrate,
            getCarbs: data.nf_total_carbohydrate,
            sugar: data.nf_sugars,
            getSugar: data.nf_sugars,
            fat: data.nf_total_fat,
            getFat: data.nf_total_fat,
            saturated_fat: data.nf_saturated_fat,
            getSaturated_fat: data.nf_saturated_fat,
            unsaturated_fat: data.nf_dietary_fiber,
            getUnsaturated_fat: data.nf_dietary_fiber,
            cholesterol: data.nf_cholesterol,
            getCholesterol: data.nf_cholesterol,
            sodium: data.nf_sodium,
            getSodium: data.nf_sodium,
            potassium: data.nf_potassium,
            getPotassium: data.nf_potassium,
            brand_name: data.brand_name != null ? data.brand_name : 'abc',
            serving_unit: data.serving_unit,
            image_path: nextProps.FoodTypeReducer.foodImage !== undefined ? nextProps.FoodTypeReducer.foodImage.thumb : null,
          };
        }
      }
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {


    if (this.props.FoodTypeReducer.statusCodeSaveFood === Strings.HTTP_STATUS_CODE_OK) {
      console.log('CDM statusCodeSaveFood', this.props.FoodTypeReducer.statusCodeSaveFood);
      this.props.clearFoodTypeReducer();
      this.props.navigation.navigate('HomeScreen');
    }

    // this.props.updateServingValue(5);
    if (this.props.FoodTypeReducer.foodDetailRes !== prevProps.FoodTypeReducer.foodDetailRes) {
      console.log('Prev and props are same');
      if (
        this.props.FoodTypeReducer.statusCodeFoodType === Strings.HTTP_STATUS_CODE_OK
      ) {
        // this.clearState();
      }
      // this.props.clearFoodTypeReducer();
    }
  }

  clearState() {
    this.setSt0ate({
      foodDetailData: '',
      servingValue: 0,
      food_name: '',
      servings: '',
      cal: '',
      // food_rating: data.nf_calories,
      protein: '',
      carbs: '',
      sugar: '',
      fat: '',
      saturated_fat: '',
      unsaturated_fat: '',
      cholesterol: '',
      sodium: '',
      potassium: '',
      brand_name: '',
      serving_unit: '',
      image_path: '',
    });
  }

  goBack() {
    this.props.navigation.goBack();
    // this.props.navigation.push('HomeScreen', {
    //   doChange:
    //     this.changeData,
    // });
  }

  onServingChange(text) {
    this.setState({ servingValue: text });
  }

  _start = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  goToTop() {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  }

  setData(servingData) {
    let updatedCal = this.getRoundOffDouble(parseFloat(this.state.cal) * parseFloat(servingData));
    let updatedProtine = this.getRoundOffDouble(parseFloat(this.state.getProtein) * parseFloat(servingData));
    let updatedCarbs = this.getRoundOffDouble(parseFloat(this.state.getCarbs) * parseFloat(servingData));
    let updatedSugar = this.getRoundOffDouble(parseFloat(this.state.getSugar) * parseFloat(servingData));
    let updatedFat = this.getRoundOffDouble(parseFloat(this.state.getFat * parseFloat(servingData)));
    let updatedSaturatedFat = this.getRoundOffDouble(parseFloat(this.state.getSaturated_fat) * parseFloat(servingData));
    let updatedUnSaturatedFat = this.getRoundOffDouble(parseFloat(this.state.getUnsaturated_fat) * parseFloat(servingData));
    let updatedCholestrol = this.getRoundOffDouble(parseFloat(this.state.getCholesterol) * parseFloat(servingData));
    let updatedSodium = this.getRoundOffDouble(parseFloat(this.state.getSodium) * parseFloat(servingData));
    let updatedPotassium = this.getRoundOffDouble(parseFloat(this.state.getPotassium) * parseFloat(servingData));


    let carbs_value1 = parseInt(((this.state.getCarbs * servingData / 300) * 100) + 0.5);
    let carbs_value2 = 100 - carbs_value1;

    let protine_value1 = parseInt(((this.state.getProtein * servingData / 60) * 100) + 0.5);
    let protine_value2 = 100 - protine_value1;

    let fat_value1 = parseInt(((this.state.getFat * servingData / 65) * 100) + 0.5);
    let fat_value2 = 100 - fat_value1;

    console.log('carbs_value1', carbs_value1, ' = ', carbs_value2);
    console.log('protine_value1', protine_value1, ' = ', protine_value2);
    console.log('fat_value1', fat_value1, ' = ', fat_value2);

    this.setState({
      updatedCal: updatedCal,
      sugar: updatedSugar,
      carbs: updatedCarbs,
      fat: updatedFat,
      saturated_fat: updatedSaturatedFat,
      unsaturated_fat: updatedUnSaturatedFat,
      cholesterol: updatedCholestrol,
      sodium: updatedSodium,
      protein: updatedProtine,
      potassium: updatedPotassium,

      carbs_percentage: carbs_value1,
      protein_percentage: protine_value1,
      fat_percentage: fat_value1,
      carbs_pie_value: carbs_value2,
      protein_pie_value: protine_value2,
      fat_pie_value: fat_value2,
    });
  }

  getRoundOffDouble(a) {
    if (a != null && a !== '') { return Math.round(parseFloat(a) * 100.0) / 100.0; }
    else {
      return 0;
    }
  }

  onServingArrowUp() {
    this.setState({ servingValue: parseFloat(this.state.servingValue) + 0.5 });
    let servingData = this.state.servingValue + 0.5;
    this.setData(servingData);
  }

  onServingArrowDown() {
    if (this.state.servingValue !== 0.5) {
      this.setState({ servingValue: parseFloat(this.state.servingValue) - 0.5 });
      let servingData = this.state.servingValue - 0.5;
      this.setData(servingData);
    }
  }

  onSaveClick() {
    console.log('mealType >> ', this.state.mealType);
    let mealValue;
    if (this.state.mealType === Strings.BREAKFAST) {
      mealValue = 0;
    } else if (this.state.mealType === Strings.LUNCH) {
      mealValue = 1;
    } if (this.state.mealType === Strings.SNACKS) {
      mealValue = 2;
    } if (this.state.mealType === Strings.DINNER) {
      mealValue = 3;
    }

    let postData = {
      userId: this.state.userId,
      meal_type: mealValue,
      food_name: this.props.route.params.foodName,
      brand_name: this.state.brand_name,
      servings: this.state.servingValue,
      serving_unit: this.state.serving_unit,
      serving_weight_grams: this.state.serving_weight_grams,
      fat_percentage: this.state.fat_percentage,
      saturated_fat: this.state.saturated_fat,
      cholesterol: this.state.cholesterol,
      sodium: this.state.sodium,
      sugars: this.state.sugar,
      protein_percentage: this.state.protein_percentage,
      potassium: this.state.potassium,
      cal: this.state.updatedCal,
      food_rating: this.state.food_rating,
      carbs_percentage: this.state.carbs_percentage,
      protein: this.state.protein,
      carbs: this.state.carbs,
      fat: this.state.fat,
      unsaturated_fat: this.state.unsaturated_fat,
      image: this.state.image_path,
    };
    console.log('postData >> ', JSON.stringify(postData));
    this.props.saveNutritionFood(postData);
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

          <ScrollView
            bounces={false}
            style={styles.homeStyles}
            // ref='scrollview'
            ref={(view) => {
              this.scrollView = view;
            }}
          >
            <View style={{ flex: 0.1, backgroundColor: Colors.blue_400 }}>
              <TouchableOpacity onPress={() => this.goBack()}
                style={{ margin: 10 }}>
                <Icon name="ios-arrow-back" size={32} color={Colors.WHITE_COLOR} />
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: Colors.blue_400, justifyContent: 'flex-end', height: hp(10) }}>
              <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 10 }} >
                <Text
                  style={{ fontSize: 18, color: Colors.WHITE_COLOR, textAlign: 'center', paddingLeft: 10, fontWeight: 'bold' }}>
                  {this.props.route.params.foodName}</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => this.onSaveClick()}
                style={MealCategoryStyle.CircleSaveBtn}>
                <Icon name={'md-checkmark'} size={32} color="#FFF" />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 0.8, backgroundColor: Colors.WHITE_COLOR }}>
              {/* Servings UI */}
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Text style={{ fontSize: 14, color: Colors.TEXT_COLOR }}>{Strings.SERVINGS}</Text>
                  <View style={{ backgroundColor: Colors.TEXT_COLOR, height: hp(0.1), marginTop: 10, width: wp(30) }} />
                </View>

                <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
                  <TextInput
                    style={MealCategoryStyle.textInputBoxStyle1}
                    placeholder={'1'}
                    placeholderTextColor={Colors.TEXT_COLOR}
                    underlineColorAndroid="transparent"
                    returnKeyType="done"
                    onChangeText={this.onServingChange.bind(this)}
                    // value={this.props.FoodTypeReducer.updatedServingValue.toString()}
                    value={this.state.servingValue.toString()}
                    autoCorrect={false}
                  />
                </View>

                <View style={{ flex: 0.2, alignItems: 'center' }}>
                  <TouchableOpacity style={{ margin: 3 }}
                    onPress={() => this.onServingArrowUp()}>
                    <Image
                      style={{ width: wp(4.5), height: hp(1.5), opacity: 0.7 }}
                      source={require('../../Assets/caret_arrow_up.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ margin: 3 }}
                    onPress={() => this.onServingArrowDown()}>
                    <Image
                      style={{ width: wp(4.5), height: hp(1.5), opacity: 0.7 }}
                      source={require('../../Assets/sort_down.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* Servings UI END */}

              <View style={{ margin: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={MealCategoryStyle.CircleViewStyle}>
                    <Text style={{ color: Colors.WHITE_COLOR, fontSize: 18, fontWeight: '500' }}>A</Text>
                  </View>
                  <Text style={{ color: Colors.TEXT_COLOR, fontSize: 18, fontWeight: '500' }}>{this.state.updatedCal}</Text>
                  <Text style={{ color: Colors.TEXT_COLOR, fontSize: 14, marginLeft: 10 }}>CAL</Text>
                </View>

                <Image
                  style={{ marginLeft: 20, marginTop: 5, height: hp(2.5), width: wp(6.5) }}
                  source={require('../../Assets/green_arrow.png')}
                />

                <View style={MealCategoryStyle.backgroundStyle}>
                  <View style={{ flex: 0.8, justifyContent: 'center', marginLeft: 10, alignItems: 'flex-start' }}>
                    <Text style={{ color: Colors.WHITE_COLOR, fontSize: 18, fontWeight: '500' }}>Food Rating</Text>
                    <Text style={{ color: Colors.WHITE_COLOR, fontSize: 14, textAlign: 'left', marginTop: 3 }}>Do you want to know what was good and bad about this food?</Text>
                    {/* VIEW BUTTON CLICK */}
                    <TouchableOpacity
                      onPress={() => this.scrollView.scrollToEnd({ animated: true })}
                      style={{
                        backgroundColor: Colors.WHITE_COLOR, width: wp(20),
                        alignItems: 'center', marginTop: 10, borderRadius: 10,
                      }}>
                      <Text style={{ padding: 5, color: Colors.colorPrimaryDark }}>VIEW</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 0.2, justifyContent: 'center' }}>
                    <Image
                      style={{ marginTop: 5, height: wp(15), width: wp(15) }}
                      // source={require('../../Assets/breakfast.png')}
                      source={{ uri: this.state.image_path }}
                    />
                  </View>
                </View>
                {/* NUTRITION INFO */}
                <View>
                  <View style={{ padding: 10 }}>
                    <Text style={{ color: Colors.outline, fontSize: 16 }}>NUTRITION INFORMATION</Text>
                    <Text style={{ color: Colors.dark, fontSize: 12, marginTop: 5 }}>Verified by Smart 365 life</Text>
                  </View>
                  <View style={MealCategoryStyle.lineViewBlue} />

                  <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                      <Pie
                        radius={50}
                        innerRadius={40}
                        sections={[
                          {
                            // percentage: this.state.carbs_pie_value,
                            percentage: this.state.carbs_percentage,
                            color: Colors.pie_carbs,
                          },
                        ]}
                        backgroundColor={Colors.outline_light}
                      />
                      <View style={MealCategoryStyle.gauge}>
                        <Text style={MealCategoryStyle.gaugeText}>{this.state.carbs_percentage}%</Text>
                      </View>
                      <Text style={MealCategoryStyle.textBlueStyle}>{Strings.CARBS}</Text>

                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Pie
                        radius={50}
                        innerRadius={40}
                        sections={[
                          {
                            percentage: this.state.protein_percentage,
                            color: Colors.pie_carbs,
                          },
                        ]}
                        backgroundColor={Colors.outline_light}
                      />
                      <View style={MealCategoryStyle.gauge}>
                        <Text style={MealCategoryStyle.gaugeText}>{this.state.protein_percentage}%</Text>
                      </View>
                      <Text style={MealCategoryStyle.textBlueStyle}>{Strings.PROTEIN}</Text>

                    </View>

                    <View style={{ alignItems: 'center' }}>
                      <Pie
                        radius={50}
                        innerRadius={40}
                        sections={[
                          {
                            percentage: this.state.fat_percentage,
                            color: Colors.pie_carbs,
                          },
                        ]}
                        backgroundColor={Colors.outline_light}
                      />
                      <View style={MealCategoryStyle.gauge}>
                        <Text style={MealCategoryStyle.gaugeText}>{this.state.fat_percentage}%</Text>
                      </View>
                      <Text style={MealCategoryStyle.textBlueStyle}>{Strings.FAT}</Text>
                    </View>
                  </View>

                  <View style={MealCategoryStyle.borderOutlineStyle}>
                    <View style={MealCategoryStyle.borderFillStyle}>
                      <Text style={{ color: Colors.outline, fontWeight: 'bold' }}>{Strings.PROTEIN}</Text>
                      <Text style={{ color: Colors.outline, fontWeight: 'bold' }}>{this.state.protein}</Text>
                    </View>
                  </View>

                  <View style={MealCategoryStyle.borderOutlineStyle}>
                    <View style={MealCategoryStyle.borderFillStyle}>
                      <Text style={{ color: Colors.outline, fontWeight: 'bold' }}>{Strings.CARBS}</Text>
                      <Text style={{ color: Colors.outline, fontWeight: 'bold' }}>{this.state.carbs}</Text>
                    </View>
                    <View style={MealCategoryStyle.rowViewStyle}>
                      <Text style={MealCategoryStyle.textStyle}>{Strings.SUGARS}</Text>
                      <Text style={MealCategoryStyle.textStyle}>{this.state.sugar}</Text>
                    </View>

                  </View>

                  <View style={MealCategoryStyle.borderOutlineStyle}>
                    <View style={MealCategoryStyle.borderFillStyle}>
                      <Text style={{ color: Colors.outline, fontWeight: 'bold' }}>{Strings.FAT}</Text>
                      <Text style={{ color: Colors.outline, fontWeight: 'bold' }}>{this.state.fat}</Text>
                    </View>
                    <View style={{ padding: 0 }}>
                      <View style={MealCategoryStyle.rowViewStyle}>
                        <Text style={MealCategoryStyle.textStyle}>{Strings.SATURATED_FAT}</Text>
                        <Text style={MealCategoryStyle.textStyle}>{this.state.saturated_fat}</Text>
                      </View>
                      <View style={MealCategoryStyle.lineViewGray} />
                      <View style={MealCategoryStyle.rowViewStyle}>
                        <Text style={MealCategoryStyle.textStyle}>{Strings.UNSATURATED_FAT}</Text>
                        <Text style={MealCategoryStyle.textStyle}>{this.state.unsaturated_fat}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={MealCategoryStyle.borderOutlineStyle}>
                    <View style={MealCategoryStyle.rowViewStyle}>
                      <Text style={MealCategoryStyle.textStyle}>{Strings.CHOLESTEROL}</Text>
                      <Text style={MealCategoryStyle.textStyle}>{this.state.cholesterol}</Text>
                    </View>

                    <View style={MealCategoryStyle.lineViewGray} />

                    <View style={MealCategoryStyle.rowViewStyle}>
                      <Text style={MealCategoryStyle.textStyle}>{Strings.SODIUM}</Text>
                      <Text style={MealCategoryStyle.textStyle}>{this.state.sodium}</Text>
                    </View>

                    <View style={MealCategoryStyle.lineViewGray} />

                    <View style={MealCategoryStyle.rowViewStyle}>
                      <Text style={MealCategoryStyle.textStyle}>{Strings.POTASSIUM}</Text>
                      <Text style={MealCategoryStyle.textStyle}>{this.state.potassium}</Text>
                    </View>
                  </View>
                  {/* NUTRITION INFO END */}
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  homeStyles: {
    // overflow: "auto",
    overflow: 'scroll',
    width: wp(100),
    height: hp(100),
    // border: "1px solid #333"
  },
});

function mapStateToProps(state) {
  return {
    FoodTypeReducer: state.FoodTypeReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getFoodDetailsNutrition,
      clearFoodTypeReducer,
      updateServingValue,
      saveNutritionFood,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(FoodDetailScreen));

