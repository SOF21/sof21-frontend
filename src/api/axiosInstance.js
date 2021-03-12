import axios from 'axios';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

const API_ENDPOINT = env.REACT_APP_API_ENDPOINT

const api = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 2000,
  headers: {'Content-Type': 'application/json'}

});

api.interceptors.request.use (
  function (config) {
    const token       = localStorage.getItem('access-token');
    const client      = localStorage.getItem('client');
    const uid         = localStorage.getItem('uid');
    const expiry      = localStorage.getItem('expiry');
    const token_type  = localStorage.getItem('token-type');
    const locale      = localStorage.getItem('sofLang');


    if (token){
      config.headers['access-token'] = token;
      config.headers['client'] = client;
      config.headers['uid']    = uid;
      config.headers['expiry'] = expiry;
      config.headers['token-type'] = token_type;
      config.headers['locale'] = locale;
    }
    return config;
  },
  function (error) {
    return Promise.reject (error);
  }
);

export default api;
