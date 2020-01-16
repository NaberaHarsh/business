import {RCV_DASHBOARD_DATA} from '../actions/dashboard';
const dashboard = (state = {summaryData : []} , action) => {
  switch (action.type) {
  
    case RCV_DASHBOARD_DATA :

        return Object.assign({}, state, {
       
          summaryData: action.data,
          summaryComponent: action.componentSummary,
          lastUpdated: action.receivedAt
        });


    default:
      return state
  }
}
export default dashboard