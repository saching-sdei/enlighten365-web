/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import {
  View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ScrollView,
  Dimensions,
} from 'react-native';
import { Strings, Colors } from '../../Constants';
// eslint-disable-next-line prettier/prettier
import { TextInput, Header, CustomLoader, TextInputComponent, ProfileTextComponent } from '../../Components';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { withNavigation } from '@react-navigation/compat';
import ImageZoom from 'react-native-image-pan-zoom';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'react-native-elements';


class ImageZoomScreen extends Component {

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
          style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}
          forceInset={{ top: 'never' }}>

          <View style={{
            flex: 0.1, alignItems: 'flex-end', backgroundColor: Colors.PRIMARY_COLOR,
            paddingRight: 20, justifyContent: 'center', paddingLeft: 10,
          }}>
            <TouchableOpacity onPress={() => this.goBack()}
            >
              <Entypo name="cross" size={28} color={Colors.WHITE_COLOR} />
            </TouchableOpacity>
          </View>


          <View style={{ flex: 0.9, alignItems: 'center', justifyContent: 'center', marginTop: 30, paddingTop: 30 }}>
            {/*  IMAGE_BASE_URL + this.state.graphRes.graph_path */}

            <ImageZoom cropWidth={wp(95)}
              cropHeight={hp(80)}
              imageWidth={wp(100)}
              imageHeight={hp(70)}>
              <Image
                style={{ width: wp(100), height: hp(50), alignItems: 'center' }}
                source={{ uri: this.props.route.params.imagePath }}
                PlaceholderContent={<ActivityIndicator size="large" color={Colors.SECONDARY_COLOR} />} />
            </ImageZoom>
            {/* <Image
              source={{
                uri: this.props.route.params.imagePath,
              }}
              style={{ width: wp(100), height: hp(90) }}
              PlaceholderContent={<ActivityIndicator />}
            /> */}


          </View>
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

export default withNavigation(ImageZoomScreen);


