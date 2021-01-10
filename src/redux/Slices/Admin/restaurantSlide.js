/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { getAllApi, findApi, getCounterApi } from 'api/restaurantApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getCounter = createAsyncThunk(
  'restaurant/getCounter',
  async () => {
    const { status, error, data } = await getCounterApi();

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      // const { counter, limit } = data;
      return data;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

export const getAll = createAsyncThunk(
  'restaurant/getall',
  async (params = 1) => {
    const { status, error, data } = await getAllApi(params);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      // const { restaurants } = data;
      return data;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

export const find = createAsyncThunk('restaurant/find', async (params) => {
  const { status, error, data } = await findApi(params.name, params.page);

  if (status === 'failed' && error) throw new Error(error.message);

  if (status === 'success' && data) {
    // const { restaurants } = data;
    return data;
  }
  throw new Error('Có lỗi xảy ra');
});

const restaurant = createSlice({
  name: 'restaurant',
  initialState: {
    restaurants: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.loading = true;
      state.restaurants = action.payload.restaurants;
    },
    [find.pending]: (state) => {
      state.loading = true;
    },
    [find.fulfilled]: (state, action) => {
      state.loading = true;
      state.restaurants = action.payload.restaurants;
    },
    [getCounter.pending]: (state) => {
      state.loading = true;
    },
    [getCounter.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

const { reducer: restaurantReducer } = restaurant;
export default restaurantReducer;
