import fetch from 'cross-fetch'
import {requestStart, requestFinish} from './common';
import {API_BASE_URL , PATH_ENV, PATH_LOOKUP } from '../../config';


export const RECEIVE_ENV = 'RECEIVE_ENV'
export const RECEIVE_LOOKUP = 'RECEIVE_LOOKUP'

function recvEnv(json) {


  return {
    type: RECEIVE_ENV,
    env: json,
    receivedAt: Date.now()
  }
}


function recvLookup(json) {


  return {
    type: RECEIVE_LOOKUP,
    lookup: json  }
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


export function fetchLookupData() {

  return function(dispatch) {
   
 
    return fetch(`${API_BASE_URL}${PATH_LOOKUP}`,{
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
      .then(json =>
       
        dispatch(recvLookup(json))
      )
  }
}