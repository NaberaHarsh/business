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

export const mainListItems = (handlePageChange, pageId) => (
  <div>
    <ListItem  
    button onClick={() => handlePageChange(1)}
    selected={pageId == 1}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={() => handlePageChange(2)}
        selected={pageId == 2}

    >
      <ListItemIcon>
      <HdrStrongIcon/>
      </ListItemIcon>
      <ListItemText primary="Logs" />
    </ListItem>

    <ListItem button onClick={() => handlePageChange(3)}
        selected={pageId == 3}
        >
      <ListItemIcon>
        <CompareIcon/>

      </ListItemIcon>
      <ListItemText primary="Compare Config" />
    </ListItem>
  
  
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