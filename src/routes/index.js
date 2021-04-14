/* eslint-disable import/no-unresolved */
import React from 'react';

import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Admin from 'containers/Admin';
import RestaurantManager from 'containers/RestaurantManager';
import WaitingProvider from 'components/Providers/Waiting';
import ToastProvider from 'components/Providers/Toast';
import { Provider } from 'react-redux';
import restaurantManagerStore from 'redux/Stores/restaurantManagerStore';
import PublicRoute from './publicRoute';

const Routes = () => (
  <Router>
    <WaitingProvider>
      <ToastProvider>
        <Switch>
          <PublicRoute path="/admin" component={Admin} />

          <Provider store={restaurantManagerStore}>
            <PublicRoute
              path="/restaurantManager"
              component={RestaurantManager}
            />
          </Provider>
        </Switch>
      </ToastProvider>
    </WaitingProvider>
  </Router>
);

export default Routes;
