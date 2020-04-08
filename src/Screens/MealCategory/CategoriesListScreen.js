/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
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

class CategoriesListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      categoriesList: [
        {
          name: 'BEEF',
          detail: Strings.BE_HEALTHIER_DETAIL,
          id: 1,
        }, {
          name: 'BAKERY',
          detail: Strings.LOSE_WEIGHT_DETAIL,
          id: 2,
        }, {
          name: 'EGGS',
          detail: Strings.LOSE_WEIGHT_DETAIL,
          id: 3,
        },
        {
          name: 'FISH',
          detail: Strings.LOSE_WEIGHT_DETAIL,
          id: 4,
        },
        {
          name: 'LAMB',
          detail: Strings.LOSE_WEIGHT_DETAIL,
          id: 5,
        },
        {
          name: 'PORK',
          detail: Strings.LOSE_WEIGHT_DETAIL,
          id: 6,
        },
      ],
    };

  }


  componentDidMount() {
    // console.log('name first comp', this.props.route.params.name);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  categoriesUI = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={{ margin: 10 }}
          onPress={() => this.props.navigation.navigate('CategoryNutritionXMenuList', { 'categoryName': item.name })}>
          <Text style={{ color: Colors.TEXT_COLOR, fontSize: 16 }}>{item.name}</Text>
        </TouchableOpacity>
        <View style={{ height: 0.5, width: wp(100), backgroundColor: Colors.gray_outline }} />
      </View>
    )

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
              middleComponent={Strings.CATEGORIES} />
          </View>

          {/* <Text>{'PROFILE'}</Text> */}
          <View style={{ flex: 0.9 }}>
            <FlatList
              bounces={false}
              data={this.state.categoriesList}
              renderItem={this.categoriesUI}
            />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default withNavigation(CategoriesListScreen);
