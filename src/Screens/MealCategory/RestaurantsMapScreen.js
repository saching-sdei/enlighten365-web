/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import {
  View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput, Image,
  ImageBackground, ScrollView, Animated, Dimensions, StyleSheet, Platform, Linking,
} from 'react-native';
import { Strings, Colors, APIUrls } from '../../Constants';
// eslint-disable-next-line prettier/prettier
import { Header, CustomLoader, TextInputComponent } from '../../Components';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from '@react-navigation/compat';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useNavigationParam } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MealCategoryStyle from './MealCategoryStyle';
import SearchInput, { createFilter } from 'react-native-search-filter';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { getRecentFood, getFrequentFood } from '../../Actions/ActionCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getItem } from '../../Utils/AsyncUtils';
import { Avatar } from 'react-native-elements';
const KEYS_TO_FILTERS = ['name'];
import { Switch } from 'react-native-switch';

class RestaurantsMapScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      getRestaurantData: [],
      newFilterList: [],
      searchPlaceholder: 'Search',
      searchText: '',
      isMapVisible: false,
      isSwitchOn: false,
    };
  }

  componentDidMount() {
    this.getReasturentMappingApiCall();
    this.getInitialState();
  }

  getInitialState() {
    return {
      region: {
        latitude: 38.8982919,
        longitude: -77.0273156,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  getReasturentMappingApiCall() {
    this.setState({ isLoading: true });
    var center = {
      lat: 38.8982919,
      lng: -77.0273156,
    };
    //?ll=38.89814,-77.029446&distance=5km&limit=10
    fetch(APIUrls.GET_RESTAURANT_MAP + center.lat + ',' + center.lng +
      '&distance=5km&limit=5', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': Strings.NUTRITION_X_APP_ID,
        'x-app-key': Strings.NUTRITION_X_APP_KEY,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          getRestaurantData: responseJson.locations,
          newFilterList: responseJson.locations,
        });
        console.log('responseJson mapping >>>', JSON.stringify(responseJson.locations));
      })
      .catch(error => {
        console.log('error mapping >>>', error);
        this.setState({ isLoading: false });
      });
  }

  goBack() {
    this.props.navigation.goBack();
  }

  recentUI = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={{ margin: 10 }}
          onPress={() => {
            this.props.navigation.navigate('FoodDetailScreen', { 'foodName': item.name });
            // this.props.clearFoodTypeReducer();
          }} >
          <View style={{ flexDirection: 'row' }}>
            <Avatar
              rounded
              title={item.name.charAt(0)}
              size="medium" />

            <View style={{ marginLeft: 20 }}>
              <Text style={{ color: Colors.TEXT_COLOR, fontSize: 16, fontWeight: '700', textAlign: 'left' }}>
                {item.name}
              </Text>
              <Text style={{ color: Colors.TEXT_COLOR, fontSize: 14, paddingTop: 5 }}>
                {item.address}
              </Text>
              <Text style={{ color: Colors.TEXT_COLOR, fontSize: 14, paddingTop: 5 }}>
                {item.phone}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(item.website)}>
                <Text style={{ color: Colors.SECONDARY_COLOR, fontSize: 14, paddingTop: 5 }}>
                  {item.website}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <View style={MealCategoryStyle.lineView} />
      </View>
    );
  }

  searchUpdated(term) {
    if (term !== '') {
      const filteredEmails = this.state.getRestaurantData.filter(createFilter(term, KEYS_TO_FILTERS));
      this.setState({ newFilterList: filteredEmails });
    } else {
      this.setState({ newFilterList: this.state.getRestaurantData });
    }
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: Colors.PRIMARY_COLOR }}
          forceInset={{ top: 'never' }}
        />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}
          forceInset={{ top: 'never' }}>

          <View style={{ flex: 0.1 }}>
            <Header
              leftComponent={
                <TouchableOpacity onPress={() => this.goBack()}>
                  <Icon name="ios-arrow-back" size={24} color={Colors.WHITE_COLOR} />
                </TouchableOpacity>
              }
              middleComponent={'RESTAURANTS'}
              rightComponent={
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: this.state.isSwitchOn
                        ? Colors.SECONDARY_COLOR
                        : Colors.WHITE_COLOR,
                      alignSelf: 'flex-start',
                      justifyContent: 'center',
                      paddingBottom: 5,
                    }}>
                    MAP
                  </Text>
                  {/* <MaterialCommunityIcons name="map-marker-outline" size={24} color={Colors.WHITE_COLOR} /> */}

                  <Switch
                    value={this.state.isSwitchOn}
                    onValueChange={() => {
                      this.setState({
                        isSwitchOn: !this.state.isSwitchOn,
                        isMapVisible: !this.state.isMapVisible,
                      });
                    }}
                    disabled={false}
                    activeText={'On'}
                    inActiveText={'Off'}
                    circleSize={hp(2.2)}
                    // barHeight={1}
                    // circleBorderWidth={3}
                    backgroundActive={Colors.SECONDARY_COLOR}
                    backgroundInactive={Colors.TEXT_COLOR}
                    circleActiveColor={Colors.WHITE_COLOR}
                    circleInActiveColor={Colors.WHITE_COLOR}
                    changeValueImmediately={true}
                    innerCircleStyle={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      // borderColor: Colors.WHITE_COLOR
                    }}
                    outerCircleStyle={{}}
                    renderActiveText={false}
                    renderInActiveText={false}
                    switchLeftPx={2}
                    switchRightPx={2}
                    switchWidthMultiplier={2}
                  />
                </View>
              }
            ></Header>

          </View>

          <View style={{ flex: 0.9 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.searchInputView}>
                <EvilIcons name='search' size={24} color={Colors.TEXT_COLOR} style={{ paddingLeft: 2 }} />
                <SearchInput
                  style={styles.searchInput}
                  onChangeText={(term) => { this.searchUpdated(term) }}
                  placeholder={this.state.searchPlaceholder}
                  placeholderTextColor={Colors.dark}
                  clearIcon={
                    <Text style={{ fontSize: 16, color: Colors.TEXT_COLOR, width: 50 }}>Cancel</Text>
                  }
                  clearIconViewStyles={{ position: 'absolute', top: 2, left: wp(73) }}
                />
              </View>
            </View>
            {this.state.isMapVisible ?
              <MapView
                initialRegion={{
                  latitude: 38.8982919,
                  longitude: -77.0273156,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
                showsUserLocation={true}
                showsMyLocationButton={true}
                loadingEnabled={true}
                loadingIndicatorColor={'blue'}
                loadingBackgroundColor="#eeeeee"
                showsCompass={true}
                showsPointsOfInterest={true}
                pitchEnabled={true}
                rotateEnabled={true}
                scrollEnabled={true}
                zoomEnabled={true}
                // region={this.state.region}
                // onRegionChange={this.onRegionChange}
                style={styles.map}
              >
                {this.state.newFilterList.map(marker => (
                  <Marker
                    coordinate={{
                      latitude: marker.lat,
                      longitude: marker.lng,
                    }}
                    title={marker.name}
                    description={marker.address}
                  />
                ))}
              </MapView>
              :
              !this.state.isLoading ?
                this.state.newFilterList !== undefined && this.state.newFilterList.length > 0 ?
                  <FlatList
                    bounces={false}
                    data={this.state.newFilterList}
                    renderItem={this.recentUI}
                    style={{ marginTop: 10 }}
                  />
                  :
                  <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: hp(15) }}>
                    <Image
                      style={{ width: wp(30), height: hp(14), borderRadius: 30 }}
                      source={require('../../Assets/sun.png')} />
                    <Text style={{ fontSize: 16, color: Colors.black, marginTop: 20 }}>You haven't added any planes yet.</Text>
                  </View>
                : null
            }

          </View>
          {<CustomLoader isLoading={this.state.isLoading} />}

        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  homeStyles: {
    overflow: 'scroll',
    width: wp(100),
    height: hp(100),
  },
  searchInputView: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    fontSize: 14,
    borderColor: Colors.gray,
    borderWidth: 1,
    backgroundColor: Colors.gray,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    marginRight: 70,
  },
  searchInput: {
    fontSize: 14,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  map: { ...StyleSheet.absoluteFillObject, marginTop: -20 },
});

function mapStateToProps(state) {
  return {
    FoodTypeReducer: state.FoodTypeReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getRecentFood,
      getFrequentFood,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(RestaurantsMapScreen));

