import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './reducers/cartReducers';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { userLoginReducer, userProfileReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';


const store = configureStore ({
  reducer: {
    productListReducer: productListReducer,
    productDetailsReducer: productDetailsReducer,
    cartReducer: cartReducer,
    userRegisterReducer: userRegisterReducer,
    userLoginReducer: userLoginReducer,
    userProfileReducer: userProfileReducer,
    userUpdateReducer: userUpdateReducer
  },
})

export default store;