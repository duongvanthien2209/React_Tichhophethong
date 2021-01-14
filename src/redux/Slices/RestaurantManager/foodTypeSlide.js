/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { getAllApi } from 'api/RestaurantManger/foodTypeApi';

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

const foodTypeSlide = createSlice({
  name: 'restaurantManager/foodType',
  initialState: {
    foodTypes: [],
    loading: false,
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
  },
});

const { reducer: foodTypeReducer } = foodTypeSlide;
export default foodTypeReducer;
