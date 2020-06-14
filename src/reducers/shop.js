import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  STRIPE_PURCHASE_BEGIN,
  STRIPE_PURCHASE_FAILURE,
  STRIPE_PURCHASE_SUCCESS,
  STRIPE_RESET
} from '../actions/shop';

const initialShopState = {
  products: null,
  base_products: null,
  loading: true,
  error: null,
  stripe_loading: false,
  stripe_complete: false,
  stripe_error : null
};

export default function shopReducer(state = { ...initialShopState }, action) {
  switch(action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_PRODUCTS_SUCCESS:
      var base_products = {}
      action.payload.forEach((base_prod, id) => {
        base_prod.products.forEach((prod, id2) => {
          base_products = {...base_products, [prod.id]: {base_id: id, prod_id: id2}}
        })
      });
      return {
        ...state,
        loading: false,
        products: action.payload,
        base_products: base_products
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        products: null
      };
    case STRIPE_PURCHASE_BEGIN:
      return {
        ...state,
        stripe_loading: true,
        stripe_complete:false
      };
    case STRIPE_PURCHASE_SUCCESS:
      return {
        ...state,
        stripe_loading: false,
        stripe_complete: true,
        error : null

      };
    case STRIPE_PURCHASE_FAILURE:
      return {
        ...state,
        stripe_loading: false,
        stripe_complete: false,
        error: action.payload.error
      }
    case STRIPE_RESET:
      return {
        ...state,
        stripe_loading: false,
        stripe_complete:false,
        error: null
      }
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
