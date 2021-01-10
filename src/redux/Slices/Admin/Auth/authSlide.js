/* eslint-disable no-debugger */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {
  loginApi,
  forgotPasswordApi,
  resetPasswordApi,
} from 'api/Admin/Auth/authApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const login = createAsyncThunk(
  'admin/login',
  async (params, thunkApi) => {
    // thunkApi.dispatch(...action) - dispatch 1 action khac
    // debugger;
    const { status, error, data } = await loginApi(params);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      const { token } = data;
      return token;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

export const forgotPassword = createAsyncThunk(
  'admin/forgotPassword',
  async (params, thunkApi) => {
    const { status, error, data } = await forgotPasswordApi(params);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      const { token, message } = data;
      return token;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

export const resetPassword = createAsyncThunk(
  'admin/resetPassword',
  async (params, thunkApi) => {
    // console.log(params);
    // debugger;
    const { status, error, data } = await resetPasswordApi(params);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      const { token } = data;
      return token;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

const adminAuth = createSlice({
  name: 'admin_auth',
  initialState: {
    token: localStorage.getItem('token'),
    isLogined: false,
    loading: false,
    resetToken: '',
    error: null,
  },
  reducers: {},
  extraReducers: {
    // Login
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [login.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.loading = false;
      state.isLogined = true;
      state.token = action.payload;
    },

    // Forgot Password
    [forgotPassword.pending]: (state) => {
      state.loading = true;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.resetToken = action.payload;
    },

    // Reset Password
    [resetPassword.pending]: (state) => {
      state.loading = true;
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [resetPassword.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.loading = false;
      state.resetToken = '';
      state.token = action.payload;
      state.isLogined = true;
    },
  },
});

const { reducer: adminAuthReducer } = adminAuth;
export default adminAuthReducer;
