/* eslint-disable import/no-unresolved */
import LandingLayout from 'components/Layouts/LandingLayout';
import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PublicRoute from 'routes/publicRoute';
import PrivateRoute from 'routes/RestaurantManager/privateRoute';
import ConfirmationPassword from './ConfirmationPassword';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Main from './Main';
import Register from './Register';

const RestaurantManager = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <PublicRoute
        exact
        path={`${match.url}/register`}
        component={() => (
          <LandingLayout>
            <Register />
          </LandingLayout>
        )}
      />

      <PublicRoute
        exact
        path={`${match.url}/login`}
        component={() => (
          <LandingLayout>
            <Login />
          </LandingLayout>
        )}
      />

      <PublicRoute
        exact
        path={`${match.url}/forgotPassword`}
        component={() => (
          <LandingLayout>
            <ForgotPassword />
          </LandingLayout>
        )}
      />

      <PublicRoute
        path={`${match.url}/confirmationForgotPassword/:resetToken`}
        component={() => (
          <LandingLayout>
            <ConfirmationPassword />
          </LandingLayout>
        )}
      />

      <PrivateRoute path={`${match.url}/main`} component={() => <Main />} />
    </Switch>
  );
};

export default RestaurantManager;
