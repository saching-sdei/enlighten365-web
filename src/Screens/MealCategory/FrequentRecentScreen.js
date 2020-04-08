/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import {
  View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput, Image,
  ImageBackground, ScrollView, Animated, Dimensions, StyleSheet, Platform,
} from 'react-native';
import { Strings, Colors } from '../../Constants';
// eslint-disable-next-line prettier/prettier
import { Header, CustomLoader, TextInputComponent } from '../../Components';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from '@react-navigation/compat';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useNavigationParam } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MealCategoryStyle from './MealCategoryStyle';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { getRecentFood, getFrequentFood } from '../../Actions/ActionCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getItem } from '../../Utils/AsyncUtils';
const KEYS_TO_FILTERS = ['food_name'];

class FrequentRecentScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      getRecentData: [],
      newFilterList: [],
      searchPlaceholder: 'Search',
      searchText: '',
    };
  }

  componentDidMount() {
    getItem(Strings.KEY_USER_DATA)
      .then(value => {
        if (value) {
          this.setState({
            userId: value._id,
          });
          this.setState({ isLoading: true });
          this.props.getRecentFood(value._id);
        }
      })
      .catch(error => {
      });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('<< getRecentRes >>', nextProps.FoodTypeReducer.getRecentRes);
    if (nextProps.FoodTypeReducer.getRecentRes !== prevState.getRecentData) {
      // this.setState({ isLoading: false });
      return {
        isLoading: false,
        getRecentData: nextProps.FoodTypeReducer.getRecentRes,
        newFilterList: nextProps.FoodTypeReducer.getRecentRes,
      };
    }
    return null;
  }

  goBack() {
    this.props.navigation.goBack();
  }

  recentUI = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={{ margin: 10 }}
          onPress={() => {
            this.props.navigation.navigate('FoodDetailScreen', { 'foodName': item.food_name });
            // this.props.clearFoodTypeReducer();
          }} >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ width: wp(14), height: wp(14), borderRadius: 30 }}
              source={{ uri: 'https://d2xdmhkmkbyw75.cloudfront.net/7353_thumb.jpg' }}
            />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ color: Colors.TEXT_COLOR, fontSize: 16, fontWeight: '700', textAlign: 'left' }}>{item.food_name}</Text>
              <Text style={{ color: Colors.TEXT_COLOR, fontSize: 16, paddingTop: 5 }}>
                {item.cal != null ? item.cal : 0} Cal {item.servings} servings
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={MealCategoryStyle.lineView} />
      </View>
    );
  }

  searchUpdated(term) {
    if (term !== '') {
      const filteredEmails = this.state.getRecentData.filter(createFilter(term, KEYS_TO_FILTERS));
      this.setState({ newFilterList: filteredEmails });
    } else {
      this.setState({ newFilterList: this.state.getRecentData });
    }
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

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.searchInputView}>
                <EvilIcons name='search' size={24} color={Colors.TEXT_COLOR} style={{ paddingLeft: 2 }} />
                <SearchInput
                  style={styles.searchInput}
                  onChangeText={(term) => { this.searchUpdated(term) }}
                  placeholder={this.state.searchPlaceholder}
                  placeholderTextColor={Colors.dark}
                  clearIcon={
                    <Text style={{ fontSize: 16, color: Colors.TEXT_COLOR, width: 50 }}>Cancel</Text>
                  }
                  clearIconViewStyles={{ position: 'absolute', top: 2, left: wp(73) }}
                />
              </View>
            </View>

            {this.state.newFilterList !== undefined && this.state.newFilterList.length > 0 ?
              <FlatList
                bounces={false}
                data={this.state.newFilterList}
                renderItem={this.recentUI}
                style={{ marginTop: 10 }}
              />
              :
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: hp(15) }}>
                <Image
                  style={{ width: wp(30), height: hp(14), borderRadius: 30 }}
                  source={require('../../Assets/sun.png')} />
                <Text style={{ fontSize: 16, color: Colors.black, marginTop: 20 }}>You haven't added any planes yet.</Text>
              </View>}

          </View>
          {<CustomLoader isLoading={this.state.isLoading} />}

        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  homeStyles: {
    overflow: 'scroll',
    width: wp(100),
    height: hp(100),
  },
  searchInputView: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    fontSize: 14,
    borderColor: Colors.gray,
    borderWidth: 1,
    backgroundColor: Colors.gray,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    marginRight: 70,
  },
  searchInput: {
    fontSize: 14,
    paddingLeft: 10,
    flexDirection: 'row',
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
      getRecentFood,
      getFrequentFood,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(FrequentRecentScreen));

