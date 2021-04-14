/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useRouteMatch } from 'react-router-dom';

import { getAll, deleteStar } from 'redux/Slices/RestaurantManager/starSlide';
// import { createFoodApi } from 'api/RestaurantManger/foodApi';
// import { getAll, find } from 'redux/Slices/RestaurantManager/foodSlide';
// import BinhLuanTable from 'components/RestaurantManager/QuanLyDS/BinhLuan/BinhLuanTable';
import DanhGiaTable from 'components/RestaurantManager/QuanLyDS/DanhGia/DanhGiaTable';

const DanhGia = () => {
  // const match = useRouteMatch();
  const dispatch = useDispatch();
  const { stars } = useSelector((state) => state['restaurantManager/star']);

  const [counter, setCounter] = useState(1);
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

  const handleDeleteClick = async (userId) => {
    try {
      // console.log(counter);
      const actionResult = await dispatch(deleteStar(userId));
      await unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = (page) => {
    setCounter(() => page);
  };

  useEffect(() => {
    fetchData();
  }, [counter, stars]);

  return (
    <div>
      <h1 className="h3 mb-4 text-gray-800">Quản lý</h1>
      <DanhGiaTable
        stars={stars}
        changePage={changePage}
        counter={{ currentPage: counter, total }}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default DanhGia;
