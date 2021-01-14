/* eslint-disable import/prefer-default-export */
import axiosClient from '../apiClient';

const baseUrl = '/restaurantManager/foodType';

export const getAllApi = (page) => axiosClient.get(`${baseUrl}?q=${page}`);
