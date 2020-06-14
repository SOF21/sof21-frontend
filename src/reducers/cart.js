import {
  FETCH_CART_BEGIN,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  FETCH_CART_FROM_LOCALSTORAGE,
  ADD_PRODUCT_BEGIN,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_NO_LOGIN,
  REMOVE_PRODUCT_BEGIN,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAILURE,
  REMOVE_PRODUCT_NO_LOGIN,
  PUSH_CART_BEGIN,
  PUSH_CART_SUCCESS,
  PUSH_CART_FAILURE,
  RESET_CART
} from '../actions/cart'

const initialCartState = {
  cart: {},
  loading: true,
  item_loading: false,
  error: null,
};

export default function cartReducer(state = {...initialCartState }, action) {
  var prodID;
  var error;
  var amt;
  var cartState = {};
  switch (action.type) {
    case FETCH_CART_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_CART_SUCCESS:
      action.payload.data.cart_items.forEach(item =>{
        cartState = {...cartState, [item.product_id]: item.amount};
      })
      localStorage.setItem('cart', JSON.stringify(cartState));
      return {
        ...state,
        loading: false,
        cart: cartState
      };
    case FETCH_CART_FAILURE:
      return {...state,
        loading: false,
        error: action.payload.error,
      };
    case FETCH_CART_FROM_LOCALSTORAGE:
      var cart = JSON.parse(localStorage.getItem('cart'));
      if(!cart){
        cart = {};
        localStorage.setItem('cart', JSON.stringify({}));
      }
      return {...state,
        loading: false,
        cart: cart
      };

    case ADD_PRODUCT_BEGIN:
      prodID = action.payload;
      // Add item on begin, if query fail, we remove it again (to update values immediately)
      if (state.cart[prodID] !== null && state.cart[prodID] !== undefined){
        amt = state.cart[prodID] + 1;
      } else{
        amt = 1;
      }
      cartState = {...state.cart, [prodID]: amt}
      localStorage.setItem('cart', JSON.stringify(cartState));
      return {
        ...state,
        cart: cartState
      }
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        item_loading: false
      }
    case ADD_PRODUCT_FAILURE:
      error = action.payload[0];
      prodID = action.payload[1];
      amt = state.cart[prodID] - 1;
      cartState = {...state.cart, [prodID]: amt};
      if (amt <= 0){ //remove item if value is 0 or below
        let {[prodID]: deleted, ...c} = state.cart;
        cartState = c;
      }
      localStorage.setItem('cart', JSON.stringify(cartState));
      return {
        ...state,
        item_loading: false,
        error: {error},
        cart: cartState
      }
    case ADD_PRODUCT_NO_LOGIN:
      return {
        ...state,
        item_loading: false,
      }

    case REMOVE_PRODUCT_BEGIN:
      prodID = action.payload;
      amt = state.cart[prodID] - 1;
      cartState = {...state.cart, [prodID]: amt};
      if (amt <= 0){ //remove item if value is 0 or below
        let {[prodID]: deleted, ...c} = state.cart;
        cartState = c;
      }
      localStorage.setItem('cart', JSON.stringify(cartState));
      return {
        ...state,
        cart: cartState
      }
    case REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        item_loading: false
      }
    case REMOVE_PRODUCT_FAILURE:
      error = action.payload[0];
      prodID = action.payload[1];
      if (state.cart[prodID] !== null && state.cart[prodID] !== undefined){
        amt = state.cart[prodID] + 1;
      } else{
        amt = 1;
      }
      cartState = {...state.cart, [prodID]: amt};
      localStorage.setItem('cart', JSON.stringify(cartState));
      return {
        ...state,
        item_loading: false,
        error: {error},
        cart: cartState
      }
    case REMOVE_PRODUCT_NO_LOGIN:
      return {
        ...state,
        item_loading: false,
      }

    case PUSH_CART_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case PUSH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case PUSH_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    case RESET_CART:
      localStorage.setItem("cart", JSON.stringify({}));
      return {
        ...state,
        cart : {},
        error : null
      }
    default:
      return state;
  }
}
