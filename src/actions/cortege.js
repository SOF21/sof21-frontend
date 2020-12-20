import api from '../api/axiosInstance';
const cortegeActionBase = 'ACTION_CORTEGE_';


export const SEND_CORTEGE_APP = {
  BEGIN: `${cortegeActionBase}SEND_APPLICATION_BEGIN`,
  FAILURE: `${cortegeActionBase}SEND_APPLICATION_FAILURE`,
  SUCCESS: `${cortegeActionBase}SEND_APPLICATION_SUCCESS`,
};

export const sendCortegeAppBegin = () => ({
  type: SEND_CORTEGE_APP.BEGIN,
  payload: {}
});

export const sendCortegeAppSuccess = () => ({
  type: SEND_CORTEGE_APP.SUCCESS,
  payload: {}
});

export const sendCortegeAppFailure = (err) => ({
  type: SEND_CORTEGE_APP.FAILURE,
  payload: err
});

export const sendCortegeApplication = ({
  groupName,
  contactPerson,
  mail,
  phonenumber,
  buildType,
  contribMotivation,
  themeMotivation,
  amountPartaking,
  image,
  gdpr,
}) => { // TODO: UPDATE
  return async dispatch => {
    dispatch(sendCortegeAppBegin());
    return api.post('cortege', {
      item: {
        name: groupName,
        participant_count: amountPartaking,
        cortege_type: buildType,
        contact_phone: phonenumber,
        contact_name: contactPerson,
        idea: contribMotivation,
        theme_connection: themeMotivation,
        image_url: image,
        gdpr,
      }
    })
      .then(() => {
        dispatch(sendCortegeAppSuccess());
      })
      .catch(err => dispatch(sendCortegeAppFailure(err)));
    /*await new Promise(r => setTimeout(r, 2000))
    dispatch(sendFunkisAppSuccess())*/
  }
};