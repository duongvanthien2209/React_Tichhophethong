const { createSlice } = require('@reduxjs/toolkit');

const foodSlide = createSlice({
  name: 'food',
  initialState: {
    foods: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {},
});

const { reducer: foodReducer } = foodSlide;
export default foodReducer;
