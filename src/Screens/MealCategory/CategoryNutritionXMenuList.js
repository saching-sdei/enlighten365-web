/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { Strings, Colors } from '../../Constants';
// eslint-disable-next-line prettier/prettier
import { TextInput, Header, CustomLoader, TextInputComponent } from '../../Components';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from '@react-navigation/compat';
import { useNavigationParam } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MealCategoryStyle from './MealCategoryStyle';

import { getFoodListNutrition, clearFoodTypeReducer } from '../../Actions/ActionCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CategoryNutritionXMenuList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      foodItemList: [],
    };
  }

  componentDidMount() {
    // console.log('name first comp', this.props.route.params.name);
    this.setState({ isLoading: true });
    //  this.getFoodListApiCall();
    let postData = {
      query: this.props.route.params.categoryName,
    };
    this.props.getFoodListNutrition(postData);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.FoodTypeReducer.foodListRes !== prevState.foodListRes) {
      // console.log(' PRIYANKA nextProps --', JSON.stringify(nextProps.FoodTypeReducer.foodListRes));
      return {
        foodItemList: nextProps.FoodTypeReducer.foodListRes,
        isLoading: false,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.FoodTypeReducer.foodListRes !== prevProps.FoodTypeReducer.foodListRes) {
      if (
        this.props.FoodTypeReducer.statusCodefoodList !== Strings.HTTP_STATUS_CODE_OK
      ) {
        this.clearState();
        // this.props.clearFoodTypeReducer();
      }
      // this.clearState();
    }
  }

  clearState() {
    this.setState({
      servingValue: '',
      foodDetailRes: '',
    });
  }

  goBack() {
    this.props.navigation.goBack();
  }

  categoriesUI = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={{ margin: 10 }}
          onPress={() => {
            this.props.navigation.navigate('FoodDetailScreen', { 'foodName': item.food_name });
            // this.props.clearFoodTypeReducer();
          }}>
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
              // this.props.route.params.
              middleComponent={this.props.route.params.categoryName} />
          </View>

          <View style={{ flex: 0.9 }}>
            <FlatList
              bounces={false}
              data={this.state.foodItemList}
              renderItem={this.categoriesUI}
            />
          </View>
          {<CustomLoader isLoading={this.state.isLoading} />}
        </SafeAreaView>
      </Fragment>
    );
  }
}

// export default withNavigation(CategoryNutritionXMenuList);

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
)(withNavigation(CategoryNutritionXMenuList));
