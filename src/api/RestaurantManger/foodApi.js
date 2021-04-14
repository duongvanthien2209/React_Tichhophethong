/* eslint-disable no-debugger */
import axiosClient from '../apiClient';

const baseUrl = '/restaurantManager/food';

export const getAllApi = (page) => axiosClient.get(`${baseUrl}?q=${page}`);

export const findApi = (name, page) =>
  axiosClient.get(
    `${baseUrl}/find?name=${
      name.split(' ').length > 1 ? name.split(' ').join('+') : name
    }&q=${page}`,
  );

export const createFoodApi = (formData) =>
  axiosClient.post(`${baseUrl}/register`, formData);

export const updateFoodApi = (foodId, formData) => {
  debugger;
  return axiosClient.post(`${baseUrl}/update/${foodId}`, formData);
};

export const deleteFoodApi = (foodId) =>
  axiosClient.get(`${baseUrl}/delete/${foodId}`);
