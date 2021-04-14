/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import { unwrapResult } from '@reduxjs/toolkit';
import MonAnTable from 'components/RestaurantManager/QuanLyDS/MonAn/MonAnTable';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ToastContext } from 'components/Providers/Toast';
import handleToast from 'helpers/handleToast';

import { createFoodApi } from 'api/RestaurantManger/foodApi';
import {
  getAll,
  find,
  updateFood,
  deleteFood,
} from 'redux/Slices/RestaurantManager/foodSlide';
import { getAll as getAllFood } from 'redux/Slices/RestaurantManager/foodTypeSlide';

const MonAn = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const { foods } = useSelector((state) => state['restaurantManager/food']);
  const { foodTypes } = useSelector(
    (state) => state['restaurantManager/foodType'],
  );

  const { toast } = useContext(ToastContext);

  const [file, setFile] = useState(null);
  const [counter, setCounter] = useState(1);
  const [searchText, setSearchText] = useState('');
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

  const fetchFoodType = async () => {
    try {
      const actionResult = await dispatch(getAllFood(1));
      unwrapResult(actionResult);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (values) => {
    try {
      const actionResult = await dispatch(
        find({ name: values ? values.search : searchText, page: counter }),
      );
      const { total: currentTotal } = unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
      setTotal(() => currentTotal);
      if (values) setSearchText(() => values.search);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values) => {
    // debugger;
    const { tenMon, moTa, gia, loai } = values;

    try {
      if (!file) throw new Error('Có lỗi xảy ra');

      const formData = new FormData();
      formData.append('tenMon', tenMon);
      formData.append('moTa', moTa);
      formData.append('gia', gia);
      formData.append('loai', loai);
      formData.append('hinhAnh', file);

      // console.log(formData);

      const { status, error, data } = await createFoodApi(formData);

      if (status === 'failed' && error) throw new Error(error.message);

      if (status === 'success' && data) {
        // const { restaurantTypes } = data;
        // return restaurantTypes;
        setSearchText(() => '');
        setCounter(() => 1);
        fetchData();
      }

      return handleToast(toast, 'Thêm thành công');
    } catch (error) {
      return console.log(error);
    }
  };

  const handleUpdate = async (foodId, values) => {
    // console.log(values);
    // debugger;
    const { tenMon, moTa, gia, loai } = values;

    try {
      const formData = new FormData();
      formData.append('tenMon', tenMon);
      formData.append('moTa', moTa);
      formData.append('gia', gia);
      formData.append('loai', loai);
      formData.append('hinhAnh', file);

      if (file) formData.append('hinhAnh', file);

      // console.log(formData);
      const actionResult = await dispatch(updateFood({ foodId, formData }));
      unwrapResult(actionResult);

      setSearchText(() => '');
      setCounter(() => 1);
      await fetchData();
      return handleToast(toast, 'Cập nhật thành công');
    } catch (error) {
      return console.log(error);
    }
  };

  const handleDelete = async (foodId) => {
    try {
      const actionResult = await dispatch(deleteFood(foodId));
      unwrapResult(actionResult);
      handleToast(toast, 'Xóa thành công');
    } catch (error) {
      console.log(error);
    }
  };

  // const handleChangeSubmit = async(values) => {
  //   const { tenMon, moTa, gia, loai } = values;
  // }

  const changePage = (page) => {
    setCounter(() => page);
  };

  useEffect(() => {
    fetchFoodType();
  }, [match.url]);

  useEffect(() => {
    if (searchText) handleSearch();
    else fetchData();
  }, [counter, searchText]);

  return (
    <div>
      <h1 className="h3 mb-4 text-gray-800">Quản lý</h1>
      <MonAnTable
        foods={foods}
        onSearch={handleSearch}
        counter={{ currentPage: counter, total }}
        changePage={changePage}
        options={foodTypes.map((item) => ({
          label: item.tenLoai,
          value: item._id,
        }))}
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        file={file}
        setFile={setFile}
      />
    </div>
  );
};

export default MonAn;
