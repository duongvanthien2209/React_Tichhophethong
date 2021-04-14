/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAll } from 'redux/Slices/restaurantTypeSlide';
import ThongTinForm from 'components/RestaurantManager/QuanLyDS/ThongTin/ThongTinForm';
import { update } from 'redux/Slices/RestaurantManager/Auth/authSlide';

const ThongTin = () => {
  const dispatch = useDispatch();
  const { restaurantManager } = useSelector(
    (state) => state.restaurantManager_auth,
  );
  const { restaurantTypes } = useSelector((state) => state.restaurantType);

  const [file, setFile] = useState(null);

  const initialValues = {
    email: restaurantManager.email,
    name: restaurantManager.name,
    sdt: restaurantManager.SDT,
    diaChi: restaurantManager.diaChi,
    loaiHinh: restaurantManager.loaiHinh,
  };

  const handleSubmit = async ({ email, name, sdt, diaChi, loaiHinh }) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', name);
      formData.append('sdt', sdt);
      formData.append('diaChi', diaChi);
      formData.append('loaiHinh', loaiHinh);

      if (file) formData.append('hinhAnh', file);

      const actionResult = await dispatch(update(formData));
      unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const actionResult = await dispatch(getAll());
      unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="h3 mb-4 text-gray-800">Quản lý</h1>
      <ThongTinForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        options={restaurantTypes.map((item) => ({
          label: item.name,
          value: item._id,
        }))}
        file={file}
        setFile={setFile}
      />
    </div>
  );
};

export default ThongTin;
