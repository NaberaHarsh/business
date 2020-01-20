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

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';



import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';



import { connect } from 'react-redux'




const _ = require('lodash');
const moment = require('moment');


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({

  root: {
    padding: '80px',
    flexGrow: 1,

  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  appBarSpacer: theme.mixins.toolbar,
  title:{
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
  toolbar: {
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));



const DialogChart = (props) => {



  let { fetchComponentSummary, componentSummary, envIdForComponentDtl, resetDtlId } = props;

    console.log("defult id is ",envIdForComponentDtl);
  const classes = useStyles();





  const handleClose = () => {
    resetDtlId();
  };





  let componentData;
  if (componentSummary) {
    componentData = componentSummary[0];
  }




  console.log(componentData);


  return (

    <Dialog fullScreen open={envIdForComponentDtl !== 0} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>


        <Toolbar className={classes.toolbar}>
          <Typography variant="h5"  color="inherit" noWrap className={classes.title}>
           COMPONENT SUMMARY {componentData && `| ${componentData.name.toUpperCase()}`}
          </Typography>

          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
         

        </Toolbar>
      </AppBar>
      <div className={classes.root}>




<main className={classes.content}>
      {{
        true: <div>
          <Typography variant="h2" component="h2">Loading...</Typography>
        </div>,
        [componentData !== undefined]:      
          <Container maxWidth="xl" className={classes.container} >
            {{
              true: <Grid container spacing={0}>



                <Grid container xs={12} spacing={2}>

                  {componentData && <Grid item xs={12}>


                    <Paper className={{
                      height: '500px',
                    }} elevation={0}>

                  
                      <Chart
                        width={'100%'}
                        height={'800px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                          ['Date', ...componentData.json_data[0].data.map(com => com.component.component_name)],
                          ...componentData.json_data.map(item => {
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

                  </Grid>
                  }
                </Grid>



              </Grid>


            }.true}

          </Container>
       
      }.true}
       </main>
      </div>
    </Dialog>

  );
}



const mapStateToProps = state => ({

  componentSummary: state.dashboard.dialogComponentSummary

})


const mapDispatchToProps = dispatch => ({
})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogChart)
