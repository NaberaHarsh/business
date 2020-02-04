import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
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
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
  const [tab, setTab] = React.useState('product');
  const [display, setDisplay] = React.useState(true)

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);

    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

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

  const getValue = (e) => {
    console.log(e);
    if (e === 0) {
      setTab('event')
    }
    else
      if (e === 1) {
        setTab('offer')
      }
      else
        if (e === 2) {
          setTab('product')
        }
  }


  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Create Post</DialogTitle>
      <Divider />
      <DialogTitle >
        <Tabbar getValue={getValue} />

      </DialogTitle>
      <DialogContent dividers>
        {tab === 'product'
          ?
          <Product />
          :
          ""}
        {tab === 'event'
          ?
          <Event />
          :
          ""}
        {tab === 'offer'
          ?
          <Offer />
          :
          ""}


      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>

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
    maxHeight: 435,
  },
}));

export default function ConfirmationDialog() {
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
      />
    </div>
  );
}
