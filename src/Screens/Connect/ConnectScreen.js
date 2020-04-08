/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Strings, Colors } from '../../Constants';
// eslint-disable-next-line prettier/prettier
import { TextInput, Header, CustomLoader, TextInputComponent, ProfileTextComponent } from '../../Components';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from '@react-navigation/compat';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';


class ConnectScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: 'Priyanka Tiwari',
      isConnect: false,
    };
  }

  componentDidMount() {
    // console.log('name first comp', this.props.route.params.name);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: Colors.colorPrimaryMiddle }}
          forceInset={{ top: 'never' }}
        />
        <SafeAreaView
          style={{ width: wp(100), height: hp(100), backgroundColor: Colors.WHITE_COLOR, marginBottom: 10 }}
          forceInset={{ top: 'never' }}>

          <View style={{ height: hp(5), backgroundColor: Colors.yellow_100 }}>
            <Header
              // leftComponent={
              //   <TouchableOpacity onPress={() => this.goBack()}>
              //     <Icon name="ios-arrow-back" size={28} color={Colors.WHITE_COLOR} />
              //   </TouchableOpacity>
              // }
              middleComponent={Strings.CONNECT}

            />
          </View>
          {/* <View style={{ height: hp(90), margin: 10 }}> */}

          <View style={{ height: hp(72) }}>

            <View style={{ marginTop: 20, alignItems: 'flex-start', marginBottom: 10 }}>
              <Image
                source={require('../../Assets/shealth.png')}
                resizeMode='contain'
                style={{ width: wp(20), height: hp(10), marginLeft: 30, }}
              />
              <Text
                style={{
                  marginTop: 10, color: Colors.text_gray,
                  fontSize: 14, fontWeight: '600', textAlign: 'center', marginLeft: 20,
                }}
              >Samsumg Health</Text>
            </View>

            <View style={{ alignItems: 'center', margin: 10, marginTop: 1 }}>
              <Image
                source={require('../../Assets/connect_icon1.png')}
                style={{ width: wp(70), height: hp(35), tintColor: Colors.colorPrimaryMiddle }}
                resizeMode='contain'
              />
            </View>

            <View style={{ alignItems: 'flex-end', justifyContent: 'center', marginTop: 10, marginRight: 40 }}>
              <Image
                source={require('../../Assets/app_icon.png')}
                style={{ width: wp(20), height: hp(10), borderColor: Colors.gray_outline, borderWidth: 1 }}
                resizeMode='contain'
              />
            </View>

          </View>

          <View style={{ height: hp(5), justifyContent: 'center' }}>
            <Button
              buttonStyle={{
                backgroundColor: !this.state.isConnect ? Colors.colorPrimaryMiddle : Colors.gray2,
                height: hp(6),
                marginLeft: 50,
                marginRight: 50,
              }}
              titleStyle={{ color: Colors.colorAccent, fontStyle: 'normal', fontWeight: '600' }}
              title={!this.state.isConnect ? Strings.CONNECT : Strings.DICONNECT}
              onPress={() => this.setState({ isConnect: !this.state.isConnect })}
            />
          </View>
          {/* </View> */}
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
});

export default withNavigation(ConnectScreen);


