import fetch from 'cross-fetch'
import {requestStart, requestFinish} from './common';
import {API_BASE_URL , PATH_DASHBOARD } from '../../config';


export const RCV_DASHBOARD_DATA = 'RCV_DASHBOARD_DATA'
function recvData(json) {


  return {
    type: RCV_DASHBOARD_DATA,
    data: json.dashboard,
    componentSummary: json.component,
    receivedAt: Date.now()
  }
}





export function fetchDashboardData() {

  return function(dispatch) {
   
    dispatch(requestStart())
 
    return fetch(`${API_BASE_URL}${PATH_DASHBOARD}`)
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



