/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { getAllApi } from 'api/restaurantTypeApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getAll = createAsyncThunk('restaurantType/getAll', async () => {
  const { status, error, data } = await getAllApi();

  if (status === 'failed' && error) throw new Error(error.message);

  if (status === 'success' && data) {
    const { restaurantTypes } = data;
    return restaurantTypes;
  }
  throw new Error('Có lỗi xảy ra');
});

const restaurantTypeSlide = createSlice({
  name: 'restaurantType',
  initialState: {
    restaurantTypes: [],
    loading: false,
    errors: [],
  },
  reducers: {},
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.restaurantTypes = action.payload;
    },
  },
});

const { reducer: restaurantTypeReducer } = restaurantTypeSlide;
export default restaurantTypeReducer;
