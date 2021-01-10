/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { getAllApi, findApi } from 'api/userApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getAll = createAsyncThunk('user/getAll', async (params) => {
  const { status, error, data } = await getAllApi(params);

  if (status === 'failed' && error) throw new Error(error.message);

  if (status === 'success' && data) {
    // const { restaurantTypes } = data;
    return data;
  }
  throw new Error('Có lỗi xảy ra');
});

export const find = createAsyncThunk('user/find', async (params) => {
  const { status, error, data } = await findApi(params.name, params.page);

  if (status === 'failed' && error) throw new Error(error.message);

  if (status === 'success' && data) {
    // const { restaurants } = data;
    return data;
  }
  throw new Error('Có lỗi xảy ra');
});

const userSlide = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.loading = true;
      state.users = action.payload.users;
    },
    [find.pending]: (state) => {
      state.loading = true;
    },
    [find.fulfilled]: (state, action) => {
      state.loading = true;
      state.users = action.payload.users;
    },
  },
});

const { reducer: userReducer } = userSlide;
export default userReducer;
