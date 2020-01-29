import fetch from 'cross-fetch'
import {requestStart, requestFinish, REQUEST_FINISH} from './common';
import {API_BASE_URL , PATH_ENV_SETTING } from '../../config';


export const RECEIVE_ENV_SETTING = 'RECEIVE_ENV_SETTING'
function recvEnv(json, isPrimaryEnv) {

  if(isPrimaryEnv)
  return {
    type: RECEIVE_ENV_SETTING,
    data: json,
    isPrimary : true
    }
  else
  return {
    type: RECEIVE_ENV_SETTING,
    data: json,
    isPrimary : false

    }
}




export function fetchEnvSetting(params) {

  return function(dispatch) {
   
    dispatch(requestStart())
 
    return fetch(`${API_BASE_URL}${PATH_ENV_SETTING}${params.envId}/${params.componentId}`,{
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+localStorage.getItem('authToken')
      }
        })
      .then(
        response => response.json(),
       
        error => console.log('An error occurred.', error)
      )
      .then(json =>{

        dispatch(requestFinish());
        dispatch(recvEnv(json, params.isPrimary));
      }
       
      )
  }
}