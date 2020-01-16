import { useTheme ,makeStyles} from '@material-ui/core/styles';
import Chart from "react-google-charts";
import axios from "axios";
import React, { useState, useReducer, useEffect } from "react";
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';


const _ = require('lodash');
const moment = require('moment');

const drawerWidth = 200;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 380,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

export default function BarChart({dashboard}) {



  const classes = useStyles();

  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [counts, addCounts] = useState([["Component Name","Error Count", { role: "style" }]]);
  const [countLog, addCountLog] = useState([["Component Name","Error Count", { role: "style" }]]);




  const [isDense, setDense] = useState(true);
  const [isLoading, setLoading] = useState(true);


  const handleChange = name => event => {

    console.log(countLog, counts);
    setDense(event.target.checked);

    
  };



  if(dashboard == undefined || dashboard === {} ){

    if(!isLoading)
    setLoading(true);
  }else{
    setLoading(false);
  }

  console.log(dashboard);

  
  if(isLoading){
    return (
      <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );

  }




  return (
      <div>
       <Switch
        checked={isDense}
        onChange={handleChange()}
        value="checkedB"
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />       
                <Paper className={fixedHeightPaper}>
                  <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Date', 'INFO', 'ERROR', 'DEBUG'],
                      ...dashboard[0].json_data.map(item => {
                        let row = [moment(new Date(item['capture_date'])).format('D-M-Y'),
                        item['json_output']['aggregations']['severity']['buckets'][0]['doc_count'],
                        item['json_output']['aggregations']['severity']['buckets'][1]['doc_count'],
                        item['json_output']['aggregations']['severity']['buckets'][2]['doc_count']
                        ];
                        // console.log(moment(new Date(item['capture_date'])).format("MMMM Do"));

                        return row;
                      })
                    ]}
                    options={{
                      // Material design options
                      chart: {
                        title: `LOG SUMMARY | ${dashboard[0].name != null  ? dashboard[0].name : ''}`,
                        subtitle: `ELASTIC COUNT DATA FOR LAST 7 DAYS ( ${dashboard[0].json_data.length > 0 ? moment(new Date(dashboard[0].json_data[dashboard[0].json_data.length - 1]['capture_date'])).format('D-M-Y') : ''} - ${dashboard[0].json_data.length > 0 ? moment(new Date(dashboard[0].json_data[0]['capture_date'])).format('D-M-Y') : ''} )`,
                      },
                    }}
                  // For tests
                  />


                </Paper>

      </div>
  );
}