/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import {
  getAllApi,
  updateCTBillApi,
  updateStatusBillApi,
} from 'api/RestaurantManger/billApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getAll = createAsyncThunk('bill/getAll', async (params) => {
  const { status, error, data } = await getAllApi(params);

  // debugger;

  if (status === 'failed' && error) throw new Error(error.message);

  if (status === 'success' && data) {
    // const { restaurantTypes } = data;
    // return restaurantTypes;
    return data;
  }
  throw new Error('Có lỗi xảy ra');
});

export const updateCTBill = createAsyncThunk(
  'bill/updateCTBill',
  async ({ billId, ctBills }) => {
    // debugger;
    const { status, error, data } = await updateCTBillApi(billId, ctBills);

    // debugger;

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      // const { restaurantTypes } = data;
      // return restaurantTypes;
      return data;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

export const updateStatusBill = createAsyncThunk(
  'bill/updateStatusBill',
  async ({ billId, status }) => {
    // debugger;
    const { status: currentStatus, error, data } = await updateStatusBillApi(
      billId,
      status,
    );

    // debugger;

    if (currentStatus === 'failed' && error) throw new Error(error.message);

    if (currentStatus === 'success' && data) {
      // const { restaurantTypes } = data;
      // return restaurantTypes;
      return data;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

// export const deleteComment = createAsyncThunk(
//   'comment/delete',
//   async (params) => {
//     const { status, error, data } = await deleteApi(params);

//     if (status === 'failed' && error) throw new Error(error.message);

//     if (status === 'success' && data) {
//       // const { restaurantTypes } = data;
//       // return restaurantTypes;
//       return params;
//     }
//     throw new Error('Có lỗi xảy ra');
//   },
// );

const billSlide = createSlice({
  name: 'restaurantManager/bill',
  initialState: {
    bills: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.bills = action.payload.bills;
    },
    [updateCTBill.pending]: (state) => {
      state.loading = true;
    },
    [updateCTBill.fulfilled]: (state, action) => {
      // debugger;
      state.loading = false;

      let bill = state.bills.find(
        (item) => item._id === action.payload.bill._id,
      );
      bill = action.payload.bill;
    },
    [updateStatusBill.pending]: (state) => {
      state.loading = true;
    },
    [updateStatusBill.fulfilled]: (state, action) => {
      // debugger;
      state.loading = false;

      let bill = state.bills.find(
        (item) => item._id === action.payload.bill._id,
      );
      bill = action.payload.bill;
    },
    // [deleteComment.pending]: (state) => {
    //   state.loading = true;
    // },
    // [deleteComment.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.comments.filter((item) => item._id !== action.payload);
    // },
  },
});

const { reducer: billReducer } = billSlide;
export default billReducer;
