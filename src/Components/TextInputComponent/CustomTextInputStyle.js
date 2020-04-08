import {StyleSheet, Dimensions, Platform} from 'react-native';
import Colors from '../../Constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  textInput: {
    height: Platform.OS == 'android' ? hp(6) : hp(5),
    borderRadius: hp(1),
    borderWidth: hp(0.1),
    borderColor: Colors.grey_500,
    backgroundColor: '#FFFFFF',
    fontSize: hp(1.9),
    paddingLeft: wp(3),
    
  },
});
