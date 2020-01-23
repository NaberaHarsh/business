import { combineReducers } from 'redux'
import config from './config'
import dashboard from './dashboard';
import logs from './logs';
import configCompare from './settingCompare';
import common from './common';

export default combineReducers({
  dashboard,
  config,
  logs,
  configCompare,
  common
})