import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import { connect } from 'react-redux';
import { authUser } from './redux/actions/common';
import SignIn from './components/Login';
import {fetchEnvironments, fetchLookupData} from './redux/actions/config'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";


function App(props) {




  console.log(localStorage.getItem('authToken'));

  return console.log("app rendering") || (
    <Router>

      <Switch>
        
        <Route path="/login">
          <SignIn />
        </Route>
        <Route
          render={({ location }) => 
          localStorage.getItem('authToken')!== null ? 
          (<Dashboard />) : 
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />}
          path="/" />



      </Switch>

    </Router>
  );


}




const mapStateToProps = state => console.log("state", state) || ({

  isAuth: state.common.isAuth,
  authErrorMessage: state.common.authErrorMessage

})


const mapDispatchToProps = dispatch => ({

  authUser: (data) => dispatch(authUser(data)),

})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)



