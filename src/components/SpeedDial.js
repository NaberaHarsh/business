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
  const {display} = props;


  const handleOpen = () => {
    setOpen(true); 
};
  

  if(open === true){
    return(
    <FileDialog />
    )
}

// if(display === false){
//     setOpen(false);
// }

return (
    <div         className={classes.speedDial}
    >
      <SpeedDial
      onClick={handleOpen}
        ariaLabel="SpeedDial openIcon example"
        icon={<InsertDriveFileIcon openIcon={< InsertDriveFileIcon/>} />}
      >
       
      </SpeedDial>
    </div>
  );
  
}
