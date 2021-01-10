/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { baseUrl } from 'constants/index';
import axiosClient from './apiClient';

export const getCounterApi = () =>
  axiosClient.get(`${baseUrl}/restaurant/counter`);

export const getAllApi = (page) =>
  axiosClient.get(`${baseUrl}/restaurant?q=${page}`);

export const findApi = (name, page = 1) =>
  axiosClient.get(
    `${baseUrl}/restaurant/find?name=${
      name.split(' ').length > 1 ? name.split(' ').join('+') : name
    }&q=${page}`,
  );
