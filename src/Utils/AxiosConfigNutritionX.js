/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Strings, APIUrls } from '../Constants';

//===============Stagging=============
// let BASE_URL = '';

//==========Local System====================
let BASE_URL_NUTRITION = 'https://trackapi.nutritionix.com/v2/';

axios.defaults.headers.common['Content-Type'] = 'Content-Type';
axios.defaults.headers.common['x-app-id'] = Strings.NUTRITION_X_APP_ID;
axios.defaults.headers.common['x-app-key'] = Strings.NUTRITION_X_APP_KEY;

const instance = axios.create({
  baseURL: BASE_URL_NUTRITION,
  timeout: 20000,
});

instance.interceptors.request.use(
  async config => {
    try {
      // console.log('config >>', JSON.stringify(config));
      console.log(' *************** End of Request *****************');
    } catch (error) {
      console.log('ERROR config ******* ', error);
    }

    return config;
  },
  error => {
    console.log(' *************** Error Response *****************');
    // console.log('Error interceptors', JSON.stringify(error));

    console.log(' *************** End of Error Response *****************');
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    // do something with the response data
    console.log(' *************** Response was received *****************');
    // console.log(JSON.stringify(response));
    console.log(' *************** End of Response *****************');

    return response;
  },
  error => {
    console.log(' *************** Error Response *****************');
    // console.log(JSON.stringify(error));
    console.log(' *************** End of Error Response *****************');
    // handle the response error
    return Promise.reject(error.response);
  },
);

export default instance;
