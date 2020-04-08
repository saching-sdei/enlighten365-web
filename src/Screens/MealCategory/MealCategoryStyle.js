import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  searchInput: {
    padding: 10,
    fontSize: 14,
    backgroundColor: Colors.gray,
    width: wp(70),
  },
  searchInputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16,
    borderColor: Colors.gray_outline,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: Colors.gray,
  },
  headingViewStyle: {
    backgroundColor: Colors.PRIMARY_COLOR,
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.PRIMARY_COLOR,
  },
  CircleSaveBtn: {
    alignItems: 'center',
    marginTop: -30,
    marginRight: 20,
    height: hp(5),
    width: wp(10),
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_COLOR,
    borderColor: Colors.PRIMARY_COLOR,
  },
  textInputBoxStyle1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: hp(0.1),
    borderRadius: 4,
    borderColor: Colors.grey_400,
    fontSize: 14,
    // width: wp(30),
    padding: 5,
  },

  CircleViewStyle: {
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 10,
    height: hp(3.5),
    width: wp(8),
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: Colors.pie_carbs,
    borderColor: Colors.pie_carbs,
  },
  backgroundStyle: {
    backgroundColor: Colors.PRIMARY_COLOR,
    width: wp(95),
    height: hp(15),
    borderRadius: 8,
    borderColor: Colors.PRIMARY_COLOR,
    borderWidth: 0.1,
    flexDirection: 'row',
  },
  lineView: {
    height: 0.5,
    width: wp(100),
    backgroundColor: Colors.gray_outline,
  },
  lineViewBlue: {
    height: 1,
    width: wp(95),
    backgroundColor: Colors.blue_700,
    marginTop: 5,
  },
  lineViewGray: {
    height: 1,
    width: wp(84),
    backgroundColor: Colors.gray_outline,
    marginTop: 5,
  },
  gauge: {
    position: 'absolute',
    width: 80,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: Colors.outline,
    fontSize: 22,
    fontWeight: 'bold',
  },
  textBlueStyle: {
    fontSize: 14,
    color: Colors.outline,
    marginTop: 10,
  },
  borderOutlineStyle: {
    borderColor: Colors.gray_outline,
    borderWidth: 1,
    margin: 10,
  },
  borderFillStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.gray,
    padding: 10,
    justifyContent: 'space-between',
  },

  textStyle: {
    color: Colors.text_gray,
    fontSize: 16,
    margin: 10,
  },

  rowViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


});