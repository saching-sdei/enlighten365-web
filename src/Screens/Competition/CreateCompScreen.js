/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withNavigation} from '@react-navigation/compat';
import {Button, Avatar, Icon, CheckBox} from 'react-native-elements';
import {TextInput, Header, CustomLoader} from '../../Components';
import {Strings, Colors} from '../../Constants';
import CompStyle from './CompStyle';
import StepIndicator from 'react-native-step-indicator';
import {Switch} from 'react-native-switch';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CommonSnackbar} from '../../Components/CommonSnackbar';

export default class CreateCompScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwitchOn: true,
    };
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={{flex: 0, backgroundColor: Colors.WHITE_COLOR}}
          forceInset={{top: 'never'}}
        />
        <SafeAreaView
          style={{flex: 1, backgroundColor: Colors.WHITE_COLOR}}
          forceInset={{top: 'never'}}>
          <Header
            leftComponent={
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={{color: Colors.blue_800, fontSize: hp(2)}}>
                  {Strings.BACK}
                </Text>
              </TouchableOpacity>
            }
            middleComponent={Strings.HOME}
          />
          <View style={{flex: 0.9}}>
            <Text style={CompStyle.sportTextStyle}>
              {Strings.ENTER_COMP_NAME}
            </Text>

            <TextInput
              textColor="#111111"
              style={{width: wp(75), marginTop: hp(3), alignSelf: 'center'}}
              editable={true}
              value={this.state.userName}
              onChangeText={userName => this.setState({userName: userName})}
              placeHolder="Enter your Comp Name here"
              autoFocus={false}
              //   secureTextEntry={false}
            />

            <Text style={CompStyle.compUrl}>{Strings.COMP_URL}</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
                paddingLeft: wp(15),
              }}>
              <Text
                style={{
                  width: wp(70),
                  borderRadius: 0,
                  borderWidth: 0,
                  borderColor: Colors.white,
                  paddingLeft: 0,
                  color: Colors.blue_600,
                  textAlignVertical: 'center',
                  fontSize: hp(2),
                }}>
                Comp URL Auto Generate here
              </Text>

              <Icon
                type={'material'}
                name={'content-copy'}
                size={hp(3)}
                color={Colors.black}
                containerStyle={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginLeft: 5,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: hp(5),
                paddingLeft: wp(15),
              }}>
              <Text
                style={{
                  fontSize: hp(2.5),
                  color: this.state.isSwitchOn
                    ? Colors.DARK_YELLOW
                    : Colors.black,
                  alignSelf: 'flex-start',
                  justifyContent: 'center',
                  width: wp(65),
                }}>
                {this.state.isSwitchOn ? 'Private' : 'Public'}
              </Text>

              <Switch
                value={this.state.isSwitchOn}
                onValueChange={() => {
                  this.setState({isSwitchOn: !this.state.isSwitchOn});
                }}
                disabled={false}
                activeText={'On'}
                inActiveText={'Off'}
                circleSize={hp(2.5)}
                // barHeight={1}
                // circleBorderWidth={3}
                backgroundActive={Colors.DARK_YELLOW}
                backgroundInactive={Colors.black}
                circleActiveColor={Colors.WHITE_COLOR}
                circleInActiveColor={Colors.WHITE_COLOR}
                changeValueImmediately={true}
                innerCircleStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }} // style for inner animated circle for what you (may) be rendering inside the circle
                outerCircleStyle={{}} // style for outer animated circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
              />
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              buttonStyle={CompStyle.nextButtonStyle}
              titleStyle={CompStyle.nextText}
              title={Strings.NEXT}
            />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}
