import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Chart from "react-google-charts";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listItems';
import { ExcelGrid } from './ExcelGrid';
import CCErrorCount from './CCErrorCount';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import BarChart from './BarChart';

import LiveLogs  from './LiveLogs';


import { connect } from 'react-redux'

import environment from '../redux/reducers/environment'
import { setEnvironment } from '../redux/actions/envirorment';
import { fetchDashboardData } from '../redux/actions/dashboard';



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


const lineChartData = {
  "id": 3,
  "name": "vv-prod-shore",
  "index_name": "applog-*",
  "is_active": true,
  "created": "2019-12-23T11:56:02.909Z",
  "els_url": "http://10.15.2.248:9200/",
  "json_data": [
    {
      "component": "contentmanagement-service",
      "data": [
        {
          "error_count": "2073",
          "component_name": "contentmanagement-service",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "ship service",
      "data": [
        {
          "error_count": "742",
          "component_name": "ship service",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "IdentityAccessManagementService",
      "data": [
        {
          "error_count": "2",
          "component_name": "IdentityAccessManagementService",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "dxp-core-ars-service",
      "data": [
        {
          "error_count": "1577",
          "component_name": "dxp-core-ars-service",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "dxp-core-referencedataservice",
      "data": [
        {
          "error_count": "40",
          "component_name": "dxp-core-referencedataservice",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "BookVoyage-UI",
      "data": [
        {
          "error_count": "26",
          "component_name": "BookVoyage-UI",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "vv-batchjob-service",
      "data": [
        {
          "error_count": "2113",
          "component_name": "vv-batchjob-service",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "bookvoyage-bff",
      "data": [
        {
          "error_count": "23",
          "component_name": "bookvoyage-bff",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "user-account-service",
      "data": [
        {
          "error_count": "13",
          "component_name": "user-account-service",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "Reservation-Service",
      "data": [
        {
          "error_count": "11",
          "component_name": "Reservation-Service",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "dxp-core-salesoffer-service",
      "data": [
        {
          "error_count": "1",
          "component_name": "dxp-core-salesoffer-service",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "DXP.RulesEngine.UI",
      "data": [
        {
          "error_count": "3",
          "component_name": "DXP.RulesEngine.UI",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "dxp-batchjob-cbs-guest",
      "data": [
        {
          "error_count": "17",
          "component_name": "dxp-batchjob-cbs-guest",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "dxp-retry-scheduler",
      "data": [
        {
          "error_count": "92",
          "component_name": "dxp-retry-scheduler",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "Hydration service",
      "data": [
        {
          "error_count": "46",
          "component_name": "Hydration service",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "dxp-external-batchjobs",
      "data": [
        {
          "error_count": "16",
          "component_name": "dxp-external-batchjobs",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    },
    {
      "component": "Embarkation-Service",
      "data": [
        {
          "error_count": "23",
          "component_name": "Embarkation-Service",
          "capture_date": "2020-01-05T18:30:00.000Z"
        }
      ]
    }
  ]
};

const Dashboard = ({ fetchDashboardData,dashboard, env, component }) => {




  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [page, setPage] = React.useState(1);


  const handlePageChange = (number) => {

    console.log(number);

    setPage(number);


  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };


  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  if (dashboard == null || dashboard.length == 0) {
    dashboard = [{ json_data: [] }, { json_data: [] }, { json_data: [] }];
  }

    if(component){
      
    }



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            DXP MONITORING
          </Typography>


          <div className={classes.sectionDesktop}>

            <Button
              color="inherit"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >Login</Button>

          </div>

        </Toolbar>
      </AppBar>
      {renderMenu}

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems(handlePageChange)}</List>
      </Drawer>
     
     
     
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          {{
            true: <Grid container spacing={1}>
              
              <Grid item xs={6} spacing={1}>



         

              <Grid item xs={12}>


              <Paper className={fixedHeightPaper}>

            <div>
                     { `LOG SUMMARY | ${dashboard[0].name != null  ? dashboard[0].name.toUpperCase() : ''}`}<br></br>
                       {/* { `ELASTIC COUNT DATA FOR LAST 15 DAYS ( ${dashboard[0].json_data.length > 0 ? moment(new Date(dashboard[0].json_data[dashboard[0].json_data.length - 1]['capture_date'])).format('D-M-Y') : ''} - ${dashboard[0].json_data.length > 0 ? moment(new Date(dashboard[0].json_data[0]['capture_date'])).format('D-M-Y') : ''} )`} */}
                      {`ELASTIC COUNT DATA FOR LAST 15 DAYS`}
                         </div>
                    <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Date', 'INFO', 'ERROR', 'DEBUG'],
                      ...dashboard[0].json_data.map(item => {
                        let row = [moment(new Date(item['capture_date'])).format('DD MMM'),
                        item['json_output']['aggregations']['severity']['buckets'][0]['doc_count'],
                        item['json_output']['aggregations']['severity']['buckets'][1]['doc_count'],
                        item['json_output']['aggregations']['severity']['buckets'][2]['doc_count']
                        ];
                        // console.log(moment(new Date(item['capture_date'])).format("MMMM Do"));

                        return row;
                      })
                    ]}
                    options={{
                      series: {
                        1: { curveType: 'function' },
                      },
                               vAxis: { scaleType: 'log', format:'short'}

                     
                    }}
                  // For tests
                  />


                </Paper>              
                
                </Grid>





              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>

                <div>
                     { `LOG SUMMARY | ${dashboard[0].name != null  ? dashboard[1].name.toUpperCase() : ''}`}<br></br>
                       {/* { `ELASTIC COUNT DATA FOR LAST 7 DAYS ( ${dashboard[1].json_data.length > 0 ? moment(new Date(dashboard[1].json_data[dashboard[1].json_data.length - 1]['capture_date'])).format('D-M-Y') : ''} - ${dashboard[1].json_data.length > 0 ? moment(new Date(dashboard[1].json_data[0]['capture_date'])).format('D-M-Y') : ''} )`} */}
                       {`ELASTIC COUNT DATA FOR LAST 15 DAYS`}

                       </div>
                  <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Date', 'INFO', 'ERROR', 'DEBUG'],
                      ...dashboard[1].json_data.map(item => {
                        let row = [moment(new Date(item['capture_date'])).format('DD MMM'),
                        item['json_output']['aggregations']['severity']['buckets'][0]['doc_count'],
                        item['json_output']['aggregations']['severity']['buckets'][1]['doc_count'],
                        item['json_output']['aggregations']['severity']['buckets'][2]['doc_count']

                        ];
                        // console.log(moment(new Date(item['capture_date'])).format("MMMM Do"));

                        return row;
                      })
                    ]}
                    options={{
                    
                      series: {
                        1: { curveType: 'function' },
                      },
                      vAxis: { scaleType: 'log', format:'short'}

                    }}
                  // For tests
                  />
                </Paper>

              </Grid>


              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>

                <div>
                     { `LOG SUMMARY | ${dashboard[2].name != null  ? dashboard[2].name.toUpperCase() : ''}`}<br></br>
                       {/* { `ELASTIC COUNT DATA FOR LAST 7 DAYS ( ${dashboard[0].json_data.length > 0 ? moment(new Date(dashboard[0].json_data[dashboard[0].json_data.length - 1]['capture_date'])).format('D-M-Y') : ''} - ${dashboard[0].json_data.length > 0 ? moment(new Date(dashboard[0].json_data[0]['capture_date'])).format('D-M-Y') : ''} )`} */}
                       {`ELASTIC COUNT DATA FOR LAST 15 DAYS`}

                       </div>


                  <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Date', 'INFO', 'ERROR', 'DEBUG'],
                      ...dashboard[2].json_data.map(item => {
                        let row = [moment(new Date(item['capture_date'])).format('DD MMM'),
                        item['json_output']['aggregations']['severity']['buckets'][0]['doc_count'],
                        item['json_output']['aggregations']['severity']['buckets'][1]['doc_count'],
                        item['json_output']['aggregations']['severity']['buckets'][2]['doc_count']
                        ];
                        // console.log(moment(new Date(item['capture_date'])).format("MMMM Do"));

                        return row;
                      })
                    ]}
                    options={{
                      series: {
                        1: { curveType: 'function' },
                      },
                      vAxis: { scaleType: 'log', format:'short'}
                    }}
                  // For tests
                  />
                </Paper>

              </Grid>



            </Grid>


            <Grid item xs={6}>

            {component && component.map(env => {

              return (<Grid item xs={12}>


                <Paper className={fixedHeightPaper}>
                
                <div>
                       { `COMPONENT  SUMMARY | ${env.name.toUpperCase()}`}<br></br>

                       
                         </div>
                      <Chart
                      width={'100%'}
                      height={'300px'}
                      chartType="LineChart"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Date', ...env.json_data[0].data.map(com => com.component.component_name)],
                        ...env.json_data.map(item => {
                          let row = [moment(new Date(item.date)).format('DD MMM') ,
                            ...item.data.map(compData => {
                
                              if(compData.data.length > 0){
                              return  parseInt(compData.data[0].error_count);
                              }else{
                                return  parseInt("0");
                
                              }
                            })
                    
                          ];
                          // console.log(moment(new Date(item['capture_date'])).format("MMMM Do"));
                
                          return row;
                        })
                      ]}
                      options={{
                        series: {
                          1: { curveType: 'function' },
                        },
                                 vAxis: { scaleType: 'log', format:'short'}
                
                       
                      }}
                    // For tests
                    />
                
                
                  </Paper>              
                  
                  </Grid>);
            })}
            </Grid>
            
            
            
            </Grid>,

            [page == 2]:
              <Grid container spacing={1}>

                <Grid item xs={12}>

             
                    <LiveLogs/>
               
                </Grid>


              </Grid>
          }.true}

        </Container>
      </main>
    </div>
  );
}



const mapStateToProps = state => console.log("state" , state) || ({
  env: state.environment.env,
  currentEnvironment: state.selectedEnv,
  dashboard: state.dashboard.summaryData,
  component: state.dashboard.summaryComponent

})


const mapDispatchToProps = dispatch => ({
  changeEnviroment: env => dispatch(setEnvironment(env)),
  fetchDashboardData: dispatch(fetchDashboardData())
})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
