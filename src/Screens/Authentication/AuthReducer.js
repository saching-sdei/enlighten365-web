import ACTION_TYPES from '../../Actions/ActionTypes';
const INITIAL_STATE = {
  signInRes: '',
  statusCodeSigIn: '',
  registerRes: '',
  statusCode: '',
  forgotPasswordRes: '',
  statusFCode: '',
  recommededCalRes: '',
};
export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_USER:
      return {
        ...state,
        signInRes: action.payload,
        statusCodeSigIn: action.statusCode,
      };

    case ACTION_TYPES.REGISTER_USER:
      console.log('Res in AUTH ++++ ', action.payload);
      return {
        ...state,
        registerRes: action.payload,
        statusCode: action.statusCode,
      };

    case ACTION_TYPES.GET_RECOMMED_CAL:
      console.log('Res in AUTH cal++++ ', action.payload);
      return {
        ...state,
        recommededCalRes: action.payload,
      };

    case ACTION_TYPES.CLEAR_AUTH:
      return INITIAL_STATE;

    default:
      return state;
  }
};
