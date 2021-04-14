/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import axiosClient from 'api/apiClient';

import { baseURLAdminAuth } from 'constants/index';

export const loginApi = (data) => {
  // debugger;
  // console.log(data);
  const url = `${baseURLAdminAuth}/login`;
  return axiosClient.post(url, data);
};

export const forgotPasswordApi = (data) => {
  const url = `${baseURLAdminAuth}/forgotPassword`;
  return axiosClient.post(url, data);
};

export const resetPasswordApi = ({ resetToken, values }) => {
  const url = `${baseURLAdminAuth}/resetPassword/${resetToken}`;
  return axiosClient.post(url, values);
};

export const thongKeApi = () => axiosClient.get(`${baseURLAdminAuth}/thongKe`);
