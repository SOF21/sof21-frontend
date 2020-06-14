import { SAVE_CREDIT_SESSION, RESET_CREDIT_SESSION } from '../actions/klarna';


const initialState = {
  client_token: null,
  payment_options: null,
  updated_at: null
}

const klarna = (state = initialState, action) => {
  switch(action.type) {
    case SAVE_CREDIT_SESSION:
      return {...state, client_token: action.payload.token,
         payment_options: action.payload.payment_options,
         updated_at: new Date()};
    case RESET_CREDIT_SESSION:
      return {...state, initialState};
    default:
      return state;
  }
};

export default klarna;
