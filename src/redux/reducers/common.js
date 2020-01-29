import {REQUEST_START, REQUEST_FINISH,AUTH_COMPLETE } from '../actions/common';
import ls from 'local-storage'

const common = (state = {
  isLoading: false,
  isAuth: false
} , action) => {
  switch (action.type) {
    case REQUEST_START:
      return Object.assign({}, state, {
       
        isLoading : action.isLoading,
      });

    case REQUEST_FINISH:
      return Object.assign({}, state, {
        
        isLoading : action.isLoading,
      });
    case AUTH_COMPLETE:


        if(action.isAuth)
        localStorage.setItem('authToken', action.data.token);

        return Object.assign({}, state, {
          
          authData : action.data,
          isAuth: action.isAuth,
          authErrorMessage: action.authErrorMessage
        });
    default:
      return state
  }
}
export default common