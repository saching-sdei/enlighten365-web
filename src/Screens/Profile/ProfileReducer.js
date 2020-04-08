import ACTION_TYPES from '../../Actions/ActionTypes';
const INITIAL_STATE = {
  getProfileRes: '',
  statusCodeGetProfile: '',
  updateProfileRes: '',
  statusCodeUpdateProfile: '',
};
export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_PROFILE_DEATIL:
      return {
        ...state,
        getProfileRes: action.payload,
        statusCodeGetProfile: action.statusCode,
      };

    case ACTION_TYPES.UPDATE_PROFILE_DEATIL:
      return {
        ...state,
        updateProfileRes: action.payload,
        statusCodeUpdateProfile: action.statusCode,
      };

    case ACTION_TYPES.N_CLEAR_PROFILE:
      return INITIAL_STATE;

    default:
      return state;
  }
};
