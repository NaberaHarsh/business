import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';
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
      <Tooltip title="Dashboard">
 <DashboardIcon />
 </Tooltip>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    </Link>
    
  

    <Link to={`/2`} style={{ textDecoration: 'none', color: 'black'  }}>

    <ListItem button onClick={() => handlePageChange(3)}
    selected={history.location.pathname === '/config'}
    >
      <ListItemIcon >
      <Tooltip title="Add Product">
        <ShoppingBasketIcon />
</Tooltip>
      </ListItemIcon>
      <ListItemText primary="Add Product" />
    </ListItem>
    </Link>
   
    
    <Link to={`/3`} style={{ textDecoration: 'none', color: 'black'  }}>

<ListItem button onClick={() => handlePageChange(3)}
selected={history.location.pathname === '/config'}
>
  <ListItemIcon>
  <Tooltip title="Add Event">
    <EventIcon />
</Tooltip>
  </ListItemIcon>
  <ListItemText primary="Add Event" />
</ListItem>
</Link>


<Link to={`/4`} style={{ textDecoration: 'none', color: 'black'  }}>

<ListItem button onClick={() => handlePageChange(3)}
selected={history.location.pathname === '/config'}
>
  <ListItemIcon>
  <Tooltip title="Add Offer">
    <BookmarkIcon />
    </Tooltip>
  </ListItemIcon>
  <ListItemText primary="Add Offer" />
</ListItem>
</Link>


{/* 
    <Link to={`/5`} style={{ textDecoration: 'none', color: 'black'  }}>
    <ListItem  
    button onClick={() => handlePageChange(1)}
    selected={history.location.pathname === '/dashboard'}
    >
      <ListItemIcon>
        <InsertDriveFileIcon />
      </ListItemIcon>
      <ListItemText primary="My Files" />
    </ListItem>
    </Link> */}
    <Link to={`/5`} style={{ textDecoration: 'none', color: 'black'  }}>
    <ListItem  
    button onClick={() => handlePageChange(1)}
    selected={history.location.pathname === '/dashboard'}
    >
      <ListItemIcon>
      <Tooltip title="Add Question">
        <QuestionAnswerIcon />
        </Tooltip>
      </ListItemIcon>
      <ListItemText primary="Add Questions" />
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
