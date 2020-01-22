import {RECEIVE_ENV_SETTING} from '../actions/settingCompare';
const configCompare = (state = {} , action) => {
  switch (action.type) {
   
    case RECEIVE_ENV_SETTING :

        if(action.isPrimary)
        return Object.assign({}, state, {
          envPrimaryConfig : action.data
               });
        else
        return Object.assign({}, state, {
          envSecondaryConfig : action.data
               });       


    default:
      return state
  }
}
export default configCompare