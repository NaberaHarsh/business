import fetch from 'cross-fetch'
import {requestStart, requestFinish} from './common';
import {API_BASE_URL , PATH_LOGS } from '../../config';


export const RECEIVE_LOGS = 'RECEIVE_LOGS'
function recvLogs(json) {


  return {
    type: RECEIVE_LOGS,
    logs: json,
    receivedAt: Date.now()
  }
}

export const REFRESH_LOGS = 'REFRESH_LOGS'

function refreshingLogs(isTrue){
  return {
    type: REFRESH_LOGS,
    isRefreshing: isTrue
  }
}





export function fetchLogs() {

  return function(dispatch) {
   
    dispatch(refreshingLogs(true))

    return fetch(`${API_BASE_URL}${PATH_LOGS}`,{
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+localStorage.getItem('authToken')
      }
        })
      .then(
        response => response.json(),
       
        error => {
          dispatch(refreshingLogs(false))

          console.log('An error occurred.', error)
        }
      )
      .then(json =>{
        dispatch(recvLogs(json))

        dispatch(refreshingLogs(false))
      }
       
      

      )
  }
}