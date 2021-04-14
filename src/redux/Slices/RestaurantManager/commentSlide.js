/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { getAllApi, deleteApi } from 'api/RestaurantManger/commentApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getAll = createAsyncThunk('comment/getAll', async (params) => {
  const { status, error, data } = await getAllApi(params);

  if (status === 'failed' && error) throw new Error(error.message);

  if (status === 'success' && data) {
    // const { restaurantTypes } = data;
    // return restaurantTypes;
    return data;
  }
  throw new Error('Có lỗi xảy ra');
});

export const deleteComment = createAsyncThunk(
  'comment/delete',
  async (params) => {
    const { status, error, data } = await deleteApi(params);

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && data) {
      // const { restaurantTypes } = data;
      // return restaurantTypes;
      return params;
    }
    throw new Error('Có lỗi xảy ra');
  },
);

const commentSlide = createSlice({
  name: 'restaurantManager/comment',
  initialState: {
    comments: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.loading = true;
      state.comments = action.payload.comments;
    },
    [deleteComment.pending]: (state) => {
      state.loading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.comments.findIndex(
        (comment) => comment._id !== action.payload,
      );
      state.comments.splice(index, 1);
    },
  },
});

const { reducer: commentReducer } = commentSlide;
export default commentReducer;
