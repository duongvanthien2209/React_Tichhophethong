/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import {
  registerApi,
  loginApi,
  forgotPasswordApi,
  resetPasswordApi,
} from 'api/RestaurantManger/Auth/authApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const register = createAsyncThunk(
  'restaurantManager/register',
  async (params, thunkApi) => {
    const { status, error, data } = await registerApi(params);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      return data.message;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

export const login = createAsyncThunk(
  'restaurantManager/login',
  async (params, thunkApi) => {
    const { status, error, data } = await loginApi(params);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      return data.token;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

export const forgotPassword = createAsyncThunk(
  'restaurantManager/forgotPassword',
  async (params, thunkApi) => {
    const { status, error, data } = await forgotPasswordApi(params);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      return data.token;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

export const resetPassword = createAsyncThunk(
  'restaurantManager/resetPassword',
  async (params, thunkApi) => {
    const { status, error, data } = await resetPasswordApi(params);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      return data.token;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

const restaurantManagerAuth = createSlice({
  name: 'restaurantManager_auth',
  initialState: {
    token: localStorage.getItem('token'),
    isLogined: false,
    loading: false,
    resetToken: '',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state) => {
      state.loading = false;
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.rejected]: (state) => {
      state.loading = false;
    },
    [login.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.loading = false;
      state.token = action.payload;
      state.isLogined = true;
    },
    [forgotPassword.pending]: (state) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.resetToken = action.payload;
    },
    [resetPassword.pending]: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.loading = false;
      state.isLogined = true;
      state.token = action.payload;
    },
  },
});

const { reducer: restaurantManagerAuthReducer } = restaurantManagerAuth;
export default restaurantManagerAuthReducer;
