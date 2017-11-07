import axios from 'axios';

import {
  LOGIN_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  root
} from './types'

export const loginChanged = (text) => {
  return {
    type: LOGIN_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const isLoggedIn = () => {
  const URL = `${root}/isloggedin`
  axios.defaults.withCredentials = true
  return (dispatch) => {
    axios({
      method: 'get',
      url: URL,
    })
    .then(function(responce){
      loginUserSuccess(dispatch, responce.data)
    })
    .catch(function(error) {
      console.log(error)
    })
  }
}


export const loginUser = ({ login, password }, callback) => {
  console.log("Loggin")
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })
    const URL = `${root}/loginsubmit`
    axios.defaults.withCredentials = true
    axios({
      method: 'post',
      url: URL,
      data: {
        username: login,
        password: password
      },
      withCredentrials: true
    })
    .then(function(responce) {
      console.log(responce)
      callback()
      loginUserSuccess(dispatch, login)
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        loginUserFail(dispatch, error.response.data)

      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        loginUserFail(dispatch, 'The request was made but no response was received')

      } else {
        // Something happened in setting up the request that triggered an Error
        loginUserFail(dispatch, 'Error')
      }
    });
  }
}

export const loginUserFail = (dispatch, e) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: e })
}

export const loginUserSuccess = (dispatch, e) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: e })
}
