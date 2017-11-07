import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AccountsReducer from './AccountsReducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  accounts: AccountsReducer
});

export default rootReducer;
