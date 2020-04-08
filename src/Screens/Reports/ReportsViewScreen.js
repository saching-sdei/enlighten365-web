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
let arrayOfInnerTable = [];
let table_text = [
  [
    "Category",
    "indicator",
    "information"
  ],
  [
    "Vitamins",
    "Vitamin B6. Vitamin B12. Inositol. Vitamin\nK1",
    "For full results see the chart on page 10.\nFor food sources refer to page 27."
  ],
  [
    "“antion dant\nRc",
    "Sulforaphane. Carotenoids. Zinc",
    "For full results see the chart on page 16.\nFor food sources refer to page 27."
  ],
  [
    "Foods",
    "Please refer to the foods tables on page 26\nand 27 of the plan.",
    "For full results see the chart on page 24."
  ],
  [
    "Resistance",
    "IEEE ES\nMoulds/Spores Parasite. Post Virus",
    "For full results see the chart on page 22.\nFor food sources refer to page 28."
  ],
  [
    "Additives to Avoid",
    "Please refer to the food additives table and\nlink on page 25.",
    "For tul results see the chart on page 25.\nne"
  ]
];

class ReportsViewScreen extends Component {

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


  componentDidMount() {
    // console.log('name first comp', this.props.route.params.name);
    this.callReportAPI();
  }

  callReportAPI() {

    let postData = {
      "file_name": "1584439740281-rjfemaleage46zip92234.pdf",
      "report_type": 1,
    };
    console.log('postData>>>', postData);
    this.setState({ isLoading: true });
    fetch('http://35.165.235.204:8001/parse-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ isLoading: false });
        console.log('responseJson REPORTS>>>', JSON.stringify(responseJson));
        this.setState({
          graphRes: responseJson.graphs[0],
          imageUrlPath: IMAGE_BASE_URL + responseJson.graphs[0].graph_path,
          graphData: responseJson.graphs[0].graph_imp_text,
          tableData: responseJson.tables[0].table_text,
        });

      })
      .catch(error => {
        // this.setState({ isLoading: false });
        console.log('error>>>', error);
      });
  }

  // renderModalContent = () => (
  //   <View style={styles.modalcontent}>
  //     <View style={{
  //       justifyContent: 'flex-end',
  //       alignItems: 'flex-end',
  //       backgroundColor: Colors.PRIMARY_COLOR,
  //       padding: 5,
  //       width: window.width,
  //       paddingTop: 20,
  //     }}>
  //       <Icon name='md-close' size={25} color={Colors.WHITE}
  //         style={{ marginRight: 30 }}
  //         onPress={() => { this.setState({ modalVisible: false }) }} />
  //     </View>
  //     <View>
  //       <Image
  //         source={{
  //           uri: 'http://35.165.235.204:8001/ocr_output/1584439740281-rjfemaleage46zip92234.pdf/graph_wellness.png',
  //         }}
  //         style={{ width: wp(80), height: hp(80) }}
  //         PlaceholderContent={<ActivityIndicator size="large" color={Colors.SECONDARY_COLOR} />}
  //       />
  //     </View>
  //   </View>
  // );

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
      <View style={{ borderColor: Colors.gray_outline, borderWidth: 1, width: wp(96), borderBottomWidth: 0.5 }}>
        <View style={{ flexDirection: 'row', margin: 5, alignItems: 'flex-start' }}>
          <Text style={{ color: Colors.TEXT_COLOR, fontSize: 16, padding: 5 }}>{index}</Text>
          <FlatList
            bounces={false}
            data={item}
            renderItem={this.tableInnerUI}
            horizontal={true}
            style={{ width: wp(96), marginLeft: 5 }}
          />
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
          textAlign: 'left'
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
                middleComponent={"Key Optimization Report"}

              />
            </View>
            <View style={{ flex: 0.9 }}>
              <View style={{ alignItems: 'center' }}>
                {/*  IMAGE_BASE_URL + this.state.graphRes.graph_path */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ImageZoomScreen', { imagePath: this.state.imageUrlPath })}>
                  <Image
                    source={{
                      uri: this.state.imageUrlPath,
                    }}
                    overlayContainerStyle={{ backgroundColor: 'red' }}
                    containerStyle={{ tintColor: Colors.red }}
                    style={{ width: wp(60), height: wp(60), borderRadius: 180 }}
                    PlaceholderContent={<ActivityIndicator size="small" color={Colors.SECONDARY_COLOR} />}
                  />
                </TouchableOpacity>
                <Text style={{ marginTop: 10, color: Colors.text_gray, fontSize: 18, fontWeight: 'bold' }}>{this.state.graphRes.graph_name}</Text>
                <View style={{ flex: 0.4, marginTop: 10 }}>
                  <FlatList
                    bounces={false}
                    keyExtractor={item => item}
                    data={this.state.graphData}
                    renderItem={this.graphUI}
                  />
                </View>

                <View style={{ flex: 0.4, marginTop: 10 }}>
                  <FlatList
                    bounces={false}
                    data={this.state.tableData}
                    // data={table_text}
                    renderItem={this.tableUI}
                  />
                </View>

              </View>
              {<CustomLoader isLoading={this.state.isLoading} />}
            </View>
          </ScrollView>
          {/* <Modal
            backdropColor={'white'}
            backdropOpacity={1}
            isVisible={this.state.modalVisible}
            onSwipeComplete={() => this.setState({ modalVisible: false })}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={styles.bottomModal}
            onBackdropPress={() => this.setState({ modalVisible: false })}
          >
            {this.renderModalContent()}
          </Modal> */}

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
    margin: 0
  },
  modalcontent: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
});

export default withNavigation(ReportsViewScreen);


