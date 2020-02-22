import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { authUser } from '../redux/actions/common';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 function SignIn(props) {
  const classes = useStyles();


  const [email, setEmail] = React.useState('');

  const [pass, setPass] = React.useState('');


  const [errorMessage, setErrorMessage] = React.useState('');

  let history = useHistory();

  const handleAuth = () => {


    if(email === ''){
        setErrorMessage('All fields are mandatory');
        return;
    }


    if(pass === ''){
        setErrorMessage('All fields are mandatory');
        return;

    }


    // console.log('complete' , email, pass);


    
    setErrorMessage('');

    localStorage.setItem('authToken', 'kma');

    history.replace('/1');

    

  }





  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}
         noValidate
         onSubmit={e => {e.preventDefault();}}
         >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPass(event.target.value)}

          />


       {(errorMessage || props.authErrorMessage ) && <Box mt={8}>
       <Typography variant="body2" color="textSecondary" align="center">
           {errorMessage}{props.authErrorMessage}
           </Typography>
        </Box> }

        {props.isApiCalling && <Box mt={8}> <CircularProgress/></Box>}
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleAuth()}
          >
            Sign In
          </Button>

        </form>
      </div>
      
    </Container>
  );
}


const mapStateToProps = state => console.log("state", state) || ({

    isAuth: state.common.isAuth,
    authErrorMessage: state.common.authErrorMessage,
    isApiCalling: state.common.isLoading

  
  })
  
  
  const mapDispatchToProps = dispatch => ({
    
    authUser : (data) => dispatch(authUser(data))
  })
  
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn)