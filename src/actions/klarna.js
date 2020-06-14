export const SAVE_CREDIT_SESSION = "SAVE_CREDIT_SESSION";
export const RESET_CREDIT_SESSION = "RESET_CREDIT_SESSION";


export function saveCreditSession(token, payment_options) {
  return dispatch => {
    dispatch({
      type: SAVE_CREDIT_SESSION,
      payload : {token: token, payment_options:payment_options}
    });
    return Promise.resolve();
  }
};

export function resetCreditSession() {
  return { type: RESET_CREDIT_SESSION };
}
