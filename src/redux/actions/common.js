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

