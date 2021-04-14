/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import LandingLayout from 'components/Layouts/LandingLayout';
import React, { useContext, useEffect, useState } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PublicRoute from 'routes/publicRoute';
import PrivateRoute from 'routes/RestaurantManager/privateRoute';
import { Provider, useDispatch } from 'react-redux';
import restaurantManagerStore from 'redux/Stores/restaurantManagerStore';
import io from 'socket.io-client';
import { ENDPOINT } from 'constants/index';
import { ToastContext } from 'components/Providers/Toast';
import handleToast from 'helpers/handleToast';
import { getAllNotRead } from 'redux/Slices/RestaurantManager/mailSlide';
import { unwrapResult } from '@reduxjs/toolkit';
import ConfirmationPassword from './ConfirmationPassword';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Main from './Main';
import Register from './Register';

let socket;

const RestaurantManager = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const [restaurantManagerId, setRestaurantManagerId] = useState('');

  const { toast } = useContext(ToastContext);

  useEffect(() => {
    // console.log('RestaurantManager Done', restaurantManagerId);
    if (restaurantManagerId) {
      // console.log('Done1');
      socket = io(ENDPOINT);
      // // Load lại tin nhắn chưa đọc và hiển thị mesage
      socket.on('billMessage', async (message) => {
        // debugger;
        // console.log(message);
        try {
          // console.log(counter);
          const actionResult = await dispatch(getAllNotRead());
          unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
          // setTotal(() => currentTotal);
          handleToast(toast, 'Có tin nhắn mới');
        } catch (error) {
          console.log(error);
          handleToast(toast, 'Có lỗi xảy ra', false);
        }
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
            // socket={socket}
          />
        )}
      />
    </Switch>
  );
};

export default RestaurantManager;
