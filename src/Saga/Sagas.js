/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import {
  put,
  call,
  takeEvery,
  takeLatest,
  select,
  cps,
} from 'redux-saga/effects';
import API from '../Constants/APIUrls';
import API_CONST from '../Constants/APIConstants';
import ACTION_TYPES from '../Actions/ActionTypes';
import axiosConfigNutritionX from '../Utils/AxiosConfigNutritionX';
import axiosConfig from '../Utils/AxiosConfig';
import Strings from '../Constants/Strings';
import axios from 'axios';

/** function that returns an axios call */
function requestApi(type, url, params, headers) {
  return axiosConfig.request({
    method: type,
    url: url,
    data: params,
    headers: headers,
  });
}

function requestApiNutritionX(type, url, params, headers) {
  return axiosConfigNutritionX.request({
    method: type,
    url: url,
    data: params,
    headers: headers,
  });
}

//get response json
const _extJSON = p => {
  return p.then(res => res);
};

function* loginUser(action) {
  try {
    var postData = action.data;
    let response = yield call(requestApi, 'POST', API.LOGIN_USER, postData);
    console.log('Res Login saga>>> ' + JSON.stringify(response));

    let status = response.data.statusCode;
    let responseData = '';

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.LOGIN_USER,
      payload: responseData,
      statusCode: status,
    });
  } catch (err) {
    alert(JSON.stringify(err.data.message));
    console.log('LOgin Error PRIYANKA >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.LOGIN_USER,
      payload: err,
    });
  }
}

function* registerUser(action) {
  try {
    var postData = action.data;
    let response = yield call(requestApi, 'POST', API.REGISTER_USER, JSON.stringify(postData));
    console.log('Res >>> ' + JSON.stringify(response));

    let status = response.data.statusCode;
    let responseData = '';

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.REGISTER_USER,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log('registerUser Error >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.REGISTER_USER,
      payload: err,
    });
  }
}

function* getFoodDetailsNutrition(action) {
  try {
    var postData = action.data
    // eslint-disable-next-line prettier/prettier
    let response = yield call(requestApiNutritionX, 'POST', API.GET_FOOD_DETAILS_NUTRITION, postData);
    let status = response.status;
    let responseData = '';
    console.log('getFoodDetailsNutrition SAGA>>>', JSON.stringify(response));
    // responseData = response.data;
    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data;
      yield put({
        type: ACTION_TYPES.GET_FOOD_DETAILS_NUTRITION,
        payload: responseData,
        statusCode: status,
      });
    } else {
      responseData = response.message;
      yield put({
        type: ACTION_TYPES.GET_FOOD_DETAILS_NUTRITION,
        payload: responseData,
        statusCode: status,
      });
      // alert(response.message);
    }

  } catch (err) {
    alert(JSON.stringify(err));
    console.log('registerUser Error >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_FOOD_DETAILS_NUTRITION,
      payload: err,
    });
  }
}


//getFoodListNutrition
function* getFoodListNutrition(action) {
  try {
    var postData = action.data;
    // eslint-disable-next-line prettier/prettier 
    let response = yield call(requestApiNutritionX, 'GET', API.GET_FOOD_LIST_NUTRITION + postData.query);
    let responseData = '';
    // console.log('responseJson SAGA>>>', JSON.stringify(response));
    responseData = response.data.common;

    yield put({
      type: ACTION_TYPES.GET_FOOD_LIST_NUTRITION,
      payload: responseData,
      statusCode: '',
    });
  } catch (err) {
    alert(JSON.stringify(err));
    // console.log('registerUser Error >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_FOOD_LIST_NUTRITION,
      payload: err,
    });
  }
}

//getProfileDetails
function* getProfileDetails(action) {
  try {
    var postData = action.data;
    let response = yield call(
      requestApi,
      'GET',
      API.GET_PROFILE_DETAILS + postData.userId
    );
    console.log('Res profile >>> ' + JSON.stringify(response));
    let status = response.data.statusCode;
    let responseData = '';

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }
    yield put({
      type: ACTION_TYPES.GET_PROFILE_DEATIL,
      payload: responseData,
      statusCode: status,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log('GET_PROFILE_DEATIL Error >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_PROFILE_DEATIL,
      payload: err,
    });
  }
}

