import fetch from 'cross-fetch'
import {requestStart, requestFinish} from './common';
import {API_BASE_URL , PATH_DASHBOARD , PATH_COMPONENT_SUMMARY} from '../../config';


export const RCV_DASHBOARD_DATA = 'RCV_DASHBOARD_DATA';
export const RCV_COMPONENT_SUMMARY_DATA = 'RCV_COMPONENT_SUMMARY_DATA'

function recvData(json) {


  return {
    type: RCV_DASHBOARD_DATA,
    data: json.dashboard,
    componentSummary: json.component,
    receivedAt: Date.now()
  }
}


function recvComponentSummaryData(json) {


  return {
    type: RCV_COMPONENT_SUMMARY_DATA,
    data: json
    }
}


export function clearComponentSummary(){
 
  return { type: RCV_COMPONENT_SUMMARY_DATA,
    data: []
  };
};



export function fetchDashboardData() {

  return function(dispatch) {
   
    dispatch(requestStart())
 
    return fetch(`${API_BASE_URL}${PATH_DASHBOARD}?cache=${1}`,{
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
      .then(json => {
        dispatch(recvData(json));

        dispatch(requestFinish());

      }
       
      )
  }
}


export function fetchComponentSummary(envId) {

  return function(dispatch) {
   
    dispatch(requestStart())
 
    return fetch(`${API_BASE_URL}${PATH_COMPONENT_SUMMARY}/${envId}`,{
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
      .then(json => {
        dispatch(recvComponentSummaryData(json));

        dispatch(requestFinish());

      }
       
      )
  }
}



