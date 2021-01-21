/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import SideBar from 'components/RestaurantManager/Main/SideBar';
import TopBar from 'components/RestaurantManager/Main/TopBar';
import React from 'react';
// import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
// import io from 'socket.io-client';
// import { so } from 'constants/index';
import { useSelector } from 'react-redux';
import BinhLuan from '../QuanLyDS/BinhLuan';
import DanhGia from '../QuanLyDS/DanhGia';
import MonAn from '../QuanLyDS/MonAn';

// const ENDPOINT = 'http://localhost:5000';

// let socket;

const Main = ({ restaurantManagerId, setRestaurantManagerId }) => {
  const match = useRouteMatch();
  const { restaurantManager } = useSelector(
    (state) => state.restaurantManager_auth,
  );
  // console.log(`Count: ${count}`);

  // console.log(restaurantManager);

  if (restaurantManager && !restaurantManagerId)
    setRestaurantManagerId(() => restaurantManager._id);

  return (
    <div id="wrapper">
      <SideBar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar />

          <div className="container-fluid">
            <Switch>
              <Route exact path={`${match.url}/qlMonAn`} component={MonAn} />

              <Route
                exact
                path={`${match.url}/qlBinhLuan`}
                component={BinhLuan}
              />

              <Route
                exact
                path={`${match.url}/qlDanhGia`}
                component={DanhGia}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  setRestaurantManagerId: PropTypes.func.isRequired,
  restaurantManagerId: PropTypes.string.isRequired,
};

export default Main;
