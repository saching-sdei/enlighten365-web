/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { Strings, Colors } from '../../Constants';
// eslint-disable-next-line prettier/prettier
import { TextInput, Header, CustomLoader, TextInputComponent, ProfileTextComponent } from '../../Components';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from '@react-navigation/compat';
import { useNavigationParam } from '@react-navigation/native';
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'react-native-elements';
import MealCategoryStyle from '../MealCategory/MealCategoryStyle';
const IMAGE_BASE_URL = 'http://35.165.235.204:8001';

let nutritionData = [{
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

class MyNutritionSystem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: 'Priyanka Tiwari',
      userEmail: '',
      graphRes: [],
      imageUrlPath: '',
      modalVisible: false,
      graphData: [],
      tableData: [],
    };
  }

  graphUI = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={{ margin: 10 }}>
          <Text style={{ color: Colors.TEXT_COLOR, fontSize: 16, paddingTop: 5 }}>{item}</Text>
        </TouchableOpacity>
        <View style={MealCategoryStyle.lineView} />
      </View>
    );
  }

  tableUI = ({ item, index }) => {
    return (
      <View style={{ borderColor: Colors.gray_outline, borderWidth: 1, borderBottomWidth: 0.5 }}>
        <View style={{ flexDirection: 'row', margin: 5, alignItems: 'flex-start' }}>
          <Text style={{ color: Colors.TEXT_COLOR, fontSize: 16, padding: 5 }}>{item.value}</Text>
          {/* <FlatList
            bounces={false}
            data={item}
            renderItem={this.tableInnerUI}
            horizontal={true}
            style={{ width: wp(96), marginLeft: 5 }}
          /> */}
        </View>
        {/* <View style={MealCategoryStyle.lineView} /> */}
      </View>
    );
  }

  tableInnerUI = ({ item, index }) => {
    return (
      <View style={{ width: wp(30), padding: 5 }}>
        <Text style={{
          color: Colors.TEXT_COLOR, fontSize: 16,
          textAlign: 'left',
        }}>{item}</Text>
      </View>
    );
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    console.log('imageUrlPath >>> ', this.state.imageUrlPath)
    console.log('this.state.graphRes.graph_name >>> ', this.state.graphRes.graph_name)
    return (
      <Fragment>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: Colors.colorPrimaryMiddle }}
          forceInset={{ top: 'never' }}
        />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR, marginBottom: 10 }}
          forceInset={{ top: 'never' }}>

          <ScrollView bounces={false}>
            <View style={{ flex: 0.1 }}>
              <Header
                // leftComponent={
                //   <TouchableOpacity onPress={() => this.goBack()}>
                //     <Icon name="ios-arrow-back" size={28} color={Colors.WHITE_COLOR} />
                //   </TouchableOpacity>
                // }
                middleComponent={"My Nutrition System Result"}

              />
            </View>
            <View style={{ flex: 0.9 }}>
              <View style={{ alignItems: 'center' }}>
                {/*  IMAGE_BASE_URL + this.state.graphRes.graph_path */}
                <View style={{ flex: 0.4, marginTop: 10 }}>
                  <FlatList
                    bounces={false}
                    data={nutritionData}
                    // data={table_text}
                    // horizontal={true}
                    renderItem={this.tableUI}
                  />
                </View>

              </View>
              {<CustomLoader isLoading={this.state.isLoading} />}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    margin: 0,
  },
  modalcontent: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
});

export default withNavigation(MyNutritionSystem);


