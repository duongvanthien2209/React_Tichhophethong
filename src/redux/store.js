import adminAuthReducer from './Slices/Admin/Auth/authSlide';
import restaurantTypeReducer from './Slices/restaurantTypeSlide';
import restaurantManagerAuthReducer from './Slices/RestaurantManager/Auth/authSlide';
import restaurantReducer from './Slices/Admin/restaurantSlide';
import userReducer from './Slices/userSlide';

const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  admin_auth: adminAuthReducer,
  restaurantType: restaurantTypeReducer,
  restaurantManager_auth: restaurantManagerAuthReducer,
  restaurant: restaurantReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
