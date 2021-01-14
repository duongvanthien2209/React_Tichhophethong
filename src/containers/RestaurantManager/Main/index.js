/* eslint-disable import/no-unresolved */
import SideBar from 'components/RestaurantManager/Main/SideBar';
import TopBar from 'components/RestaurantManager/Main/TopBar';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
// import io from 'socket.io-client';
import BinhLuan from '../QuanLyDS/BinhLuan';
import DanhGia from '../QuanLyDS/DanhGia';
import MonAn from '../QuanLyDS/MonAn';

// const ENDPOINT = 'http://localhost:5000';

// let socket;

const Main = () => {
  const match = useRouteMatch();

  // useEffect(() => {
  //   socket = io(ENDPOINT);

  //   console.log(socket);

  //   // socket.emit('sendMessage', () => console.log('Done'));

  //   // return () => {
  //   //   socket.emit('disconnect', () => {
  //   //     socket.off();
  //   //   });
  //   // };
  // }, []);

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

export default Main;
