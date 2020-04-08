import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Colors} from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../../Constants/Colors';

export default StyleSheet.create({
  sportTextStyle: {
    fontSize: hp(2.5),
    color: Colors.ACENT_COLOR,
    alignSelf: 'center',
    marginTop: hp(5),
  },
  textStyle: {
    width: wp(75),
    fontSize: hp(1.8),
    fontWeight: 'bold',
    color: Colors.grey_800,
  },
  compUrl: {
    fontSize: hp(2.5),
    color: Colors.black,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginTop: hp(5),
    marginLeft: wp(15),
  },
  compUrlText: {
    fontSize: hp(2),
    color: Colors.blue_600,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginTop: hp(1),
    marginLeft: wp(15),
  },
  leftAbsoluteView: {
    position: 'absolute',
    right: wp(55),
    top: hp(10),
  },
  rightAbsoluteView: {
    position: 'absolute',
    left: wp(45),
    top: hp(20),
    justifyContent: 'center',
    alignSelf: 'center',
  },

  scoreView: {
    height: hp(15),
    width: wp(38),
    backgroundColor: Colors.DARK_YELLOW,
    marginLeft: wp(14),
    marginTop: hp(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    paddingBottom: hp(2),
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  compTextStyle: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: wp(14),
    color: Colors.grey_800,
  },

  bendingView: {
    position: 'absolute',
    top: hp(5),
    marginLeft: wp(11),
    height: hp(4.5),
    width: wp(35),
    backgroundColor: Colors.BENDING_VIEW,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 5,
    shadowRadius: 10,
    elevation: 15,
  },
  pointText: {
    fontSize: hp(3.5),
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.WHITE_COLOR,
  },
  roundText: {
    fontSize: hp(2),
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.WHITE_COLOR,
  },
  bonousButton: {
    borderColor: Colors.BLUE_BORDER,
    borderWidth: 2,
    backgroundColor: Colors.WHITE_COLOR,
    height: hp(9),
    width: wp(35),
    marginRight: wp(4),
  },
  bonousText: {
    color: Colors.black,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: hp(2),
  },

  nextButtonStyle: {
    borderColor: Colors.red_900,
    borderWidth: 2,
    backgroundColor: Colors.red_900,
    width: wp(80),
    height: hp(6),
  },

  nextText: {
    color: Colors.white,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: hp(2),
  },
});
