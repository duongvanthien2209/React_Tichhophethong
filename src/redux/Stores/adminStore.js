/* eslint-disable import/no-unresolved */
import adminAuthReducer from '../Slices/Admin/Auth/authSlide';
import restaurantReducer from '../Slices/Admin/restaurantSlide';
import userReducer from '../Slices/Admin/userSlide';
import adminFoodReducer from '../Slices/Admin/foodSlide';
import adminFoodTypeReducer from '../Slices/Admin/foodTypeSlide';

const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  restaurant: restaurantReducer,
  user: userReducer,
  'admin/food': adminFoodReducer,
  'admin/foodType': adminFoodTypeReducer,
  admin_auth: adminAuthReducer,
};

const adminStore = configureStore({
  reducer: rootReducer,
});

export default adminStore;
