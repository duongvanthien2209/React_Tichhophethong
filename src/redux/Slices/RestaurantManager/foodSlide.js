/* eslint-disable no-underscore-dangle */
/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import {
  getAllApi,
  findApi,
  createFoodApi,
  updateFoodApi,
  deleteFoodApi,
} from 'api/RestaurantManger/foodApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getAll = createAsyncThunk('food/getAll', async (params) => {
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

export const find = createAsyncThunk('food/find', async (params) => {
  const { status, error, data } = await findApi(params.name, params.page);

  if (status === 'failed' && error) throw new Error(error.message);

  if (status === 'success' && data) {
    // const { restaurantTypes } = data;
    // return restaurantTypes;
    return data;
  }
  throw new Error('Có lỗi xảy ra');
});

export const createFood = createAsyncThunk(
  'food/createFood',
  async (params) => {
    const { status, error, data } = await createFoodApi(params);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      // const { restaurantTypes } = data;
      // return restaurantTypes;
      return true;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

export const updateFood = createAsyncThunk(
  'food/updateFood',
  async ({ foodId, formData }) => {
    // debugger;
    const { status, error, data } = await updateFoodApi(foodId, formData);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      // const { restaurantTypes } = data;
      // return restaurantTypes;
      return data;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

export const deleteFood = createAsyncThunk(
  'food/deleteFood',
  async (params) => {
    // debugger;
    const { status, error, data } = await deleteFoodApi(params);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      // const { restaurantTypes } = data;
      // return restaurantTypes;
      return params;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

const foodSlide = createSlice({
  name: 'restaurantManager/food',
  initialState: {
    foods: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.foods = action.payload.foods;
    },
    [find.pending]: (state) => {
      state.loading = true;
    },
    [find.fulfilled]: (state, action) => {
      state.loading = false;
      state.foods = action.payload.foods;
    },
    [createFood.pending]: (state) => {
      state.loading = true;
    },
    [createFood.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateFood.pending]: (state) => {
      state.loading = true;
    },
    [updateFood.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.foods.findIndex(
        (food) => food._id === action.payload.food._id,
      );
      state.foods[index] = action.payload.food;
    },
    [deleteFood.pending]: (state) => {
      state.loading = true;
    },
    [deleteFood.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.foods.findIndex(
        (food) => food._id === action.payload,
      );
      state.foods.splice(index, 1);
    },
  },
});

const { reducer: foodReducer } = foodSlide;
export default foodReducer;
