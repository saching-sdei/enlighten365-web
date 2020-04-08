import ACTION_TYPES from '../../Actions/ActionTypes';
import { act } from 'react-test-renderer';
const INITIAL_STATE = {
  foodDetailRes: '',
  statusCodeFoodType: '',
  foodListRes: '',
  statusCodefoodList: '',
  foodImage: '',
  updatedServingValue: '',

  saveNutritionFood: '',
  statusCodeSaveFood: '',

  getRecentRes: '',
  statusCodeRecent: '',

  getFrequentRes: '',
  statusCodeFrquent: '',
};
export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_FOOD_DETAILS_NUTRITION:
      console.log('REDUCER', action.payload);
      return {
        ...state,
        foodDetailRes:
          action.payload.status === 200
            ? action.payload.foods[0]
            : action.payload,
        // foodDetailRes: action.payload.status !== 200 ? [] : action.payload.foods[0],
        statusCodeFoodType: action.statusCode,
        foodImage:
          action.payload.status === 200
            ? action.payload.foods[0].photo
            : action.payload,
      };

    case ACTION_TYPES.GET_FOOD_LIST_NUTRITION:
      return {
        ...state,
        foodListRes: action.payload,
        // statusCodefoodList: action.statusCode,
      };

    case ACTION_TYPES.UPDATE_SERVING_VALUE:
      return {
        ...state,
        updatedServingValue: action.payload,
      };

    case ACTION_TYPES.SAVE_NUTRITION_FOOD:
      return {
        ...state,
        saveNutritionFood: action.payload,
        statusCodeSaveFood: action.statusCode,
      };

    case ACTION_TYPES.GET_FOOD_RECENT:
      return {
        ...state,
        getRecentRes: action.payload,
        statusCodeRecent: action.statusCode,
      };

    case ACTION_TYPES.GET_FOOD_FREQUENT:
      return {
        ...state,
        getFrequentRes: action.payload,
        statusCodeFrquent: action.statusCode,
      };

    case ACTION_TYPES.CLEAR_FOOD_TPYE:
      return INITIAL_STATE;

    default:
      return state;
  }
};
