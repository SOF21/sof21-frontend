import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

export const authUrl = env.REACT_APP_API_ENDPOINT + '/auth';
export const frontEndPath = env.REACT_APP_URL;
export const changePassRedirect = frontEndPath + '/account/reset_password/new';
export const stripePublicKey = env.REACT_APP_STRIPE_PUBLIC_KEY;

//export default Constants;

export const images = {
  festivalAbout: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/festival_about/festival1.jpg',
  cortegeAbout: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_about/cortege1.jpg',
  orchestraAbout: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/orchestra_about/orkester1.jpg',
  history: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Bilder/Guldbrallor.jpg',
}

export const info = {
  SOFYear: 21
}