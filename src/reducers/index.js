import { combineReducers } from 'redux';
import locale from './locale';
import mobile from './mobile';
import orchestras from './orchestras';
import login from './login';
import title from './title';
import dialog from './dialog';
import klarna from './klarna';
import cortege from './cortege';
import funkis from './funkis'
import cart from './cart';
import shop from './shop';
import orders from './orders';

import { reduxTokenAuthReducer } from 'redux-token-auth'

export default combineReducers({
  locale,
  mobile,
  orchestras,
  login,
  reduxTokenAuth: reduxTokenAuthReducer,
  title,
  dialog,
  cart,
  shop,
  orders,
  cortege,
  funkis,
})