function* updateProfileDetails(action) {
  try {
    var postData = action.data;
    let response = yield call(requestApi, 'POST', API.UPDATE_PROFILE_DETAILS, postData);
    console.log('Res >>> ' + JSON.stringify(response));

    let status = response.data.code;
    let responseData = '';

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.UPDATE_PROFILE_DEATIL,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log('registerUser Error >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.UPDATE_PROFILE_DEATIL,
      payload: err,
    });
  }
}

function* getRecommededCal(action) {
  try {
    var postData = action.data;
    let response = yield call(requestApi, 'GET', API.GET_RECOMMEDED_CAL + postData);

    // console.log('Res recommeded >>> ' + JSON.stringify(response));

    let status = response.data.statusCode;
    let responseData = '';

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.GET_RECOMMED_CAL,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log('registerUser Error >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_RECOMMED_CAL,
      payload: err,
    });
  }
}


function* saveNutritionFood(action) {
  try {
    var postData = action.data;
    let response = yield call(requestApi, 'POST', API.SAVE_NUTRITION_FOOD_DATA, postData);
    console.log('Res >>> ' + JSON.stringify(response));

    let status = response.data.statusCode;
    let responseData = '';

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.SAVE_NUTRITION_FOOD,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log('SAVE_NUTRITION_FOOD Error >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.SAVE_NUTRITION_FOOD,
      payload: err,
    });
  }
}

function* getFoodByDate(action) {
  try {
    var postData = action.data;
    console.log(postData, 'postdata get by date');
    // let response = yield call(requestApi, 'GET', API.GET_FOOD_BY_DATE + postData.id + '/2020-04-01');
    let response = yield call(requestApi, 'GET', API.GET_FOOD_BY_DATE + postData.id + '/' + postData.date);
    console.log(JSON.stringify(response), 'response get by date');

    let status = response.data.statusCode;
    let responseData = '';

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.GET_FOOD_BY_DATE,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log('registerUser Error >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_FOOD_BY_DATE,
      payload: err,
    });
  }
}

function* getRecentFood(action) {
  try {
    var postData = action.data;
    let response = yield call(requestApi, 'GET', API.GET_FOOD_RECENT + postData);

    let status = response.data.statusCode;
    let responseData = '';

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.GET_FOOD_RECENT,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log('registerUser Error >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_FOOD_RECENT,
      payload: err,
    });
  }
}

function* getFrequentFood(action) {
  try {
    var postData = action.data;
    let response = yield call(requestApi, 'GET', API.GET_FOOD_FREQUENT + postData);

    let status = response.data.statusCode;
    let responseData = '';

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.GET_FOOD_FREQUENT,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log('registerUser Error >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_FOOD_FREQUENT,
      payload: err,
    });
  }
}

//deleteFood
function* deleteFood(action) {
  try {
    var postData = action.data;
    let response = yield call(requestApi, 'POST', API.DELETE_FOOD, postData);

    let status = response.data.statusCode;
    let responseData = '';

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.DELETE_FOOD,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log('registerUser Error >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.DELETE_FOOD,
      payload: err,
    });
  }
}


//========== Sell product =============

function* rootSaga() {
  yield takeLatest(API_CONST.N_LOGIN_USER, loginUser);
  yield takeLatest(API_CONST.N_REGISTER_USER, registerUser);
  yield takeLatest(API_CONST.N_GET_FOOD_DETAILS_NUTRITION, getFoodDetailsNutrition);
  yield takeLatest(API_CONST.N_GET_FOOD_LIST_NUTRITION, getFoodListNutrition);
  yield takeLatest(API_CONST.N_GET_PROFILE_DETAILS, getProfileDetails);
  yield takeLatest(API_CONST.N_UPDATE_PROFILE_DETAILS, updateProfileDetails);
  yield takeLatest(API_CONST.N_GET_RECOMMEDE_CAL, getRecommededCal);
  yield takeLatest(API_CONST.N_SAVE_NUTRITION_FOOD_DETAILS, saveNutritionFood);
  yield takeLatest(API_CONST.N_GET_FOOD_BY_DATE, getFoodByDate);
  yield takeLatest(API_CONST.N_GET_FOOD_RECENT, getRecentFood);
  yield takeLatest(API_CONST.N_GET_FOOD_FREQUENT, getFrequentFood);

  yield takeLatest(API_CONST.N_DELETE_FOOD, deleteFood);
}

export default rootSaga;
