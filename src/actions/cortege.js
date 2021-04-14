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
  contribMotivation,
  themeMotivation,
  amountPartaking,
  image,
  gdpr,
  reservPhonenumber,
  reservContactPerson,
  reservMail,
  invoiceAddress,
  material,
}) => {
  return async dispatch => {
    dispatch(sendCortegeAppBegin());
    return api.post('cortege', {
      item: {
        name: groupName,
        participant_count: amountPartaking,
        cortege_type: 0,
        contact_mail: mail,
        contact_phone: phonenumber,
        contact_name: contactPerson,
        idea: contribMotivation,
        theme_connection: themeMotivation,
        image_url: image,
        gdpr,
        secondary_phone: reservPhonenumber,
        secondary_name: reservContactPerson,
        secondary_mail: reservMail,
        invoice_address: invoiceAddress,
        material: material,
      }
    })
      .then(() => {
        dispatch(sendCortegeAppSuccess());
      })
      .catch(err => dispatch(sendCortegeAppFailure(err)));
  }
};

export const GET_CORTEGES = {
  BEGIN: `${cortegeActionBase}GET_CORTEGES_BEGIN`,
  FAILURE: `${cortegeActionBase}GET_CORTEGES_FAILURE`,
  SUCCESS: `${cortegeActionBase}GET_CORTEGES_SUCCESS`,
};

export const getCortegesBegin = () => ({
  type: GET_CORTEGES.BEGIN,
  payload: {}
});

export const getCortegesSuccess = (corteges) => ({
  type: GET_CORTEGES.SUCCESS,
  payload: corteges
});

export const getCortegesFailure = (err) => ({
  type: GET_CORTEGES.FAILURE,
  payload: err
});

export const getCorteges = () => {
  return async dispatch => {
    dispatch(getCortegesBegin());
    return api.get('cortege')
      .then((res) => {
        const c = res.data;
        const cFixed = c.reduce((obj, c) => ({
          ...obj,
          [c.id]: {
            id: c.id,
            groupName: c.name,
            amountPartaking: c.participant_count,
            phonenumber: c.contact_phone,
            mail: c.contact_mail,
            contactPerson: c.contact_name,
            contribMotivation: c.idea,
            themeMotivation: c.theme_connection,
            image: c.image_url,
            gdpr: c.gdpr,
            feedback: c.feedback,
            securityFeedback: c.security_feedback,
            otherComments: c.other_comments,
            approved: false || c.approved,
            electricity: false || c.electricity,
            infoMail: false || c.info_mail,
            flags: c.flags,
            reservPhonenumber: c.secondary_phone,
            reservContactPerson: c.secondary_name,
            reservMail: c.secondary_mail,
            invoiceAddress: c.invoice_address,
            material: c.material,
          }
        }), {})
        dispatch(getCortegesSuccess(cFixed));
      })
      .catch(err => dispatch(getCortegesFailure(err)));
  }
};


export const UPDATE_CORTEGE = {
  BEGIN: `${cortegeActionBase}UPDATE_CORTEGE_BEGIN`,
  FAILURE: `${cortegeActionBase}UPDATE_CORTEGE_FAILURE`,
  SUCCESS: `${cortegeActionBase}UPDATE_CORTEGE_SUCCESS`,
};

export const updateCortegeBegin = (cortege) => ({
  type: UPDATE_CORTEGE.BEGIN,
  payload: cortege
});

export const updateCortegeSuccess = () => ({
  type: UPDATE_CORTEGE.SUCCESS,
  payload: {}
});

export const updateCortegeFailure = (err) => ({
  type: UPDATE_CORTEGE.FAILURE,
  payload: err
});

export const updateCortege = ({
  id,
  approved,
  feedback,
  securityFeedback,
  otherComments,
  electricity,
  infoMail,
  flags,
}) => {
  return async dispatch => {
    dispatch(updateCortegeBegin({
      id,
      approved,
      feedback,
      securityFeedback,
      otherComments,
      electricity,
      infoMail,
      flags,
    }));
    return api.put(`cortege/${id}`, {
      item: {
        approved: approved,
        electricity: electricity,
        info_mail: infoMail,
        feedback: feedback,
        other_comments: otherComments,
        security_feedback: securityFeedback,
        flags,
      }
    })
      .then((res) => {
        dispatch(updateCortegeSuccess());
      })
      .catch(err => dispatch(updateCortegeFailure(err)));
  }
};


export const DELETE_CORTEGE = {
  BEGIN: `${cortegeActionBase}DELETE_CORTEGE_BEGIN`,
  FAILURE: `${cortegeActionBase}DELETE_CORTEGE_FAILURE`,
  SUCCESS: `${cortegeActionBase}DELETE_CORTEGE_SUCCESS`,
};

export const deleteCortegeBegin = (cortege) => ({
  type: DELETE_CORTEGE.BEGIN,
  payload: cortege
});

export const deleteCortegeSuccess = () => ({
  type: DELETE_CORTEGE.SUCCESS,
  payload: {}
});

export const deleteCortegeFailure = (err) => ({
  type: DELETE_CORTEGE.FAILURE,
  payload: err
});

export const deleteCortege = ({
  id,
}) => {
  return async dispatch => {
    dispatch(deleteCortegeBegin({
      id
    }));
    return api.delete(`cortege/${id}`)
      .then((res) => {
        dispatch(deleteCortegeSuccess());
      })
      .catch(err => dispatch(deleteCortegeFailure(err)));
  }
};

export const GET_CURRENT_CORTEGE = {
  BEGIN: `${cortegeActionBase}GET_CURRENT_CORTEGE_BEGIN`,
  FAILURE: `${cortegeActionBase}GET_CURRENT_CORTEGE_FAILURE`,
  SUCCESS: `${cortegeActionBase}GET_CURRENT_CORTEGE_SUCCESS`,
};

export const getCurrentCortegeAppBegin = (cortege) => ({
  type: GET_CURRENT_CORTEGE.BEGIN,
  payload: cortege
});

export const getCurrentCortegeAppSuccess = (cortegeId) => ({
  type: GET_CURRENT_CORTEGE.SUCCESS,
  payload: cortegeId
});

export const getCurrentCortegeAppFailure = (err) => ({
  type: GET_CURRENT_CORTEGE.FAILURE,
  payload: err
});

export const getCurrentCortegeApp = ({
  userId
}) => {
  return async dispatch => {
    dispatch(getCurrentCortegeAppBegin({
      userId
    }));
    return api.get(`users/get_user`)
      .then((res) => {
        const json = res.data;
        dispatch(getCurrentCortegeAppSuccess(
          json.cortege?.id
        ));
      })
      .catch(err => dispatch(getCurrentCortegeAppFailure(err)));
  }
};

