import {RECEIVE_ENV, RECEIVE_LOOKUP} from '../actions/config';
const environment = (state = {
  lookup: {
    client:[],
    environment:[],
    component: []

  }
} , action) => {
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

    case RECEIVE_LOOKUP :

      return Object.assign({}, state, {
      
        lookup: action.lookup,
       
      });        


    default:
      return state
  }
}
export default environment