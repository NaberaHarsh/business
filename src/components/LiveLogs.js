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
        minWidth:'700px'

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
      }
  }));



  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];



 


 const LiveLogs = (props) => {


    console.log("is refreshing : "+props.isRefreshing);

    const classes = useStyles();


    const REFRESHING_TIME = '5 min';

    const environments = props.environments;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

  const loadData = () => {
 
  };

  useEffect(() => loadData());


  useEffect(() => {
    props.fetchLogs();
   const myTimer = setInterval(()=> {

    console.log("dispatch called for get logs");
    props.fetchLogs();
  },
  1000*60*5);
  }, []);
  

  const fixedHeightCard = clsx(classes.card, classes.fixedHeight);


  const getKibanaUrl = (url , logId, type) => {
           
    if(type == 'log_id'){
    return   `
    ${url}app/kibana#/discover?_g=(refreshInterval:(pause:!t,value:0),time:(from:now%2Fd,mode:quick,to:now%2Fd))&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:e56be540-226b-11ea-a8b2-b152eee2eaef,key:_id,negate:!f,params:(query:${logId},type:phrase),type:phrase,value:${logId}),query:(match:(_id:(query:${logId},type:phrase))))),index:e56be540-226b-11ea-a8b2-b152eee2eaef,interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))
    `;
    }else if(type == 'correlation_id'){
      return   `
    ${url}app/kibana#/discover?_g=(refreshInterval:(pause:!t,value:0),time:(from:now%2Fd,mode:quick,to:now%2Fd))&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:e56be540-226b-11ea-a8b2-b152eee2eaef,key:correlationId,negate:!f,params:(query:${logId},type:phrase),type:phrase,value:${logId}),query:(match:(correlationId:(query:${logId},type:phrase))))),index:e56be540-226b-11ea-a8b2-b152eee2eaef,interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))
      `;
    }

  }


  if( JSON.stringify(props.logs) === JSON.stringify({isRefreshing: true})){
    return (
      <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );

  }





  


  return (



<Grid container  spacing={1}>




    {props.logs.logs && 
        props.logs.logs.map(logs => {

            return (   

                <Grid item xs={4} >
                <Card className={fixedHeightCard} elevation={1}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} style={{background: logs.color_code}}>
            {logs.short_name.toUpperCase()}
          </Avatar>
        }

        action={{
            [true]: <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>,
          [props.isRefreshing]: <CircularProgress color="secondary" />
        }.true}
        title={logs.name.toUpperCase()}
        subheader={`Last ${REFRESHING_TIME} logs`}
      />

      <div style={{margin:'10px', height:'450px',overflowY:'scroll'}}>

      <Card className={classes.card} variant="outlined" square style={{
              borderColor:'skyblue',
              padding:10
            }}>     
             {logs.json_data.aggregations.messages.buckets.filter(log => log.isNew).length > 0 ? 'New Hits : '+logs.json_data.aggregations.messages.buckets.filter(log => log.isNew).length : 'Total Hits : '+logs.json_data.aggregations.messages.buckets.length}
    </Card>

     {
         logs.json_data.aggregations.messages.buckets.map(row =>  (
            <Card className={classes.card} variant="outlined" square style={{
              borderColor:row.isNew ? 'green' : '#eaeaea'
            }}>
            
              <CardContent>

        <Typography variant="h5" component="h5">
        {row.key}
        </Typography>
        <br/>
        <a href={getKibanaUrl(logs.kibana_url, row.hits.hits.hits[0]._id, 'log_id')} target={'_blank'}>

        <Typography className={classes.pos} color="textSecondary">
          {row.hits.hits.hits[0]._source.componentName}

        </Typography>
        </a>

       <a href={getKibanaUrl(logs.kibana_url, row.hits.hits.hits[0]._source.correlationId, 'correlation_id')} target={'_blank'}>

        <Typography className={classes.pos} color="textSecondary">
        {row.hits.hits.hits[0]._source.correlationId}     

        </Typography>
        </a>
        

      
              </CardContent>

            
          </Card>
         ))
     }

</div>
     
    </Card>


         </Grid>
          );
        })
    }


<Grid item xs={4} >
                <Card className={fixedHeightCard} elevation={1}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} style={{background: 'blue'}}>
            {'DX'}
          </Avatar>
        }

        action={{
            [true]: <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>,
          [props.isRefreshing]: <CircularProgress color="secondary" />
        }.true}
        title={"DXP PROD"}
        subheader={`Last ${REFRESHING_TIME} logs`}
      />

    </Card>


         </Grid>

</Grid>

  
  );
}


const mapStateToProps = state => console.log("state" , state) || ({
    env: state.environment.env,
    currentEnvironment: state.selectedEnv,
    dashboard: state.dashboard.summaryData,
    logs: state.logs,
    isRefreshing: state.logs.isRefreshing
  })
  
  
  const mapDispatchToProps = dispatch => ({

    fetchLogs: () => dispatch(fetchLogs())
    
  })
  
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LiveLogs)
  