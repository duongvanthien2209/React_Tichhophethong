import axiosClient from '../apiClient';

const baseUrl = '/admin/food';

export const getAllApi = (page) => axiosClient.get(`${baseUrl}?q=${page}`);

export const findApi = (name, page) =>
  axiosClient.get(
    `${baseUrl}/find?name=${
      name.split(' ').length > 1 ? name.split(' ').join('+') : name
    }&q=${page}`,
  );
