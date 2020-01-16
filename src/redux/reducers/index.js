import { combineReducers } from 'redux'
import environment from './environment'
import dashboard from './dashboard';
import logs from './logs';

export default combineReducers({
  dashboard,
  environment,
  logs
})