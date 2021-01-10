/* eslint-disable import/no-unresolved */
import React from 'react';

import { Switch, useRouteMatch } from 'react-router-dom';
import PublicRoute from 'routes/publicRoute';
import LandingLayout from 'components/Layouts/LandingLayout';
import PrivateRoute from 'routes/Admin/privateRoute';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ConfirmationPassword from './ConfirmationPassword';
import Main from './Main';

const Admin = () => {
  const match = useRouteMatch();

  return (
    <Switch>
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

export default Admin;
