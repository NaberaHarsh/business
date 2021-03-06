import React from 'react';
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
import ConfirmationDialog from './Dialog'
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listItems';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Post from './Post'
import { connect } from 'react-redux'
import FileDialog from './FileModal'
import Question from './Question'
import QuestionDialog from './QuestionDialog'
import Product from './Product'
import Event from './Event'
import Offer from './Offer'
import OpenIconSpeedDial from './SpeedDial'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Facebook from './Skeleton'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { Grid } from '@material-ui/core';




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
    width: theme.spacing(0),
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
  sectionMobile:{
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    shiftTextLeft: {
      marginLeft: '0px',
    },
    shiftTextRight: {
      marginLeft: drawerWidth,
    }
  },
}));


const Dashboard = (props) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {


    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [data,setData] = React.useState(null);
  const [page, setPage] = React.useState(process.env.REACT_APP_DEFAULT_PAGE);
  const [refresh, setRefresh] = React.useState(false);

  const [envIdForComponentDtl, setEnvIdForComponentDtl] = React.useState(0);
  let history = useHistory();


 const handleData =(item)=> {
console.log(item);
setData(item)
console.log(data);
 }

  const handlePageChange = (number) => {

    console.log(number);

    setPage(number);


  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [name, setName]= React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [photo, setPhoto] = React.useState(null);
  

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

  const handleDataDisplay = data =>{
    setPhoto( data.image )
    setName(data.product_name);
    setPrice(data.price);
    setDescription(data.desc);
    
    console.log(data)
  }
  const handleDataDisplayEvent = data =>{
    setPhoto( data.image)
    setName(data.title);
    setDescription(data.description);
    setStartDate(data.start_date);
    setEndDate(data.end_date);
    console.log(data)
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
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

 


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={classes.appBar}
        position="absolute">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
             DASHBOARD
          </Typography>


          <div className={classes.sectionDesktop}>

            <Button
              color="inherit"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >Profile</Button>

          </div>
          <div className={classes.sectionMobile}>
          <MoreVertIcon 
          color="inherit"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"/>
         
</div>

        </Toolbar>
      </AppBar>
      {renderMenu}

      <Drawer
      className={open ? classes.shiftTextRight : classes.shiftTextLeft}

        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems(setOpen, handlePageChange, page, history)}</List>
      </Drawer>



      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

            
            <Route 
            exact path="/1"
            // onEnter={} // CALL API ON ROUTE
            >
<Post />
{/* <OpenIconSpeedDial /> */}

            </Route>
          


            <Route path="/2">
            <Post />

<ConfirmationDialog getData={handleData} handleDataDisplay={handleDataDisplay}/>
              
            </Route>

            <Route 
            exact path="/3"
            >
                         <QuestionDialog />
            </Route>


      </main>
    </div>
  );
}



const mapStateToProps = state =>  ({

 
})


const mapDispatchToProps = dispatch => ({
 

})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
