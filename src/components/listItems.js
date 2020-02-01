import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Icon from '@material-ui/core/Icon';
import HdrStrongIcon from '@material-ui/icons/HdrStrong';
import CompareIcon from '@material-ui/icons/Compare';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
export const mainListItems = (handlePageChange, pageId, history) =>  console.log(history) || (
  <div>

    <Link to={`/1`} style={{ textDecoration: 'none', color: 'black'  }}>
    <ListItem  
    button onClick={() => handlePageChange(1)}
    selected={history.location.pathname === '/dashboard'}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    </Link>
    
  

    <Link to={`/2`} style={{ textDecoration: 'none', color: 'black'  }}>

    <ListItem button onClick={() => handlePageChange(3)}
    selected={history.location.pathname === '/config'}
    >
      <ListItemIcon>
        <CompareIcon/>

      </ListItemIcon>
      <ListItemText primary="PAGE 3" />
    </ListItem>
    </Link>

  
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);