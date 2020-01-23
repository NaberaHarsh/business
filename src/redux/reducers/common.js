import {REQUEST_START, REQUEST_FINISH} from '../actions/common';
const common = (state = {
  isLoading: false
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

    default:
      return state
  }
}
export default common