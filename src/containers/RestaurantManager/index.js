/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import LandingLayout from 'components/Layouts/LandingLayout';
import React, { useEffect, useState } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PublicRoute from 'routes/publicRoute';
import PrivateRoute from 'routes/RestaurantManager/privateRoute';
import { Provider } from 'react-redux';
import restaurantManagerStore from 'redux/Stores/restaurantManagerStore';
import io from 'socket.io-client';
import { ENDPOINT } from 'constants/index';
import ConfirmationPassword from './ConfirmationPassword';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Main from './Main';
import Register from './Register';

let socket;

const RestaurantManager = () => {
  const match = useRouteMatch();
  const [restaurantManagerId, setRestaurantManagerId] = useState('');

  useEffect(() => {
    // console.log('RestaurantManager Done', restaurantManagerId);

    if (restaurantManagerId) {
      socket = io(ENDPOINT);
      // console.log('Done1');

      socket.on('billMessage', (message) => {
        debugger;
        console.log(message);
      });

      socket.emit(
        'restaurantManagerJoin',
        { restaurantManagerId },
        (errorMessage) => {
          console.log(errorMessage);
        },
      );

      return () => {
        socket.off();
      };
    }

    return true;
  }, [restaurantManagerId]);

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

        <PrivateRoute
          path={`${match.url}/main`}
          component={() => (
            <Main
              restaurantManagerId={restaurantManagerId}
              setRestaurantManagerId={setRestaurantManagerId}
            />
          )}
        />
      </Switch>
    </Provider>
  );
};

export default RestaurantManager;
