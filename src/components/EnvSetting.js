import React, { useState, useReducer, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';


import { fetchLogs } from '../redux/actions/logs';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import GetAppIcon from '@material-ui/icons/GetApp';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchEnvSetting } from '../redux/actions/settingCompare';

import { fade } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import SvgIcon from '@material-ui/core/SvgIcon';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { API_BASE_URL, PATH_ENV_SETTING_DOWNLOAD } from '../config';

const _ = require('lodash');



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  table: {
    minWidth: '700px'

  },
  card: {
    maxWidth: '100%',
    margin: '2px'
  },
  media: {
    height: 140,
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
    height: 550,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  avatar: {
    background: 'red'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '240px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}


const StyledTreeItem = withStyles(theme => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />);





const EnvSetting = (props) => {


  let { clients, environments, components, fetchEnvSetting, primaryConfig, secondaryConfig } = props;

  const classes = useStyles();

  const [envId, setEnvId] = React.useState('');

  const handleChange = event => {
    setEnvId(event.target.value);
  };


  const [componentId, setComponentId] = React.useState('');
  const [envToCompareId1, setEnvToCompareId1] = React.useState('');
  const [envToCompareId2, setEnvToCompareId2] = React.useState('');


  const handleComponentChange = event => {
    setComponentId(event.target.value);

    if(envToCompareId1 != '')
    fetchEnvSetting(envToCompareId1, event.target.value, true);

    if(envToCompareId2 != '')
    fetchEnvSetting(envToCompareId2, event.target.value, false);

  };




  const handleChangeEnvToCompareId1 = event => {
    setEnvToCompareId1(event.target.value);

    if (event.target.value !== '')
      fetchEnvSetting(event.target.value, componentId, true);
  };




  const handleChangeEnvToCompareId2 = event => {
    setEnvToCompareId2(event.target.value);

    if (event.target.value !== '')
      fetchEnvSetting(event.target.value, componentId, false);

  };


  const getJsonDiffArray = () => {




    let notInSecond = primaryConfig[0].json_agg[0].Settings.filter(item1 =>

      secondaryConfig[0].json_agg[0].Settings.filter(item2 => item1.Name === item2.Name).length == 0

    );


    let notInFirst = secondaryConfig[0].json_agg[0].Settings.filter(item1 =>

      primaryConfig[0].json_agg[0].Settings.filter(item2 => item1.Name === item2.Name).length == 0

    );

    console.log(notInSecond);
    console.log(notInFirst);

    return [...notInFirst, ...notInSecond]


  }



  const filteredPrimaryArray = () => {

    if(primaryConfig && (primaryConfig[0].json_agg.length > 0) && secondaryConfig && (secondaryConfig[0].json_agg.length > 0)){
      console.log("inside true");
    }else{
      console.log("inside false");

    }


    if (primaryConfig === undefined || primaryConfig[0].json_agg.length == 0)
      return [{
        Component: '',
        Settings: [],
        nodeCount: 0

      }];

    if (secondaryConfig === undefined || secondaryConfig[0].json_agg.length == 0 )
      return [{
        Component: '',
        Settings: [],
        nodeCount: 0

      }];


    let notInFirst = primaryConfig[0].json_agg[0].Settings.filter(item1 =>

      secondaryConfig[0].json_agg[0].Settings.filter(item2 => item1.Name.trim() === item2.Name.trim()).length == 0

    );

    let onlyInFirst = primaryConfig[0].json_agg[0].Settings.filter(item1 =>

      secondaryConfig[0].json_agg[0].Settings.filter(item2 => item1.Name === item2.Name).length > 0

    );



    console.log(onlyInFirst, notInFirst);

    let formattedData = [...onlyInFirst, ...notInFirst];

    if (formattedData === undefined)
      formattedData = [];

    return [{
      Component: primaryConfig[0].json_agg[0].Component,
      Settings: formattedData,
      nodeCount: formattedData.length
    }];

  }


  const filteredSecondaryArray = () => {


    if (primaryConfig === undefined || primaryConfig[0].json_agg.length == 0)
    return [{
      Component: '',
      Settings: [],
      nodeCount: 0

    }];

  if (secondaryConfig === undefined || secondaryConfig[0].json_agg.length == 0 )
    return [{
      Component: '',
      Settings: [],
      nodeCount: 0

    }];

    let notInFirst = secondaryConfig[0].json_agg[0].Settings.filter(item1 =>

      primaryConfig[0].json_agg[0].Settings.filter(item2 => item1.Name === item2.Name).length == 0

    );

    let onlyInFirst = secondaryConfig[0].json_agg[0].Settings.filter(item1 =>

      primaryConfig[0].json_agg[0].Settings.filter(item2 => item1.Name === item2.Name).length > 0

    );



    console.log(onlyInFirst, notInFirst);

    let formattedData = [...onlyInFirst, ...notInFirst];

    if (formattedData === undefined)
      formattedData = [];

    return [{
      Component: secondaryConfig[0].json_agg[0].Component,
      Settings: formattedData,
      nodeCount: formattedData.length

    }];

  }


  const checkIfDiff = (isReverseComparison, componentName, value, key) => {





    if (isReverseComparison)
      return secondaryConfig[0].json_agg[0].Settings.filter(item1 => {
        if (componentName === item1.Name) {
          return item1[key] === value;
        }
      }).length == 0;

    else
      return primaryConfig[0].json_agg[0].Settings.filter(item1 => {
        if (componentName === item1.Name) {
          return item1[key] === value;
        }
      }).length == 0;


  }





  return (
    <Grid container spacing={1}>

      <Grid item xs={12}>



        <div>

          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Select Client</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={envId}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {clients && clients.map(item => (<MenuItem value={item.id}>{item.name}</MenuItem>))}
            </Select>
          </FormControl>

          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Select Component</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={componentId}
              onChange={handleComponentChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {components &&
                components.map(item =>
                  (<MenuItem value={item.Name}>{item.Name}</MenuItem>))}
            </Select>
          </FormControl>

          {props.isApiCalling && <CircularProgress/>}
        </div>



      </Grid>



      <Grid container xs={12} spacing={4}>



        <Grid item xs={5}>

          <Paper>

            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >

              <Grid item xs={11}>

                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-filled-label">Select Env 1</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={envToCompareId1}
                    onChange={handleChangeEnvToCompareId1}
                    disabled={componentId=='' || envId == ''}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {environments && environments.filter(item => item.client_id === envId).map(item => (<MenuItem value={item.id}>{item.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={1}>

                {envToCompareId1 != '' && <a href={`${API_BASE_URL}${PATH_ENV_SETTING_DOWNLOAD}${envToCompareId1}/${componentId}`} target="_blank">
                  <GetAppIcon fontSize="large" color="secondary" />

                </a>}


              </Grid>
            </Grid>
            {{
              true: <CardHeader


              title={componentId != '' ? `NOT DATA AVAILABLE`: ``}
              titleTypographyProps={{
                variant: 'subtitle1'
              }}
            />,
              [primaryConfig && primaryConfig[0].json_agg.length > 0 && secondaryConfig && secondaryConfig[0].json_agg.length > 0]: <TreeView
                className={classes.root}
                defaultExpanded={['1', ...new Array(filteredPrimaryArray()[0].nodeCount).fill(0).map((item, index) => `${2 + index}`)]}
                defaultCollapseIcon={<MinusSquare />}
                defaultExpandIcon={<PlusSquare />}
                defaultEndIcon={<CloseSquare />}
                style={{ overflow: 'scroll' }}
                onNodeToggle={() => console.log("do nothing on toggle")}

              >

                {
                  primaryConfig && secondaryConfig && filteredPrimaryArray().map((component, index) => {
                    return (
                      <StyledTreeItem nodeId="1" label={component.Component}>

                        {component.Settings.map((setting, indexDeep) => {
                          return (
                            <StyledTreeItem nodeId={`${indexDeep + 2}`} label={setting.Name} >
                              <div style={{ overflow: 'auto', wordBreak: 'break-all', whiteSpace: 'nowrap' }}>
                                {/* <div style={{background: checkIfDiff(true,  setting.Name,  setting.Name, 'Name') ? '#ff5252' : 'white'}}>Name : {setting.Name}</div> */}
                                <div style={{ background: checkIfDiff(true, setting.Name, setting.Environmental, 'Environmental') ? '#ff5252' : 'white' }}>Environmental : {setting.Environmental.toString()}</div>
                                <div style={{ background: checkIfDiff(true, setting.Name, setting.Value, 'Value') ? '#ff5252' : 'white' }}>Value : {setting.Value.trim().replace(/(\r\n|\n|\r)/gm, " ").replace(/\s/g, '')}</div>


                              </div>

                            </StyledTreeItem>

                          )
                        })}


                      </StyledTreeItem>
                    );
                  })
                }
              </TreeView>
            }.true}




          </Paper>

        </Grid>


        <Grid item xs={5}>


          <Paper>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={1}>


                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-filled-label">Select Env 2</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={envToCompareId2}
                    onChange={handleChangeEnvToCompareId2}
                    disabled={componentId=='' || envId == ''}

                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {environments && environments.filter(item => item.client_id === envId).map(item => (<MenuItem value={item.id}>{item.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1}>

                {envToCompareId2 != '' && <a href={`${API_BASE_URL}${PATH_ENV_SETTING_DOWNLOAD}${envToCompareId2}/${componentId}`} target="_blank">
                  <GetAppIcon fontSize="large" color="secondary" />

                </a>}


              </Grid>
            </Grid>
            {{
              true: 
              <CardHeader
  
  
                title={componentId != '' ? `NOT DATA AVAILABLE`: ``}
                titleTypographyProps={{
                  variant: 'subtitle1'
                }}
              />,
              [true && primaryConfig && primaryConfig[0].json_agg.length > 0 && secondaryConfig && secondaryConfig[0].json_agg.length > 0]: <TreeView
                className={classes.root}
                defaultExpanded={['1', ...new Array(filteredSecondaryArray()[0].nodeCount).fill(0).map((item, index) => `${2 + index}`)]}
                defaultCollapseIcon={<MinusSquare />}
                defaultExpandIcon={<PlusSquare />}
                defaultEndIcon={<CloseSquare />}
                style={{ overflow: 'scroll' }}

              >
                {
                  primaryConfig && secondaryConfig && filteredSecondaryArray() && filteredSecondaryArray().map((component, index) => {
                    return (
                      <StyledTreeItem nodeId="1" label={component.Component}>

                        {component.Settings.map((setting, indexDeep) => {
                          return (
                            <StyledTreeItem nodeId={`${indexDeep + 2}`} label={setting.Name} >

                              <div style={{ overflow: 'auto', wordBreak: 'break-all', whiteSpace: 'nowrap' }}>

                                {/* <div style={{background: checkIfDiff(false,  setting.Name,setting.Name, 'Name') ? '#64ffda' : 'white'}}>Name : {setting.Name}</div> */}
                                <div style={{ background: checkIfDiff(false, setting.Name, setting.Environmental, 'Environmental') ? '#64ffda' : 'white' }}>Environmental : {setting.Environmental.toString()}</div>
                                <div style={{ background: checkIfDiff(false, setting.Name, setting.Value, 'Value') ? '#64ffda' : 'white' }}>Value : {setting.Value.trim().replace(/(\r\n|\n|\r)/gm, " ").replace(/\s/g, '')}</div>


                              </div>

                            </StyledTreeItem>

                          )
                        })}


                      </StyledTreeItem>
                    );
                  })
                }
              </TreeView>
            }.true}
          </Paper>


        </Grid>

        <Grid item xs={2}>


          <Paper style={
            {
              padding: '10px',
              overflowWrap: 'break-word'
            }}>

            <CardHeader
              style={{ padding: 0 }}


              title={`NOT AVAILABLE`}
              titleTypographyProps={{
                variant: 'subtitle1'
              }}
            />




            {primaryConfig && primaryConfig[0].json_agg.length > 0 && secondaryConfig && secondaryConfig[0].json_agg.length > 0 &&  getJsonDiffArray().map((item, index) => {
              return (
                <div  >
                  <div style={{ fontSize: '16px', fontWeight: '800' }}>{item.Name}</div>
                  <div style={{ marginLeft: '16px', marginBottom: '8px' }}>

                    <div>Name : {item.Name}</div>
                    <div>Environmental : {item.Environmental}</div>
                    <div>Value : {item.Value}</div>
                  </div>


                </div>
              );
            })}

          </Paper>


        </Grid>
      </Grid>


    </Grid>

  );
}


const mapStateToProps = state => console.log("state", state) || ({
  clients: state.config.lookup.client,
  environments: state.config.lookup.environment,
  components: state.config.lookup.component,
  dashboard: state.dashboard.summaryData,
  logs: state.logs,
  isRefreshing: state.logs.isRefreshing,
  primaryConfig: state.configCompare.envPrimaryConfig,
  secondaryConfig: state.configCompare.envSecondaryConfig,
  isApiCalling: state.common.isLoading
})


const mapDispatchToProps = dispatch => ({

  fetchEnvSetting: (envId, componentId, isPrimary) => dispatch(fetchEnvSetting({ envId: envId, componentId: componentId, isPrimary: isPrimary }))

})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnvSetting)
