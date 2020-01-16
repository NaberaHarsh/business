import {RECEIVE_LOGS, REFRESH_LOGS} from '../actions/logs';
import { act } from 'react-dom/test-utils';
const logs = (state = {} , action) => {
  switch (action.type) {
    

    case RECEIVE_LOGS :

        if(action.logs === undefined)action['logs'] = [];
        let oldLogs = [];
        if(state.logs){
          oldLogs = state.logs;
        }


        if(oldLogs.length > 0){
        let newUniqueLogs = [];

        action.logs.map((envLogs,index) => {
            let logs = envLogs.json_data.aggregations.messages.buckets;

            let tempOldLogs = [];

            if(typeof oldLogs[index] !== 'undefined')
              tempOldLogs = oldLogs[index].json_data.aggregations.messages.buckets;


             newUniqueLogs = logs.filter(log => {
             let isExist =  tempOldLogs.filter(tLog => log.key === tLog.key);

             return isExist.length == 0;
            })  ;



            newUniqueLogs.map(log => log.isNew = true);

            console.log("new unique logs" , newUniqueLogs);

            envLogs.json_data.aggregations.messages.buckets = [...newUniqueLogs, ...tempOldLogs];
        });

      }else{
        action.logs.map(envLogs => {
          envLogs.json_data.aggregations.messages.buckets.map(log => log.isNew = false);
        })
        
      }
        return Object.assign({}, state, {
       
          logs: action.logs,
          isRefreshing: false,
          lastUpdated: action.receivedAt
        });
    case REFRESH_LOGS :

    return Object.assign({}, state, {
    
        isRefreshing: action.isRefreshing
    });
    


    default:
      return state
  }
}
export default logs