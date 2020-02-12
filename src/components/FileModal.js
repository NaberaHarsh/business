import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Files from './Files';
// import OpenIconSpeedDial from './SpeedDial'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";



function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open,getData, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const [tab, setTab] = React.useState('product');
  const [display, setDisplay] = React.useState(true)

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);

    }
  }, [valueProp, open]);

//  const handleData =(data) =>{
//    console.log(data)
//    getData(data.product_name)
//  }


  if (display === false) {
    return (
      <Redirect
        to={{
          pathname: "/1"

        }}
      />
    );
  }

  const handleClose = () => {
    setDisplay(false);
    onClose(value);
  };


  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">My Files</DialogTitle>
    
      <DialogContent dividers>
        
<Files />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
      {/* <OpenIconSpeedDial display={display}/> */}
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    height: 580,
  },
}));

export default function FileDialog(props) {
  const {getData} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');


  useEffect(() => {
    handleClickListItem()
  })


  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = newValue => {
    setOpen(false);


    if (newValue) {
      setValue(newValue);
    }
  };


  return (
    <div className={classes.root}>


      <ConfirmationDialogRaw
        classes={{
          paper: classes.paper,
        }}
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
        getData={getData}
      />
    </div>
  );
}
