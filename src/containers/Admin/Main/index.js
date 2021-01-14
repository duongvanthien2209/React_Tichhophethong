/* eslint-disable import/no-unresolved */
import SideBar from 'components/Admin/Main/SideBar';
import TopBar from 'components/Admin/Main/TopBar';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CuaHang from '../QuanLyDS/CuaHang';
import LoaiMonAn from '../QuanLyDS/LoaiMonAn';
import MonAn from '../QuanLyDS/MonAn';
import NguoiDung from '../QuanLyDS/NguoiDung';

const Main = () => {
  const match = useRouteMatch();
  // console.log(match.url);

  return (
    <div id="wrapper">
      <SideBar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar />

          <div className="container-fluid">
            <Switch>
              <Route
                exact
                path={`${match.url}/qlCuaHang`}
                component={CuaHang}
              />

              <Route
                exact
                path={`${match.url}/qlNguoiDung`}
                component={NguoiDung}
              />

              <Route exact path={`${match.url}/qlMonAn`} component={MonAn} />

              <Route
                exact
                path={`${match.url}/qlLoaiMonAn`}
                component={LoaiMonAn}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
