import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

export const authUrl = env.REACT_APP_API_ENDPOINT + '/auth';
export const frontEndPath = env.REACT_APP_URL;
export const changePassRedirect = frontEndPath + '/account/reset_password/new';
export const stripePublicKey = env.REACT_APP_STRIPE_PUBLIC_KEY;

//export default Constants;
