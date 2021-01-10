/* eslint-disable import/no-unresolved */
import SideBar from 'components/RestaurantManager/Main/SideBar';
import TopBar from 'components/RestaurantManager/Main/TopBar';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MonAn from '../QuanLyDS/MonAn';

const Main = () => {
  const match = useRouteMatch();

  return (
    <div id="wrapper">
      <SideBar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar />

          <div className="container-fluid">
            <Switch>
              <Route exact path={`${match.url}/qlMonAn`} component={MonAn} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
