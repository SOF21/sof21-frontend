import api from '../api/axiosInstance';

export const FETCH_ORDERS_BEGIN   = 'FETCH_ORDERS_BEGIN';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const RESET_ORDERS         = 'RESET_ORDERS';

export function fetchOrders(){
  return dispatch => {
    dispatch(fetchOrdersBegin());
    return api.get('/order', {timeout: 1000*15})
    .then(response => {
      dispatch(fetchOrdersSuccess(response.data));
      return response.data;
    })
    .catch(error => {
      dispatch(fetchOrdersFailure(error));
    })
  }
};

export const fetchOrdersBegin = () => ({
  type: FETCH_ORDERS_BEGIN
});

export const fetchOrdersFailure = error => ({
  type: FETCH_ORDERS_FAILURE,
  payload: { error }
});

export const fetchOrdersSuccess = response =>({
  type: FETCH_ORDERS_SUCCESS,
  payload: response
});

export const resetOrders = () => ({
  type: RESET_ORDERS
});

export const FETCH_ORDER_ITEMS_BEGIN    = 'FETCH_ORDER_ITEMS_BEGIN';
export const FETCH_ORDER_ITEMS_FAILURE  = 'FETCH_ORDER_ITEMS_FAILURE';
export const FETCH_ORDER_ITEMS_SUCCESS  = 'FETCH_ORDER_ITEMS_SUCCESS';
export const RESET_ITEMS                = "RESET_ITEMS";

export function fetchOrderItems(id){
  return dispatch => {
    dispatch(fetchOrderItemsBegin());
    return api.get('/order/' + id, { timeout: 1000*10 })
    .then(response => {
      dispatch(fetchOrderItemsSuccess(response.data));
      return response.data;
    })
    .catch(error => {
      dispatch(fetchOrderItemsFailure(error));
    })
  }
};
export const fetchOrderItemsBegin = () => ({
  type: FETCH_ORDER_ITEMS_BEGIN
});

export const fetchOrderItemsFailure = (error) => ({
  type: FETCH_ORDER_ITEMS_FAILURE,
  payload: { error }
});

export const fetchOrderItemsSuccess = (response) => ({
  type: FETCH_ORDER_ITEMS_SUCCESS,
  payload: response
});

export const resetItems = () => ({
  type: RESET_ORDERS
});
