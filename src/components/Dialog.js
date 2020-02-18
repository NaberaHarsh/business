import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Tabbar from './Tab'
import Product from './Product'
import Event from './Event'
import Offer from './Offer'
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
  const [unit, setUnit] = React.useState(0)


  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);

    }
  }, [valueProp, open]);

 const handleData =(data) =>{
   console.log(data)
   getData(data.product_name)
 }

  const handleCancel = () => {
    setDisplay(false);
    onClose();

  };

  if (display === false) {
    return (
      <Redirect
        to={{
          pathname: "/1"

        }}
      />
    );
  }

  const handleOk = () => {
    setDisplay(false);
    onClose(value);
  };

const forTab= (p) =>{
  console.log(p)
  if (p === 1) {
    setTab('event')
  }
  else
    if (p === 2) {
      setTab('offer')
    }
    else
    if(p===0){
     setTab('product')
    }
}

  const getValue = (e) => {
    console.log(e);
    setUnit(e)
    if (e === 1) {
      setTab('event')
    }
    else
      if (e === 2) {
        setTab('offer')
      }
      else
       setTab('product')
        
  }


  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Create Post</DialogTitle>
      <Divider />
      <DialogTitle >
        <Tabbar getValue={getValue}  />

      </DialogTitle>
      <DialogContent dividers>
        {tab === 'product'
          ?
          <Product forTab={forTab} unit={unit} handleOk={handleOk} handleCancel={handleCancel} handleData={handleData}/>
          :
          ""}
        {tab === 'event'
          ?
          <Event forTab={forTab} unit={unit} handleOk={handleOk} handleCancel={handleCancel}/>
          :
          ""}
        {tab === 'offer'
          ?
          <Offer forTab={forTab} unit={unit} handleOk={handleOk} handleCancel={handleCancel}/>
          :
          ""}


      </DialogContent>
      

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
    maxHeight: 580,
  },
}));

export default function ConfirmationDialog(props) {
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
