/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import { unwrapResult } from '@reduxjs/toolkit';
// import MonAnTable from 'components/Admin/QuanLyDS/MonAn/MonAnTable';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoaiMonAnTable from 'components/Admin/QuanLyDS/LoaiMonAn/LoaiMonAnTable';
// import { useRouteMatch } from 'react-router-dom';

// import { createFoodApi } from 'api/RestaurantManger/foodApi';
import { getAll } from 'redux/Slices/Admin/foodTypeSlide';
// import { getAll as getAllFood } from 'redux/Slices/RestaurantManager/foodTypeSlide';

const LoaiMonAn = () => {
  const dispatch = useDispatch();
  const { foodTypes } = useSelector((state) => state['admin/foodType']);

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

  // const fetchFoodType = async () => {
  //   try {
  //     const actionResult = await dispatch(getAllFood(1));
  //     unwrapResult(actionResult);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSearch = async (values) => {
  //   try {
  //     const actionResult = await dispatch(
  //       find({ name: values ? values.search : searchText, page: counter }),
  //     );
  //     const { total: currentTotal } = unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
  //     setTotal(() => currentTotal);
  //     if (values) setSearchText(() => values.search);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSubmit = async (values) => {
  //   // debugger;
  //   const { tenMon, moTa, gia, loai } = values;

  //   try {
  //     if (!file) throw new Error('Có lỗi xảy ra');

  //     const formData = new FormData();
  //     formData.append('tenMon', tenMon);
  //     formData.append('moTa', moTa);
  //     formData.append('gia', gia);
  //     formData.append('loai', loai);
  //     formData.append('hinhAnh', file);

  //     // console.log(formData);

  //     const { status, error, data } = await createFoodApi(formData);

  //     if (status === 'failed' && error) throw new Error(error.message);

  //     if (status === 'success' && data) {
  //       // const { restaurantTypes } = data;
  //       // return restaurantTypes;
  //       setSearchText(() => '');
  //       setCounter(() => 1);
  //       fetchData();
  //     }

  //     return true;
  //   } catch (error) {
  //     return console.log(error);
  //   }
  // };

  const changePage = (page) => {
    setCounter(() => page);
  };

  // useEffect(() => {
  //   fetchFoodType();
  // }, [match.url]);

  // useEffect(() => {
  //   if (searchText) handleSearch();
  //   else fetchData();
  // }, [counter, searchText]);

  useEffect(() => {
    fetchData();
  }, [counter]);

  return (
    <div>
      <h1 className="h3 mb-4 text-gray-800">Blank Page</h1>
      <LoaiMonAnTable
        foodTypes={foodTypes}
        // onSearch={handleSearch}
        counter={{ currentPage: counter, total }}
        changePage={changePage}
      />
    </div>
  );
};

export default LoaiMonAn;
