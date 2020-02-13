import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import FileDialog from './FileModal'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import QuestionDialog from './QuestionDialog'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
        margin: theme.spacing.unit, // You might not need this now
        position: "fixed",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit *6
  }, 
}));


export default function OpenIconSpeedDial(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [display, setDisplay] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () =>{
    setDisplay(true)
    
  }

  if(display === true){
    return(
<QuestionDialog />    
)
}
else{
    
return (
  <div         className={classes.speedDial}
  >
    <SpeedDial
    onClose={handleClose}
    onOpen={handleOpen}
    open={open}
    // onClick={handleOpen}
      ariaLabel="SpeedDial openIcon example"
      icon={<InsertDriveFileIcon openIcon={< InsertDriveFileIcon/>} />}
    >
      <SpeedDialAction
          key=""
          icon={<InsertDriveFileIcon />}
          tooltipTitle="File"
          onClick={handleClick}
        />
    </SpeedDial>
  </div>
);

}

// if(display === false){
//     setOpen(false);
// }

}
