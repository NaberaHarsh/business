import fetch from 'cross-fetch'
import {requestStart, requestFinish} from './common';
import {API_BASE_URL , PATH_ENV } from '../../config';


export const RECEIVE_ENV = 'RECEIVE_ENV'
function recvEnv(json) {


  return {
    type: RECEIVE_ENV,
    env: json,
    receivedAt: Date.now()
  }
}
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}


export const setEnvironment = environment => ({
  type: 'SET_ENVIRONMENT',
  environment
})



export function fetchEnvironments() {

  return function(dispatch) {
   
    dispatch(requestStart())
 
    return fetch(`${API_BASE_URL}${PATH_ENV}`)
      .then(
        response => response.json(),
       
        error => console.log('An error occurred.', error)
      )
      .then(json =>
       
        dispatch(recvEnv(json))
      )
  }
}