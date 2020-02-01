import {API_BASE_URL } from '../../config';

export const REQUEST_START = 'API_REQUEST_START'
export function requestStart() {
  return {
    type: REQUEST_START,
    isLoading: true
  }
}
export const REQUEST_FINISH = 'API_REQUEST_FINISH'
export function requestFinish() {
  return {
    type: REQUEST_FINISH,
    isLoading: false
    
  }
}


export const AUTH_COMPLETE = 'AUTH_COMPLETE'
export function authComplete(data) {

  const isAuthSuccess = data.success;
  
  return {
    type: AUTH_COMPLETE,

    data: data,
    isAuth: isAuthSuccess,
    authErrorMessage: isAuthSuccess ? '' : data.err
    
  }
}


export function authUser(data) {

  return function(dispatch) {
   
    dispatch(requestStart())
 
    return fetch(`${API_BASE_URL}`,{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) 
    })
      .then(
        response => response.json(),
       
        error => console.log('An error occurred.', error)
      )
      .then(json =>{

        dispatch(requestFinish());
        dispatch(authComplete(json));
      }
       
      )
  }
}

