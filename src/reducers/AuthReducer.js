import {
  LOGIN_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  login: '',
  password: '',
  error: '',
  loading: false,
  user: '',
  logged: false,
}

export default function (state=INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN_CHANGED:
      return { ...state, login: action.payload, error: '' }
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, error: '' }
    case LOGIN_USER:
      return { ...state, error: '', loading: true}
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, logged: true }
    case LOGIN_USER_FAIL:
      return { ...state, password: '', error: action.payload, loading: false }
    default:
      return state;
  }
}
