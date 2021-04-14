/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useRouteMatch } from 'react-router-dom';

import {
  getAll,
  updateCTBill,
  updateStatusBill,
  // deleteComment,
} from 'redux/Slices/RestaurantManager/billSlide';
// import { createFoodApi } from 'api/RestaurantManger/foodApi';
// import { getAll, find } from 'redux/Slices/RestaurantManager/foodSlide';
// import BinhLuanTable from 'components/RestaurantManager/QuanLyDS/BinhLuan/BinhLuanTable';
import HoaDonTable from 'components/RestaurantManager/QuanLyDS/HoaDon/HoaDonTable';

const HoaDon = () => {
  // const match = useRouteMatch();
  const dispatch = useDispatch();
  const { bills } = useSelector((state) => state['restaurantManager/bill']);

  const [counter, setCounter] = useState(1);
  // const [searchText, setSearchText] = useState('');
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      // console.log(counter);
      const actionResult = await dispatch(getAll(counter));
      const { total: currentTotal } = unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
      setTotal(() => currentTotal);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCTBill = async (billId, data) => {
    // debugger;
    try {
      // console.log(counter);
      const actionResult = await dispatch(
        updateCTBill({ billId, ctBills: data }),
      );
      unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatusBill = async (billId, status) => {
    // debugger;
    try {
      // console.log(counter);
      const actionResult = await dispatch(updateStatusBill({ billId, status }));
      unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = (page) => {
    setCounter(() => page);
  };

  // const handleDeleteClick = async (userId) => {
  //   try {
  //     // console.log(counter);
  //     const actionResult = await dispatch(deleteComment(userId));
  //     await unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, [counter, bills]);

  return (
    <div>
      <h1 className="h3 mb-4 text-gray-800">Quản lý</h1>
      <HoaDonTable
        bills={bills}
        changePage={changePage}
        onUpdateCTBill={handleUpdateCTBill}
        counter={{ currentPage: counter, total }}
        updateStatusBill={handleUpdateStatusBill}
        // onDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default HoaDon;
