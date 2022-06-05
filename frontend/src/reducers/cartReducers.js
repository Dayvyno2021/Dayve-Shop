import { ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, REMOVE__FROM__CART } from "../constants/cartConstants";

const cartItemFromStorage = localStorage.getItem('cartItems') ? 
  JSON.parse(localStorage.getItem('cartItems')) : [];

export const cartReducer = (state={cartItems:cartItemFromStorage}, action) =>{
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {...state, loading: true}

    case ADD_TO_CART_SUCCESS:
      const item = action.payload;
      const existItem = state.cartItems.find((x)=>x.product===item.product);
      if (existItem){
        return {
          ...state, loading: false,
          cartItems: state.cartItems.map(x=>{
            return x.product===item.product? item : x
          })
        }
      } else {
        return {...state, loading: false, cartItems:[...state.cartItems, item]}
      }

    case REMOVE__FROM__CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(x=>x.product !== action.payload)
      }
  
    default:
      return state;
  }
}