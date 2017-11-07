import _ from 'lodash';
import {
  FETCH_ACCOUNTS_LIST,
  FETCH_YANDEX_ACCOUNT_LIST,
  FETCH_VK_ACCOUNT_LIST,
  ACCOUNTS_DATE_CHANGED
} from '../actions/types';

const firstday = new Date()
firstday.setHours(0,0,0)
firstday.setFullYear(2016)

const lastday = new Date()
lastday.setHours(0,0,0)


const INITIAL_STATE = {
  yandex: [],
  vk: [],
  loadingYandex: true,
  loadingVk: true,
  date:{
    firstday: firstday,
    lastday: lastday
  }
}

export default function (state=INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_YANDEX_ACCOUNT_LIST:
      return {
        ...state,
        yandex: [action.payload],
        loadingYandex: false,
      }
    case ACCOUNTS_DATE_CHANGED:
      return {
        ...state,
        loadingYandex: true,
        date: action.payload
      }
    default:
      return state
  }
}
