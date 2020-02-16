import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Login from './Container/Auth/Login'
import Country from './Container/Country';
import CountryShow from './Container/Country/Show';
import CountryAdd from './Container/Country/Add';
import CountryEdit from './Container/Country/Edit';
import { PrivateRoute } from "./Util/Auth";

ReactDOM.render(
  <Router>
    <div>
      <Route render ={() => <App/>} path="/" />
      <Route render ={() => <Login/>} path="/login" exact />
      <Switch>
        <PrivateRoute path="/country" exact> <Country/> </PrivateRoute>
        <PrivateRoute path="/country/add" exact><CountryAdd/> </PrivateRoute>
        <PrivateRoute path="/country/edit/:id" exact> <CountryEdit/> </PrivateRoute>
        <PrivateRoute path="/country/show/:id" exact> <CountryShow/> </PrivateRoute>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
