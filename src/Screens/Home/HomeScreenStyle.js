import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../../Constants/Colors';

export default StyleSheet.create({
  sportTextStyle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: Colors.ACENT_COLOR,
    alignSelf: 'center',
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
    color: Colors.ACENT_COLOR,
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

  placeTipsButton: {
    borderColor: Colors.red_900,
    borderWidth: 2,
    backgroundColor: Colors.red_900,
    height: hp(9),
    width: wp(35),
    marginLeft: wp(4),
  },

  placeTipsText: {
    color: Colors.white,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: hp(2),
  },

  textStyleBlack: { fontSize: 16, color: Colors.TEXT_COLOR, fontWeight: '500', textAlign: 'center', padding: 3 },
  textStyle: { fontSize: 14, color: Colors.colorAccent, textAlign: 'center', padding: 3 },
  textStyleTargetCal: { fontSize: 24, color: Colors.colorAccent, textAlign: 'center', padding: 3 },
  foodTypeText: { fontSize: 30, color: Colors.gold, paddingTop: 12 },
  recommededText: { fontSize: 24, color: Colors.gold },
  foodItemView: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' },

  mainStyle: { flex: 1, backgroundColor: Colors.colorPrimaryDark },
  viewFirstPart: { flex: 0.6, backgroundColor: Colors.colorPrimaryMiddle, marginTop: 20 },
  stepsStyle: { height: 150, justifyContent: 'space-evenly', flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10 },
  circleCalStyle: {
    borderWidth: 3,
    borderRadius: 100,
    borderColor: Colors.light_green,
    backgroundColor: Colors.colorPrimaryMiddle,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150
  },
});
