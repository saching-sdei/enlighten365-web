/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { getItem } from './AsyncUtils';
import { Strings, APIUrls } from '../Constants';

//===============Stagging=============
// let BASE_URL = '';

//==========Local System====================
let BASE_URL = 'http://54.190.192.105:6009/api/';

//  'x-app-id': Strings.NUTRITION_X_APP_ID,
// 'x-app-key': Strings.NUTRITION_X_APP_KEY,

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Methods'] =
  'GET,PUT,POST,PATCH,DELETE,OPTIONS';
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true';
axios.defaults.headers.post['Access-Control-Allow-Headers'] =
  'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  async config => {
    try {
      console.log(' *************** Request Sent *****************');
      const userData = await getItem(Strings.KEY_USER_DATA);
      console.log('Auth >> ' + JSON.stringify(userData));
      if (userData) {
        config.headers.Authorization = userData.loginToken;
      }
      console.log(JSON.stringify(config));
      console.log(' *************** End of Request *****************');
    } catch (error) {
      console.log('ERROR ******* ', error);
    }

    return config;
  },
  error => {
    console.log(' *************** Error Response *****************');
    console.log(JSON.stringify(error));

    console.log(' *************** End of Error Response *****************');
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    // do something with the response data
    console.log(' *************** Response was received *****************');
    console.log(JSON.stringify(response));
    console.log(' *************** End of Response *****************');

    return response;
  },
  error => {
    console.log(' *************** Error Response *****************');
    console.log(JSON.stringify(error));
    console.log(' *************** End of Error Response *****************');
    // handle the response error
    return Promise.reject(error.response);
  },
);

export default instance;
