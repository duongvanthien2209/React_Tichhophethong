/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { getAllApi, getAllFoodTypeApi } from 'api/Admin/foodTypeApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getAll = createAsyncThunk('foodType/getAll', async (params) => {
  const { status, error, data } = await getAllApi(params);

  if (status === 'failed' && error) throw new Error(error.message);

  if (status === 'success' && data) {
    // const { foodTypes } = data;
    // return foodTypes;
    return data;
  }
  throw new Error('Có lỗi xảy ra');
});

export const getAllFoodType = createAsyncThunk(
  'foodType/getAllFoodType',
  async () => {
    const { status, error, data } = await getAllFoodTypeApi();

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      // const { foodTypes } = data;
      // return foodTypes;
      return data;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

const foodTypeSlide = createSlice({
  name: 'admin/foodType',
  initialState: {
    foodTypes: [],
    loading: false,
    foodTypesAll: [],
  },
  reducers: {},
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.foodTypes = action.payload.foodTypes;
    },
    [getAllFoodType.pending]: (state) => {
      state.loading = true;
    },
    [getAllFoodType.fulfilled]: (state, action) => {
      state.loading = false;
      state.foodTypesAll = action.payload.foodTypes;
    },
  },
});

const { reducer: adminFoodTypeReducer } = foodTypeSlide;
export default adminFoodTypeReducer;
