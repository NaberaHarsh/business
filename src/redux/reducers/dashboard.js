import {RCV_DASHBOARD_DATA, RCV_COMPONENT_SUMMARY_DATA} from '../actions/dashboard';
const dashboard = (state = {summaryData : []} , action) => {
  switch (action.type) {
  
    case RCV_DASHBOARD_DATA :

        return Object.assign({}, state, {
       
          summaryData: action.data,
          summaryComponent: action.componentSummary,
          lastUpdated: action.receivedAt
        });
      case RCV_COMPONENT_SUMMARY_DATA :

      return Object.assign({}, state, {
          dialogComponentSummary : action.data
      });
    


    default:
      return state
  }
}
export default dashboard