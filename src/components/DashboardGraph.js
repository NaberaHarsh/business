import React, { useEffect } from 'react';
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
import CardHeader from '@material-ui/core/CardHeader';

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

import LiveLogs from './LiveLogs';
import Modal from '@material-ui/core/Modal';
import DialogChart from './DialogChart';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { connect } from 'react-redux'

import environment from '../redux/reducers/config'
import { setEnvironment } from '../redux/actions/config';
import { fetchDashboardData } from '../redux/actions/dashboard';
import { fetchComponentSummary, clearComponentSummary } from '../redux/actions/dashboard';
import EnvSetting from './EnvSetting';
import { fetchEnvironments, fetchLookupData } from '../redux/actions/config';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";




const _ = require('lodash');
const moment = require('moment');

const drawerWidth = 240;

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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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


const DashboardGraph = ({ fetchLookupData, fetchComponentSummary, fetchDashboardData, clearComponentSummary, dashboard, env, component }) => {









  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {


    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [page, setPage] = React.useState(process.env.REACT_APP_DEFAULT_PAGE);
  const [refresh, setRefresh] = React.useState(false);

  const [envIdForComponentDtl, setEnvIdForComponentDtl] = React.useState(0);
  let history = useHistory();


  const resetDtlId = () => {

    clearComponentSummary();
    setEnvIdForComponentDtl(0);
  }

  const handlePageChange = (number) => {

    console.log(number);

    setPage(number);


  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = (actionId) => {
    setAnchorEl(null);
    handleMobileMenuClose();

    switch (actionId) {
      case 3:
        localStorage.removeItem('authToken');
        history.replace('/login');




        break;

    }
  };


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleComponentDetail = envId => {


    setEnvIdForComponentDtl(envId);
    fetchComponentSummary(envId);

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
      <MenuItem onClick={() => handleMenuClose(3)}>Logout</MenuItem>

    </Menu>
  );

  if (dashboard) {
  }

  if (component) {

  }



  return (
    <div className={classes.root}>



      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container} >
          {{
            true: <Grid container spacing={2}>

              <Grid container item xs={6} spacing={2}>

                {
                  dashboard && dashboard.map((summary, index) => {
                    return (
                      <Grid item xs={12} key={`log-summary-${index}`}>


                        <Paper className={fixedHeightPaper}>

                          <div>

                            <CardHeader
                              style={{ padding: 0 }}


                              title={`LOG SUMMARY | ${summary.env.name.toUpperCase()}`}
                              titleTypographyProps={{
                                variant: 'subtitle1'
                              }}
                            />

                          </div>
                          <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                              ['Date', 'INFO', 'ERROR', 'DEBUG'],
                              ...summary.data.map(item => {
                                let row = [moment(new Date(item.date)).format('DD MMM'),
                                item.data[0].logs !== undefined ? parseInt(item.data[0].logs.counts) : 0,
                                item.data[1].logs !== undefined ? parseInt(item.data[1].logs.counts) : 0,
                                item.data[2].logs !== undefined ? parseInt(item.data[2].logs.counts) : 0,

                                ];
                                // console.log(moment(new Date(item['capture_date'])).format("MMMM Do"));

                                return row;
                              })
                            ]}
                            options={{
                              series: {
                                1: { curveType: 'function' },
                              },
                              vAxis: { scaleType: 'log', format: 'short' }


                            }}
                          // For tests
                          />


                        </Paper>

                      </Grid>
                    );
                  })
                }

              </Grid>


              <Grid container item xs={6} spacing={2}>

                {component && component.map((env, index) => {

                  return (<Grid item xs={12} key={`component-summary-${index}`}>


                    <Paper className={fixedHeightPaper}>

                      <div>


                        <CardHeader
                          style={{ padding: 0 }}

                          action={
                            <IconButton aria-label="settings" onClick={() => handleComponentDetail(env.id)}>
                              <OpenInNewIcon />
                            </IconButton>
                          }
                          title={`COMPONENT  SUMMARY | ${env.name.toUpperCase()}`}
                          titleTypographyProps={{
                            variant: 'subtitle1'
                          }}
                        />
                      </div>
                      <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                          ['Date', ...env.json_data[0].data.map(com => com.component.component_name)],
                          ...env.json_data.map(item => {
                            let row = [moment(new Date(item.date)).format('DD MMM'),
                            ...item.data.map(compData => {

                              if (compData.data.length > 0) {
                                return parseInt(compData.data[0].error_count);
                              } else {
                                return parseInt("0");

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
                          vAxis: { scaleType: 'log', format: 'short' }


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


                  <LiveLogs />

                </Grid>


              </Grid>,
            [page == 3]:
              <EnvSetting />
          }.true}
          {envIdForComponentDtl !== 0 &&
            <DialogChart
              envIdForComponentDtl={envIdForComponentDtl}
              resetDtlId={() => resetDtlId()} />}
        </Container>
      </main>
    </div>
  );
}



const mapStateToProps = state => console.log("state", state) || ({

  dashboard: state.dashboard.summaryData,
  component: state.dashboard.summaryComponent

})


const mapDispatchToProps = dispatch => ({
  changeEnviroment: env => dispatch(setEnvironment(env)),
  fetchDashboardData:dispatch(fetchDashboardData()),
  fetchComponentSummary: envId => dispatch(fetchComponentSummary(envId)),
  clearComponentSummary: () => dispatch(clearComponentSummary()),


})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardGraph)
