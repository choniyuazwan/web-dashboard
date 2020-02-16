import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Login from './Container/Auth/Login'
import Country from './Container/Country';
import CountryDetail from './Container/Country/Detail';
import CountryAdd from './Container/Country/Add';
import CountryEdit from './Container/Country/Edit';
import { PrivateRoute, LoginRoute } from "./Util/Auth";

const routes = [
  '/home',
  '/country'
];

ReactDOM.render(
  <Router>
    <div>
      {routes.map((route, index) => (
          <Route
            key={index}
            path={route}
            render={() => <App/>}
          />
        ))}
      <Switch>
        <LoginRoute path="/login" exact> <Login/> </LoginRoute>
        <PrivateRoute path="/country" exact> <Country/> </PrivateRoute>
        <PrivateRoute path="/country/add" exact> <CountryAdd/> </PrivateRoute>
        <PrivateRoute path="/country/edit/:id" exact> <CountryEdit/> </PrivateRoute>
        <PrivateRoute path="/country/detail/:id" exact> <CountryDetail/> </PrivateRoute>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
