/* eslint-disable import/prefer-default-export */
import axiosClient from './apiClient';

const baseUrl = '/restaurantType';

export const getAllApi = () => axiosClient.get(baseUrl);
