import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Icon from '@material-ui/core/Icon';

import Paper from '@material-ui/core/Paper';

const _ = require('lodash');
const moment = require('moment');


const date = () => {
  let d =   new Date('2019-12-12T13:26:36.122Z');
  console.log("d",d);

}



 export  const  DetailPane = (row,columns)  =>  (
  <div style={{
    width:'448px',
    overflowX : 'hidden',
    background:'#fafafa',
    padding: '24px'
  }} 
  > 

  <Paper>
  <table style={{width : '400px',
  border: '1px solid #000'
}}>

 
  <thead>
    <tr>
      <th style={{
        width:'100px',
        // borderBottom: '1px solid #000',
        // borderRight: '1px solid #000'
        background: '#efefef'


      }}>Item</th>
 <th style={{
        width:'300px',
        background: '#efefef'

      }}>Value</th>    </tr>
  </thead>

   <tbody> 
     
      {
    columns.map(column => (
      <tr key={column.name}>
        <td style={{
                  background: '#efefef',
                  padding:'12px'

        }}>{column.title}</td>
        <td style={{
          wordBreak: 'break-all',
          padding:'12px'

        }}>{column.title === "Timestamp" ? moment(new Date(_.get(row, column.dataPath))).format('MMMM Do YYYY, h:mm:ss a') : _.get(row, column.dataPath)}</td>
      </tr>
    ))
  }
  </tbody>

</table>
</Paper>
    <Paper>
 

      <pre

style={{
  padding:'12px',
  width : '400px' ,
  wordBreak: 'break-all',
  overflowX : 'auto'
 }}

    ><code>

      {JSON.stringify(row,undefined,4)}
    </code>
    </pre>
    </Paper>
  </div>
);