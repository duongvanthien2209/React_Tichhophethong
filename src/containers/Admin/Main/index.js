/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { unwrapResult } from '@reduxjs/toolkit';
import SideBar from 'components/Admin/Main/SideBar';
import TopBar from 'components/Admin/Main/TopBar';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
// import { so } from 'constants/index';
import { getAll } from 'redux/Slices/restaurantTypeSlide';
import CuaHang from '../QuanLyDS/CuaHang';
import LoaiMonAn from '../QuanLyDS/LoaiMonAn';
import MonAn from '../QuanLyDS/MonAn';
import NguoiDung from '../QuanLyDS/NguoiDung';
import ThongKe from '../ThongKe/ThongKe';

const Main = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const { restaurantTypes } = useSelector((state) => state.restaurantType);
  // console.log(match.url);

  const fetchData = async () => {
    try {
      // console.log(counter);
      const actionResult = await dispatch(getAll());
      unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
      // setTotal(() => currentTotal);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // debugger;
    // console.log('Done1', restaurantTypes);
    if (restaurantTypes.length === 0) {
      // console.log('Done2');
      fetchData();
    }
  }, []);

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

              <Route exact path={`${match.url}/thongKe`} component={ThongKe} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
