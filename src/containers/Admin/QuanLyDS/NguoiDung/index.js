/* eslint-disable import/no-unresolved */
import { unwrapResult } from '@reduxjs/toolkit';
import NguoiDungTable from 'components/Admin/QuanLyDS/NguoiDung/NguoiDungTable';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAll, find } from 'redux/Slices/Admin/userSlide';

const NguoiDung = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [counter, setCounter] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [total, setTotal] = useState(0);

  console.log(users);

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

  // useEffect(() => {
  //   fetchData();
  // }, [counter]);

  return (
    <div>
      <h1 className="h3 mb-4 text-gray-800">Blank Page</h1>
      <NguoiDungTable
        users={users}
        onSearch={handleSearch}
        counter={{ currentPage: counter, total }}
        changePage={changePage}
      />
    </div>
  );
};

export default NguoiDung;
