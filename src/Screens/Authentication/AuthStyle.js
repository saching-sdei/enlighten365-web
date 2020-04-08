import { StyleSheet, Dimensions, Platform } from 'react-native';
import Colors from '../../Constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  textStyle: {
    width: wp(75),
    fontSize: hp(1.8),
    fontWeight: 'bold',
    color: Colors.grey_800,
  },
  imageStyle: {
    borderWidth: 0.5,
    borderColor: Colors.blue_grey_700,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    alignContent: 'center',
    marginTop: hp(5),
  },
  roundViewStyle: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.PRIMARY_COLOR,
    zIndex: 999,
    position: 'relative',
    marginTop: -40,
    height: hp(2.5),
    width: wp(15),
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
