import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import {DetailPane} from './DetailPane';
import { SelectionState,
  VirtualTableState
 } from '@devexpress/dx-react-grid';


import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  VirtualTable,

} from '@devexpress/dx-react-grid-material-ui';

const _ = require('lodash');
const moment = require('moment');


const VIRTUAL_PAGE_SIZE = 10;
const URL = 'http://localhost:3000/search';


const initialState = {
  rows: [],
  skip: 0,
  requestedSkip: 0,
  take: VIRTUAL_PAGE_SIZE ,
  totalCount: 0,
  loading: false,
  lastQuery: '',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case 'UPDATE_ROWS':
      return {
        ...state,
        ...payload,
        rows : [...state.rows,...payload.rows],
        loading: false,
      };
    case 'START_LOADING':
      return {
        ...state,
        requestedSkip: payload.requestedSkip,
        take: payload.take,
      };
    case 'REQUEST_ERROR':
      return {
        ...state,
        loading: false,
      };
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
      };
    case 'UPDATE_QUERY':
      return {
        ...state,
        lastQuery: payload,
      };
    default:
      return state;
  }
}


export const ExcelGrid = () => {

  const [state, dispatch] = useReducer(reducer, initialState);


  // new Date(row._source['@timestamp']).getUTCDate()
  const [columns] = useState([
    { name: '_index', title: 'Index' ,dataPath : "_index"},
    { name: '_id', title: 'Id' ,dataPath : "_id"},
    { name: 'severity', title: 'Severity',
    getCellValue: row => (row._source.severity),
    dataPath : "_source.severity"
  },

  { name: 'correlationId', title: 'Correlation Id',
    getCellValue: row => (row._source.correlationid),
    dataPath : "_source.correlationid"
  },

  
  { name: '_type', title: 'DocType',     dataPath : "_type"
},

    { name: 'messagecode', title: 'Message Code',

    getCellValue: row => (row._source.messagecode),
    dataPath : "_source.messagecode"

  },
    { name: 'message', title: 'Message',
    getCellValue: row => (row._source.message),
    dataPath : "_source.message"

  },
    { name: '@timestamp', title: 'Timestamp' ,
    getCellValue: row => (moment(new Date(row._source['@timestamp'])).format('MMMM Do YYYY, h:mm:ss a')),
    dataPath : "_source.@timestamp"

  },
    { name: 'componentname', title: 'Component Name' ,
    getCellValue: row => (row._source.componentname),
    dataPath : "_source.componentname"

  },


  ]);


  const [selection, setSelection] = useState([]);


  const [detailPaneOpen, toggleDetailPane] = useState(false);



  const toggleDrawer = (open) => event => {
    console.log("toggle called");
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }




      toggleDetailPane(open);

   
  };




 





  const getRemoteRows = (requestedSkip, take) => {
    console.log(requestedSkip,take);
    dispatch({ type: 'START_LOADING', payload: { requestedSkip, take } });
  };



  const loadData = () => {
    const {
      requestedSkip, loading,
    } = state;
    const query = URL;
    if (!loading) {
      dispatch({ type: 'FETCH_INIT' });

      axios
      .get( URL )
      .then(({ data }) => {
        dispatch({
          type: 'UPDATE_ROWS',
          payload: {
            rows: data.hits.hits,
            totalCount: state.rows.length + data.length
          },
        });
      });


     
      dispatch({ type: 'UPDATE_QUERY', payload: query });
    }
  };

  useEffect(() => loadData(),[]);

  const {
    rows, skip, totalCount, loading,
  } = state;


  console.log(detailPaneOpen);

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >

        <SelectionState
          selection={selection}
          onSelectionChange={(selection) => {
            if(selection.length > 0)
            toggleDetailPane(!detailPaneOpen);

            setSelection( selection.length > 0 ? [selection[selection.length -1]]: []);
          }}
        />
       

        <VirtualTableState
          loading={loading}
          totalRowCount={totalCount}
          pageSize={VIRTUAL_PAGE_SIZE}
          skip={skip}
          getRows={getRemoteRows}
        />


              <VirtualTable 
              columnExtensions={[
                {columnName: 'componentname',wordWrapEnabled: false, width: '200'},
                {columnName: '_index',wordWrapEnabled: false, width: '260'},
                {columnName: '_id',wordWrapEnabled: false, width: '200'},
                {columnName: 'severity',wordWrapEnabled: false, width: '80'},
                {columnName: '_type',wordWrapEnabled: false, width: '80'},
                {columnName: 'messagecode',wordWrapEnabled: false, width: '80'},
                {columnName: 'correlationId',wordWrapEnabled: true, width: '200'},


      
      
              ]}
              height={700}
              />

        <TableHeaderRow />
        <TableSelection
          selectByRowClick
        />
      </Grid>
        <Drawer 
        anchor="right" 
        open={detailPaneOpen} 
        onClose={toggleDrawer(false)}>
        {
        rows.length > 0 ? DetailPane(rows[selection[0]],columns) : ''
        }      
        </Drawer>
    </Paper>
  );
};