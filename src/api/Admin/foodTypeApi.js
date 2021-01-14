/* eslint-disable import/prefer-default-export */
import axiosClient from '../apiClient';

const baseUrl = '/admin/foodType';

export const getAllApi = (page) => axiosClient.get(`${baseUrl}?q=${page}`);
