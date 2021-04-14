/* eslint-disable import/prefer-default-export */
import axiosClient from '../apiClient';

const baseUrl = '/restaurantManager/mail';

export const getAllApi = (page) => axiosClient.get(`${baseUrl}?q=${page}`);

export const getAllNotReadApi = () => axiosClient.get(`${baseUrl}/notRead`);

export const updateReadedApi = (mailId) =>
  axiosClient.get(`${baseUrl}/update/${mailId}`);
