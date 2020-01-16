import {RECEIVE_ENV} from '../actions/envirorment';
const environment = (state = {} , action) => {
  switch (action.type) {
    case 'SET_ENVIRONMENT':
      return Object.assign({}, state, {
       
        selectedEnv : action.env,
      });

    case RECEIVE_ENV :

        return Object.assign({}, state, {
       
          env: action.env,
          selectedEnv : action.env != null && action.env.length > 0 ? action.env[0] : {},
          lastUpdated: action.receivedAt
        });


    default:
      return state
  }
}
export default environment