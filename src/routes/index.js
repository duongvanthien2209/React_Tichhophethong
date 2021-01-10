/* eslint-disable import/no-unresolved */
import React from 'react';

import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Admin from 'containers/Admin';
import RestaurantManager from 'containers/RestaurantManager';
import PublicRoute from './publicRoute';

const Routes = () => (
  <Router>
    <Switch>
      <PublicRoute path="/admin" component={Admin} />

      <PublicRoute path="/restaurantManager" component={RestaurantManager} />
    </Switch>
  </Router>
);

export default Routes;
