/* eslint-disable import/prefer-default-export */
import axiosClient from '../apiClient';

const baseUrl = '/restaurantManager/comment';

export const getAllApi = (page) => axiosClient.get(`${baseUrl}?q=${page}`);

export const deleteApi = (userId) =>
  axiosClient.get(`${baseUrl}/delete/${userId}`);
