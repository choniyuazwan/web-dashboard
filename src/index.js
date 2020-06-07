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
import Province from './Container/Province';
import ProvinceDetail from './Container/Province/Detail';
import ProvinceAdd from './Container/Province/Add';
import ProvinceEdit from './Container/Province/Edit';
import Regency from './Container/Regency';
import RegencyDetail from './Container/Regency/Detail';
import RegencyAdd from './Container/Regency/Add';
import RegencyEdit from './Container/Regency/Edit';
import { PrivateRoute, LoginRoute } from "./Util/Auth";

const routes = [
  '/',
  '/country',
  '/province',
  // '/regency'
];

ReactDOM.render(
  <Router>
    <div>
      {routes.map((route, index) =>{
        const exact = route==='/';
        return (
          <Route
            key={index}
            path={route}
            exact={exact}
            render={() => <App/>}
          />
        )})}
      <Switch>
        <LoginRoute path="/login" exact> <Login/> </LoginRoute>
        <PrivateRoute path="/" exact> </PrivateRoute>
        <PrivateRoute path="/country" exact> <Country/> </PrivateRoute>
        <PrivateRoute path="/country/add" exact> <CountryAdd/> </PrivateRoute>
        <PrivateRoute path="/country/edit/:id" exact> <CountryEdit/> </PrivateRoute>
        <PrivateRoute path="/country/detail/:id" exact> <CountryDetail/> </PrivateRoute>
        <PrivateRoute path="/province" exact> <Province/> </PrivateRoute>
        <PrivateRoute path="/province/add" exact> <ProvinceAdd/> </PrivateRoute>
        <PrivateRoute path="/province/edit/:id" exact> <ProvinceEdit/> </PrivateRoute>
        <PrivateRoute path="/province/detail/:id" exact> <ProvinceDetail/> </PrivateRoute>
        <PrivateRoute path="/regency" exact> <Regency/> </PrivateRoute>
        <PrivateRoute path="/regency/add" exact> <RegencyAdd/> </PrivateRoute>
        <PrivateRoute path="/regency/edit/:id" exact> <RegencyEdit/> </PrivateRoute>
        <PrivateRoute path="/regency/detail/:id" exact> <RegencyDetail/> </PrivateRoute>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
