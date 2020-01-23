import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import {fetchEnvironments, fetchLookupData} from './redux/actions/config'
import { composeWithDevTools } from 'redux-devtools-extension';

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 


const loggerMiddleware = createLogger()

const persistConfig = {
  key: 'root',
  storage,
}
 
 
// const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  rootReducer,
  composeWithDevTools(
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  ))
)





  let persistor = persistStore(store)
 




store.dispatch(fetchLookupData()).then(() => console.log(store.getState()))


ReactDOM.render( 
<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
