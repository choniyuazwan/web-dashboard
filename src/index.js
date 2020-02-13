import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Login from './Container/Login'
import Country from './Container/Country';
import CountryShow from './Container/Country/Show';
import CountryAdd from './Container/Country/Add';
import CountryEdit from './Container/Country/Edit';

ReactDOM.render(
  <Router>
    <div>
      <Route render ={() => <App/>} path="/" />
      <Switch>
        <Route render ={() => <Login/>} path="/login" />
        <Route render ={() => <Country/>} path="/country" exact />
        <Route render ={() => <CountryAdd/>} path="/country/add" />
        <Route render ={() => <CountryEdit/>} path="/country/edit/:id" />
        <Route render ={() => <CountryShow/>} path="/country/show/:id" />
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
