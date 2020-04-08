import { combineReducers } from 'redux';
import AuthReducer from '../Screens/Authentication/AuthReducer';
import FoodTypeReducer from '../Screens/MealCategory/FoodTypeReducer';
import ProfileReducer from '../Screens/Profile/ProfileReducer';
import HomeReducer from '../Screens/Home/HomeReducer';

export default combineReducers({
  AuthReducer: AuthReducer,
  FoodTypeReducer: FoodTypeReducer,
  ProfileReducer: ProfileReducer,
  HomeReducer: HomeReducer,
});
