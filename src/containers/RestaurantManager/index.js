/* eslint-disable import/no-unresolved */
import LandingLayout from 'components/Layouts/LandingLayout';
import React, { useEffect } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PublicRoute from 'routes/publicRoute';
import PrivateRoute from 'routes/RestaurantManager/privateRoute';
import { Provider } from 'react-redux';
import restaurantManagerStore from 'redux/Stores/restaurantManagerStore';
import io from 'socket.io-client';
import ConfirmationPassword from './ConfirmationPassword';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Main from './Main';
import Register from './Register';

const ENDPOINT = 'http://localhost:5000';

let socket;

const RestaurantManager = () => {
  const match = useRouteMatch();

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log(socket);

    return () => {
      // socket.emit('disconnect', 'Thanh cong');
      socket.off();
    };
  }, []);

  return (
    <Provider store={restaurantManagerStore}>
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
    </Provider>
  );
};

export default RestaurantManager;
