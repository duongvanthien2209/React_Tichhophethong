/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { getAllApi, deleteApi } from 'api/RestaurantManger/starApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getAll = createAsyncThunk('star/getAll', async (params) => {
  const { status, error, data } = await getAllApi(params);

  if (status === 'failed' && error) throw new Error(error.message);

  if (status === 'success' && data) {
    // const { restaurantTypes } = data;
    // return restaurantTypes;
    // console.log(data);
    return data;
  }
  throw new Error('Có lỗi xảy ra');
});

export const deleteStar = createAsyncThunk('star/delete', async (params) => {
  const { status, error, data } = await deleteApi(params);

  if (status === 'failed' && error) throw new Error(error.message);

  if (status === 'success' && data) {
    // const { restaurantTypes } = data;
    // return restaurantTypes;
    return params;
  }
  throw new Error('Có lỗi xảy ra');
});

const starSlide = createSlice({
  name: 'restaurantManager/star',
  initialState: {
    stars: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.loading = true;
      state.stars = action.payload.stars;
    },
    [deleteStar.pending]: (state) => {
      state.loading = true;
    },
    [deleteStar.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.stars.findIndex(
        (star) => star._id === action.payload,
      );
      state.stars.splice(index, 1);
    },
  },
});

const { reducer: starReducer } = starSlide;
export default starReducer;
