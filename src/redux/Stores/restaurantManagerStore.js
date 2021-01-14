import foodReducer from '../Slices/RestaurantManager/foodSlide';
import foodTypeReducer from '../Slices/RestaurantManager/foodTypeSlide';
import commentReducer from '../Slices/RestaurantManager/commentSlide';
import starReducer from '../Slices/RestaurantManager/starSlide';
import restaurantManagerAuthReducer from '../Slices/RestaurantManager/Auth/authSlide';

const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  restaurantManager_auth: restaurantManagerAuthReducer,

  'restaurantManager/food': foodReducer,
  'restaurantManager/foodType': foodTypeReducer,
  'restaurantManager/comment': commentReducer,
  'restaurantManager/star': starReducer,
};

const restaurantManagerStore = configureStore({
  reducer: rootReducer,
});

export default restaurantManagerStore;
