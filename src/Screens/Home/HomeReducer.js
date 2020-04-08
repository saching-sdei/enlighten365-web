import ACTION_TYPES from '../../Actions/ActionTypes';
const INITIAL_STATE = {
  statusCodeFoodDate: '',
  getFoodByDateRes: '',
  getDeleteFoodRes: '',
  statusCodeDeleteFood: '',
};
export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_FOOD_BY_DATE:
      // console.log()
      return {
        ...state,
        getFoodByDateRes: action.payload,
        statusCodeFoodDate: action.statusCode,
      };

    // case ACTION_TYPES.CLEAR_AUTH:
    //   return INITIAL_STATE;
    case ACTION_TYPES.DELETE_FOOD:
      // console.log()
      return {
        ...state,
        getDeleteFoodRes: action.payload,
        statusCodeDeleteFood: action.statusCode,
      };

    default:
      return state;
  }
};
