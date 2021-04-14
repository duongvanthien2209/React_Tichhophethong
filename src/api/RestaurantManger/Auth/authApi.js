/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { baseURLRestaurantManagerAuth } from 'constants/index';
import axiosClient from '../../apiClient';

export const registerApi = (data) =>
  axiosClient.post(`${baseURLRestaurantManagerAuth}/register`, data);

export const loginApi = (data) =>
  axiosClient.post(`${baseURLRestaurantManagerAuth}/login`, data);

export const forgotPasswordApi = (data) =>
  axiosClient.post(`${baseURLRestaurantManagerAuth}/forgotPassword`, data);

export const resetPasswordApi = ({ token, data }) =>
  axiosClient.post(
    `${baseURLRestaurantManagerAuth}/resetPassword/${token}`,
    data,
  );

export const updateApi = (formData) =>
  axiosClient.post(`${baseURLRestaurantManagerAuth}/update`, formData);

export const thongKeApi = () =>
  axiosClient.get(`${baseURLRestaurantManagerAuth}/thongKe`);
