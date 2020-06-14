import {
  FETCH_ORDERS_BEGIN,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDER_ITEMS_BEGIN,
  FETCH_ORDER_ITEMS_FAILURE,
  FETCH_ORDER_ITEMS_SUCCESS,
  RESET_ORDERS,
  RESET_ITEMS
} from '../actions/orders';


const initialOrderState = {
  orders         : null,
  items          : null,
  loading_orders : false,
  loading_items  : false,
  orders_error   : null,
  items_error    : null
};

export default function orderReducer(state = {...initialOrderState}, action) {
  switch(action.type) {
    case FETCH_ORDERS_BEGIN:
      return {
        ...state,
        loading_orders : true,
        orders_error   : null
      };
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading_orders : false,
        orders_error   : action.payload.error
      }
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading_orders : false,
        orders : action.payload,
        orders_error   : null
      }
    case FETCH_ORDER_ITEMS_BEGIN:
      return {
        ...state,
        loading_items  : true
      }
    case FETCH_ORDER_ITEMS_FAILURE:
      return {
        ...state,
        loading_items  : false,
        items_error    : action.payload.error
      }
    case FETCH_ORDER_ITEMS_SUCCESS:
    return {
      ...state,
      loading_items    : false,
      items            : action.payload
    }
    case RESET_ORDERS:
      return {
        ...state,
        loading_orders : false,
        orders         : null,
        orders_error   : null
      }
    case RESET_ITEMS:
      return {
        ...state,
        loading_items  : false,
        items          : null,
        items_error    : null
      }
    default:
      return state;
  }
}
