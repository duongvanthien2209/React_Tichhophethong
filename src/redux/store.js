// import adminAuthReducer from './Slices/Admin/Auth/authSlide';
import restaurantTypeReducer from './Slices/restaurantTypeSlide';
// import restaurantManagerAuthReducer from './Slices/RestaurantManager/Auth/authSlide';
// import restaurantReducer from './Slices/Admin/restaurantSlide';
// import userReducer from './Slices/Admin/userSlide';
// import foodReducer from './Slices/RestaurantManager/foodSlide';
// import foodTypeReducer from './Slices/RestaurantManager/foodTypeSlide';
// import commentReducer from './Slices/RestaurantManager/commentSlide';
// import starReducer from './Slices/RestaurantManager/starSlide';

// import adminFoodReducer from './Slices/Admin/foodSlide';
// import adminFoodTypeReducer from './Slices/Admin/foodTypeSlide';

const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  // admin_auth: adminAuthReducer,
  restaurantType: restaurantTypeReducer,
  // restaurantManager_auth: restaurantManagerAuthReducer,
  // restaurant: restaurantReducer,
  // user: userReducer,

  // 'restaurantManager/food': foodReducer,
  // 'restaurantManager/foodType': foodTypeReducer,
  // 'restaurantManager/comment': commentReducer,
  // 'restaurantManager/star': starReducer,

  // 'admin/food': adminFoodReducer,
  // 'admin/foodType': adminFoodTypeReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
