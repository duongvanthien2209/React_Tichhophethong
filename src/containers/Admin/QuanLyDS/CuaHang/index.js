/* eslint-disable import/no-unresolved */
import { unwrapResult } from '@reduxjs/toolkit';
import CuaHangTable from 'components/Admin/QuanLyDS/CuaHang/CuaHangTable';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAll, find } from 'redux/Slices/Admin/restaurantSlide';

const CuaHang = () => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state) => state.restaurant);
  const [counter, setCounter] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [total, setTotal] = useState(0);
  // const [searchMode, setSearchMode] = useState(false);

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

  const changePage = (page) => {
    setCounter(() => page);
  };

  useEffect(() => {
    // fetchData();
    if (searchText) handleSearch();
    else fetchData();
  }, [counter, searchText]);

  useEffect(() => {
    fetchData();
  }, [counter]);

  return (
    <div>
      <h1 className="h3 mb-4 text-gray-800">Blank Page</h1>
      <CuaHangTable
        restaurants={restaurants}
        onSearch={handleSearch}
        // searchMode={searchMode}
        counter={{ currentPage: counter, total }}
        changePage={changePage}
      />
    </div>
  );
};

export default CuaHang;
