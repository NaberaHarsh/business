import { combineReducers } from 'redux'
import config from './config'
import dashboard from './dashboard';
import common from './common';

export default combineReducers({
  dashboard,
  config,
  common
})