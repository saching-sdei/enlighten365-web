/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './Screens/Splash/SplashScreen';
import WelcomeScreen from './Screens/Authentication/WelcomeScreen';
import LoginScreen from './Screens/Authentication/LoginScreen';
import SignUpScreen from './Screens/Authentication/SignUpScreen';

import HomeScreen from './Screens/Home/HomeScreen';
import ConnectScreen from './Screens/Connect/ConnectScreen';

import ProfileScreen from './Screens/Profile/ProfileScreen';
import MyNutritionSystem from './Screens/Profile/MyNutritionSystem';
import LadderScreen from './Screens/Ladder/LadderScreen';

import MealCategory from './Screens/MealCategory/MealCategoryScreen';
import CategoriesListScreen from './Screens/MealCategory/CategoriesListScreen';
import CategoryNutritionXMenuList from './Screens/MealCategory/CategoryNutritionXMenuList';
import FoodDetailScreen from './Screens/MealCategory/FoodDetailScreen';
import ImageZoomScreen from './Screens/Reports/ImageZoomScreen';
import ReportsViewScreen from './Screens/Reports/ReportsViewScreen';
import FrequentRecentScreen from './Screens/MealCategory/FrequentRecentScreen';
import RestaurantsMapScreen from './Screens/MealCategory/RestaurantsMapScreen';

import { Colors } from './Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const getIsTabBarVisible = route => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params
      ? route.params.screen
      : 'HomeScreen';

  switch (routeName) {
    case 'HomeScreen':
    case 'CompetitionScreen':
    case 'ProfileScreen':
    case 'LadderScreen':
      return true;
    default:
      return false;
  }
};

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.colorPrimaryDark,
        borderTopWidth: 3,
        borderColor: Colors.colorPrimaryDark,
        height: hp(10),
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          console.log('TAB PRESSS');
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={{
                color: isFocused ? Colors.black : Colors.WHITE_COLOR,
                fontWeight: 'bold',
                fontSize: hp(1.7),
                alignSelf: 'center',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function HomeComponent() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      headerMode="none"
      options={{
        // When logging out, a pop animation feels intuitive
        // You can remove this if you want the default 'push' animation
        animationTypeForReplace: 'push',
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MealCategoryScreen" component={MealCategory} />
      <Stack.Screen name="CategoriesListScreen" component={CategoriesListScreen} />
      <Stack.Screen name="CategoryNutritionXMenuList" component={CategoryNutritionXMenuList} />
      <Stack.Screen name="FoodDetailScreen" component={FoodDetailScreen} />
      {/* <Stack.Screen name="ReportsViewScreen" component={ReportsViewScreen} /> */}
      <Stack.Screen name="ImageZoomScreen" component={ImageZoomScreen} />
      <Stack.Screen name="FrequentRecentScreen" component={FrequentRecentScreen} />
      <Stack.Screen name="RestaurantsMapScreen" component={RestaurantsMapScreen} />
    </Stack.Navigator>

  )
}

function ReportComponent() {
  return (
    <Stack.Navigator
      initialRouteName="ReportsViewScreen"
      headerMode="none"
      options={{
        // When logging out, a pop animation feels intuitive
        // You can remove this if you want the default 'push' animation
        animationTypeForReplace: 'push',
      }}>
      <Stack.Screen name="ReportsViewScreen" component={ReportsViewScreen} />
      <Stack.Screen name="ImageZoomScreen" component={ImageZoomScreen} />
    </Stack.Navigator>

  )
}

function ProfileComponent() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      headerMode="none"
      options={{
        // When logging out, a pop animation feels intuitive
        // You can remove this if you want the default 'push' animation
        animationTypeForReplace: 'push',
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="MyNutritionSystem" component={MyNutritionSystem} />
    </Stack.Navigator>
  );
}

function MyCustomTab() {
  return (
    <Tab.Navigator
      // initialRouteName="HomeScreen"
      // screenOptions={({route}) => ({
      //   tabBarVisible: getIsTabBarVisible(route),
      // })}
      // tabBarOptions={{
      //   activeTintColor: Colors.yellow_900,
      //   inactiveTintColor: Colors.white,
      // }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeComponent}
        options={{
          tabBarLabel: 'HOME',
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileComponent}
        options={{
          tabBarLabel: 'PROFILE',
        }}
      />

      <Tab.Screen
        name="ConnectScreen"
        component={ConnectScreen}
        options={{
          tabBarLabel: 'CONNECT',
        }}
      />

      <Tab.Screen
        name="ReportsViewScreen"
        component={ReportComponent}
        options={{
          tabBarLabel: 'REPORTS',
        }}
      />

    </Tab.Navigator>
  );
}

function MyTab() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor={Colors.yellow_900}
      inactiveColor={Colors.WHITE_COLOR}
      shifting={false}
      labeled={true}
      labelStyle={{ fontSize: hp(10) }}
      barStyle={{
        backgroundColor: Colors.HEADER_BOTTOM_BACKGROUND,
        borderTopWidth: 3,
        borderColor: Colors.yellow_800,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'HOME',
          labelStyle: { fontSize: hp(5) },
        }}
      />
      <Tab.Screen
        name="CompetitionScreen"
        component={CompetitionScreen}
        options={{
          tabBarLabel: 'COMP',
        }}
      />

      <Tab.Screen
        name="CompetitionScreen2"
        component={CompetitionScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon
              type={'material'}
              name={'search'}
              size={hp(3)}
              color={Colors.yellow_900}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'PROFILE',
        }}
      />
      <Tab.Screen
        name="LadderScreen"
        component={LadderScreen}
        options={{
          tabBarLabel: 'LADDER',
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        headerMode="none"
        options={{
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: 'push',
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="MyTab" component={MyCustomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
