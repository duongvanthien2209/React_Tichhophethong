/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
import axiosClient from '../apiClient';

const baseUrl = '/restaurantManager/bill';

export const getAllApi = (page) => axiosClient.get(`${baseUrl}?q=${page}`);

export const getCTBillApi = (billId) => axiosClient.get(`${baseUrl}/${billId}`);

export const deleteCTBillApi = (ctBillId) =>
  axiosClient.get(`${baseUrl}/delete/${ctBillId}`);

export const updateCTBillApi = (billId, data) =>
  // debugger;
  axiosClient.post(`${baseUrl}/update/${billId}`, { ctBills: data });

export const updateStatusBillApi = (billId, status) =>
  axiosClient.get(`${baseUrl}/complete/${billId}?q=${status}`);

export const thongKeByYearApi = (year) =>
  axiosClient.get(`${baseUrl}/thongKe/nam?q=${year}`);

export const thongKeByMonthApi = (year, month) =>
  axiosClient.get(`${baseUrl}/thongKe/thang?year=${year}&&month=${month}`);
