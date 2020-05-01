import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { Grid } from '@material-ui/core';
import Facebook from './Skeleton'

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
    const { onClose, value: valueProp, open, getData, ...other } = props;
    const [value, setValue] = React.useState(valueProp);
    const [display, setDisplay] = React.useState(true)

    React.useEffect(() => {
        if (!open) {
            setValue(valueProp);

        }
    }, [valueProp, open]);

    

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
    

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="sm"
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">Preview</DialogTitle>
            <DialogContent dividers>
        <Facebook  handleOk={handleOk} handleCancel={handleCancel} />
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
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        height: 600,
    },
}));

export default function PreviewDialog(props) {
    const { getData } = props;
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
