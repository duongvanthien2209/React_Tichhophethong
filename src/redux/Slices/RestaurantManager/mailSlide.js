/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import {
  getAllApi,
  getAllNotReadApi,
  updateReadedApi,
} from 'api/RestaurantManger/mailApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getAll = createAsyncThunk('mail/getAll', async (params) => {
  const { status, error, data } = await getAllApi(params);

  if (status === 'failed' && error) throw new Error(error.message);

  if (status === 'success' && data) {
    // const { foodTypes } = data;
    // return foodTypes;
    return data;
  }
  throw new Error('Có lỗi xảy ra');
});

export const getAllNotRead = createAsyncThunk(
  'mail/getAllNotRead',
  async () => {
    const { status, error, data } = await getAllNotReadApi();

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      // const { foodTypes } = data;
      // return foodTypes;
      return data;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

export const updateReaded = createAsyncThunk(
  'mail/updateReaded',
  async (params) => {
    const { status, error, data } = await updateReadedApi(params);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      // const { foodTypes } = data;
      // return foodTypes;
      return data;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

const mailSlide = createSlice({
  name: 'restaurantManager/mail',
  initialState: {
    mails: [],
    mailsNotRead: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.mails = action.payload.mails;
    },
    [getAllNotRead.pending]: (state) => {
      state.loading = true;
    },
    [getAllNotRead.fulfilled]: (state, action) => {
      state.loading = false;
      state.mailsNotRead = action.payload.mails;
    },
    [updateReaded.pending]: (state) => {
      state.loading = true;
    },
    [updateReaded.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.mailsNotRead.findIndex(
        (item) => item._id === action.payload.mail,
      );
      state.mailsNotRead.splice(index, 1);
    },
  },
});

const { reducer: mailReducer } = mailSlide;
export default mailReducer;
