/* eslint-disable import/no-unresolved */
import mailReducer from 'redux/Slices/RestaurantManager/mailSlide';
import foodReducer from '../Slices/RestaurantManager/foodSlide';
import foodTypeReducer from '../Slices/RestaurantManager/foodTypeSlide';
import commentReducer from '../Slices/RestaurantManager/commentSlide';
import starReducer from '../Slices/RestaurantManager/starSlide';
import restaurantManagerAuthReducer from '../Slices/RestaurantManager/Auth/authSlide';
import restaurantTypeReducer from '../Slices/restaurantTypeSlide';
import billReducer from '../Slices/RestaurantManager/billSlide';

const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  restaurantManager_auth: restaurantManagerAuthReducer,

  'restaurantManager/food': foodReducer,
  'restaurantManager/foodType': foodTypeReducer,
  'restaurantManager/comment': commentReducer,
  'restaurantManager/star': starReducer,
  'restaurantManager/bill': billReducer,
  'restaurantManager/mail': mailReducer,
  restaurantType: restaurantTypeReducer,
};

const restaurantManagerStore = configureStore({
  reducer: rootReducer,
});

export default restaurantManagerStore;
