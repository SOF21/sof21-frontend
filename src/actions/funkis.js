import api from '../api/axiosInstance';
const funkisActionBase = 'ACTION_FUNKIS_';


export const SEND_FUNKIS_APP = {
  BEGIN: `${funkisActionBase}SEND_APPLICATION_BEGIN`,
  FAILURE: `${funkisActionBase}SEND_APPLICATION_FAILURE`,
  SUCCESS: `${funkisActionBase}SEND_APPLICATION_SUCCESS`,
};

export const sendFunkisAppBegin = () => ({
  type: SEND_FUNKIS_APP.BEGIN,
  payload: {}
});

export const sendFunkisAppSuccess = () => ({
  type: SEND_FUNKIS_APP.SUCCESS,
  payload: {}
});

export const sendFunkisAppFailure = (err) => ({
  type: SEND_FUNKIS_APP.FAILURE,
  payload: err
});

export const sendFunkisApplication = ({
  name,
  liuid,
  mail,
  phonenumber,
  address,
  city,
  postcode,
  funkisOne,
  funkisTwo,
  funkisThree,
  firstPrefferedDate,
  secondPrefferedDate,
  thirdPrefferedDate,
  shirtSize,
  allergies,
  otherFoodPreference,
  gdpr,
  liuCard,
  userId,
  extraDesc,
  requestedPartner,
}) => { // TODO: UPDATE
  return async dispatch => {
    dispatch(sendFunkisAppBegin());
    return api.post('funkis', {
      item: {
        name,
        liu_id: liuid,
        mail,
        phone_number: phonenumber,
        post_address: `${address} ${postcode} ${city}`,
        tshirt_size: shirtSize,
        allergies,
        allergies_other: otherFoodPreference,
        gdpr,
        liu_card: liuCard,
        first_post_id: funkisOne,
        second_post_id: funkisTwo,
        third_post_id: funkisThree,
        first_day: new Date(2021, parseInt(firstPrefferedDate.split('/')[1]) - 1, firstPrefferedDate.split('/')[0], 12, 12),
        second_day: new Date(2021, parseInt(secondPrefferedDate.split('/')[1]) - 1, secondPrefferedDate.split('/')[0], 12, 12),
        third_day: new Date(2021, parseInt(thirdPrefferedDate.split('/')[1]) - 1, thirdPrefferedDate.split('/')[0], 12, 12),
        user_id: userId,
        share_info: extraDesc,
        partner_id: requestedPartner,
      }
    })
      .then(() => {
        dispatch(sendFunkisAppSuccess());
      })
      .catch(err => dispatch(sendFunkisAppFailure(err)));
    /*await new Promise(r => setTimeout(r, 2000))
    dispatch(sendFunkisAppSuccess())*/
  }
};

export const GET_FUNKIS_TYPES = {
  BEGIN: `${funkisActionBase}GET_FUNKIS_TYPES_BEGIN`,
  FAILURE: `${funkisActionBase}GET_FUNKIS_TYPES_FAILURE`,
  SUCCESS: `${funkisActionBase}GET_FUNKIS_TYPES_SUCCESS`,
};

export const getFunkisTypesBegin = (data) => ({
  type: GET_FUNKIS_TYPES.BEGIN,
  payload: { positions: data }
});

export const getFunkisTypesSuccess = (positions) => ({
  type: GET_FUNKIS_TYPES.SUCCESS,
  payload: { positions }
});

export const getFunkisTypesFailure = ({ err }) => ({
  type: GET_FUNKIS_TYPES.FAILURE,
  payload: err
});


export const getFunkisTypes = (type) => {
  return async dispatch => {
    dispatch(getFunkisTypesBegin())
    api.get('funkis_category') // TODO: UPDATE
      .then((json) => dispatch(getFunkisTypesSuccess(json.data)))
      .catch((err) => dispatch(getFunkisTypesFailure(err)))
  }
}

export const GET_FUNKIS_TYPE = {
  BEGIN: `${funkisActionBase}GET_FUNKIS_TYPE_BEGIN`,
  FAILURE: `${funkisActionBase}GET_FUNKIS_TYPE_FAILURE`,
  SUCCESS: `${funkisActionBase}GET_FUNKIS_TYPE_SUCCESS`,
};

export const getFunkisTypeBegin = (data) => ({
  type: GET_FUNKIS_TYPE.BEGIN,
  payload: { positions: data }
});

export const getFunkisTypeSuccess = (positions) => ({
  type: GET_FUNKIS_TYPE.SUCCESS,
  payload: { positions }
});

export const getFunkisTypeFailure = ({ err }) => ({
  type: GET_FUNKIS_TYPE.FAILURE,
  payload: err
});


export const getFunkisType = (id) => {
  return async dispatch => {
    dispatch(getFunkisTypeBegin())
    api.get('funkis_category/' + id)
      .then((json) => dispatch(getFunkisTypeSuccess(json.data)))
      .catch((err) => dispatch(getFunkisTypeFailure(err)))
  }
}

export const ADD_FUNKIS_TYPE = {
  BEGIN: `${funkisActionBase}ADD_FUNKIS_TYPE_BEGIN`,
  FAILURE: `${funkisActionBase}ADD_FUNKIS_TYPE_FAILURE`,
  SUCCESS: `${funkisActionBase}ADD_FUNKIS_TYPE_SUCCESS`,
};

export const addFunkisTypeBegin = (data) => ({
  type: ADD_FUNKIS_TYPE.BEGIN,
  payload: { funkisType: data }
});

export const addFunkisTypeSuccess = (funkisType) => ({
  type: ADD_FUNKIS_TYPE.SUCCESS,
  payload: { funkisType }
});

export const addFunkisTypeFailure = ({ err }) => ({
  type: ADD_FUNKIS_TYPE.FAILURE,
  payload: err
});


export const addFunkisType = ({
  name,
  amount
}) => {
  return async dispatch => {
    dispatch(addFunkisTypeBegin())
    api.post('funkis_category/', {
      item: {
        title: name,
        amount_needed: amount,
      }
    })
      .then((json) => dispatch(addFunkisTypeSuccess(json.data)))
      .catch((err) => dispatch(addFunkisTypeFailure(err)))
  }
}

export const DELETE_FUNKIS_TYPE = {
  BEGIN: `${funkisActionBase}DELETE_FUNKIS_TYPE_BEGIN`,
  FAILURE: `${funkisActionBase}DELETE_FUNKIS_TYPE_FAILURE`,
  SUCCESS: `${funkisActionBase}DELETE_FUNKIS_TYPE_SUCCESS`,
};

export const deleteFunkisTypeBegin = (data) => ({
  type: DELETE_FUNKIS_TYPE.BEGIN,
  payload: data
});

export const deleteFunkisTypeSuccess = (funkisType) => ({
  type: DELETE_FUNKIS_TYPE.SUCCESS,
  payload: {}
});

export const deleteFunkisTypeFailure = ({ err }) => ({
  type: DELETE_FUNKIS_TYPE.FAILURE,
  payload: err
});


export const deleteFunkisType = ({
  id
}) => {
  return async dispatch => {
    dispatch(deleteFunkisTypeBegin({ id }))
    api.delete('funkis_category/' + id)
      .then(() => dispatch(deleteFunkisTypeSuccess()))
      .catch((err) => dispatch(deleteFunkisTypeFailure(err)))
  }
}

export const UPDATE_FUNKIS_TYPE = {
  BEGIN: `${funkisActionBase}UPDATE_FUNKIS_TYPE_BEGIN`,
  FAILURE: `${funkisActionBase}UPDATE_FUNKIS_TYPE_FAILURE`,
  SUCCESS: `${funkisActionBase}UPDATE_FUNKIS_TYPE_SUCCESS`,
};

export const updateFunkisTypeBegin = (funkisType) => ({
  type: UPDATE_FUNKIS_TYPE.BEGIN,
  payload: funkisType
});

export const updateFunkisTypeSuccess = () => ({
  type: UPDATE_FUNKIS_TYPE.SUCCESS,
  payload: {}
});

export const updateFunkisTypeFailure = ({ err }) => ({
  type: UPDATE_FUNKIS_TYPE.FAILURE,
  payload: err
});


export const updateFunkisType = (funkis) => {
  return async dispatch => {
    dispatch(updateFunkisTypeBegin(funkis))
    api.put('funkis_category/' + funkis.id, {
      item: {
        title: funkis.name,
        amount_needed: funkis.amount,
      }
    })
      .then(() => dispatch(updateFunkisTypeSuccess()))
      .catch((err) => dispatch(updateFunkisTypeFailure(err)))
  }
}

export const GET_FUNKIS_TIME_SLOTS = {
  BEGIN: `${funkisActionBase}GET_FUNKIS_TIME_SLOTS_BEGIN`,
  FAILURE: `${funkisActionBase}GET_FUNKIS_TIME_SLOTS_FAILURE`,
  SUCCESS: `${funkisActionBase}GET_FUNKIS_TIME_SLOTS_SUCCESS`,
};

export const getFunkisTimeSlotsBegin = () => ({
  type: GET_FUNKIS_TIME_SLOTS.BEGIN,
  payload: {}
});

export const getFunkisTimeSlotsSuccess = (timeslots) => ({
  type: GET_FUNKIS_TIME_SLOTS.SUCCESS,
  payload: { timeslots }
});

export const getFunkisTimeSlotsFailure = (err) => ({
  type: GET_FUNKIS_TIME_SLOTS.FAILURE,
  payload: err
});

export const getFunkisTimeSlots = () => {
  return async dispatch => {
    dispatch(getFunkisTimeSlotsBegin())
    api.get('funkis_timeslots') // TODO: UPDATE
      .then((json) => {
        dispatch(getFunkisTimeSlotsSuccess(json.data))
      })
      .catch((err) => dispatch(getFunkisTimeSlotsFailure(err)))
  }
}


export const ADD_FUNKIS_TIME_SLOT = {
  BEGIN: `${funkisActionBase}ADD_FUNKIS_TIME_SLOT_BEGIN`,
  FAILURE: `${funkisActionBase}ADD_FUNKIS_TIME_SLOT_FAILURE`,
  SUCCESS: `${funkisActionBase}ADD_FUNKIS_TIME_SLOT_SUCCESS`,
};

export const addFunkisTimeSlotBegin = (timeSlot) => ({
  type: ADD_FUNKIS_TIME_SLOT.BEGIN,
  payload: { timeSlot }
});

export const addFunkisTimeSlotSuccess = (timeSlot) => ({
  type: ADD_FUNKIS_TIME_SLOT.SUCCESS,
  payload: { timeSlot }
});

export const addFunkisTimeSlotFailure = (err) => ({
  type: ADD_FUNKIS_TIME_SLOT.FAILURE,
  payload: err
});

export const addFunkisTimeSlot = (timeSlot) => {
  return async dispatch => {
    dispatch(addFunkisTimeSlotBegin())
    api.post('funkis_timeslots/', {
      item: {
        start_time: timeSlot.start,
        end_time: timeSlot.end,
        funkis_category_id: timeSlot.funkisTypeId
      }
    })
      .then((json) => dispatch(addFunkisTimeSlotSuccess(json.data)))
      .catch((err) => dispatch(addFunkisTimeSlotFailure(err)))
  }
}


export const GET_FUNKISAR = {
  BEGIN: `${funkisActionBase}GET_FUNKISAR_BEGIN`,
  FAILURE: `${funkisActionBase}GET_FUNKISAR_FAILURE`,
  SUCCESS: `${funkisActionBase}GET_FUNKISAR_SUCCESS`,
};

export const getFunkisarBegin = () => ({
  type: GET_FUNKISAR.BEGIN,
  payload: {}
});

export const getFunkisarSuccess = (funkisar) => ({
  type: GET_FUNKISAR.SUCCESS,
  payload: { funkisar }
});

export const getFunkisarFailure = (err) => ({
  type: GET_FUNKISAR.FAILURE,
  payload: err
});



export const getFunkisar = () => {
  return async dispatch => {
    dispatch(getFunkisarBegin())
    api.get('funkis')
      .then((funkisJson) => {
        const funkisar = funkisJson.data;
        const funkisarObject = funkisar.reduce((obj, cur) => ({
          ...obj,
          [cur.id]: {
            id: cur.id,
            name: cur.name,
            liuid: cur.liu_id,
            email: cur.mail,
            phonenumber: cur.phone_number,
            allergy: cur.allergies,
            otherFoodPreference: cur.allergies_other,
            tshirtSize: cur.tshirt_size,
            markedAsDone: cur.marked_done,
            checkedIn: cur.checked_in,
            postAddress: cur.post_address,
            selectedFunkisAlt: cur.funkis_category_id,
            selectedTimeSlots: cur.timeslots ? cur.timeslots.map(t => t.funkis_timeslot_id) : [],
            extraDesc: cur.share_info,
            requestedPartner: cur.partner_id,
          }
        }), {});
        api.get('funkis_applications')
          .then(appJson => {
            const apps = appJson.data;
            const appsObj = apps.reduce((obj, cur) => ({
              ...obj,
              [cur.funkis_id]: {
                ...obj[cur.funkis_id],
                funkisAlts: [
                  cur.first_post_id,
                  cur.second_post_id,
                  cur.third_post_id
                ],
                preferedDates: [
                  cur.first_day,
                  cur.second_day,
                  cur.third_day,
                ],
              }
            }), funkisarObject);
            dispatch(getFunkisarSuccess(appsObj))
          }).catch((err) => dispatch(getFunkisarFailure(err)))
      })
      .catch((err) => dispatch(getFunkisarFailure(err)))
  }
}

export const UPDATE_FUNKIS = {
  BEGIN: `${funkisActionBase}UPDATE_FUNKIS_BEGIN`,
  SUCCESS: `${funkisActionBase}UPDATE_FUNKIS_SUCCESS`,
  FAILURE: `${funkisActionBase}UPDATE_FUNKIS_FAILURE`,
}

export const updateFunkisBegin = (funkis) => ({
  type: UPDATE_FUNKIS.BEGIN,
  payload: funkis
});

export const updateFunkisSuccess = () => ({
  type: UPDATE_FUNKIS.SUCCESS,
  payload: {}
});

export const updateFunkisFailure = (err) => ({
  type: UPDATE_FUNKIS.FAILURE,
  payload: err
});

export const updateFunkis = (funkis) => {

  return async dispatch => {
    dispatch(updateFunkisBegin(funkis))
    dispatch(setFunkisData(funkis))
    api.put(`funkis/${funkis.id}`, {
      item: {
        funkis_category_id: funkis.selectedFunkisAlt,
        marked_done: funkis.markedAsDone
      }
    }) // TODO: UPDATE
      .then((json) => {
        dispatch(updateFunkisSuccess())
      })
      .catch((err) => dispatch(updateFunkisFailure(err)))
  }
};

export const CHECK_IN_FUNKIS = {
  BEGIN: `${funkisActionBase}CHECK_IN_FUNKIS_BEGIN`,
  SUCCESS: `${funkisActionBase}CHECK_IN_FUNKIS_SUCCESS`,
  FAILURE: `${funkisActionBase}CHECK_IN_FUNKIS_FAILURE`,
}

export const checkInFunkisBegin = (code) => ({
  type: CHECK_IN_FUNKIS.BEGIN,
  payload: code
});

export const checkInFunkisSuccess = (funkis) => ({
  type: CHECK_IN_FUNKIS.SUCCESS,
  payload: funkis.data
});

export const checkInFunkisFailure = (err) => ({
  type: CHECK_IN_FUNKIS.FAILURE,
  payload: err
});


export const checkInFunkis = (liuCardOrLiuID, code) => {

  return async dispatch => {
    dispatch(checkInFunkisBegin())
    api.put(`/funkis/check_in/${liuCardOrLiuID}/${code}`)
      .then((json) => {
        dispatch(checkInFunkisSuccess(json))
      })
      .catch((err) => dispatch(checkInFunkisFailure(err)))
  }
};

export const SET_FUNKIS_DATA = `${funkisActionBase}SET_FUNKIS_DATA`;

const setFunkisData = (funkis) => ({
  type: SET_FUNKIS_DATA,
  payload: funkis,
})


export const BOOK_FUNKIS = {
  BEGIN: `${funkisActionBase}BOOK_FUNKIS_BEGIN`,
  SUCCESS: `${funkisActionBase}BOOK_FUNKIS_SUCCESS`,
  FAILURE: `${funkisActionBase}BOOK_FUNKIS_FAILURE`,
}

export const bookFunkisBegin = (funkis) => ({
  type: BOOK_FUNKIS.BEGIN,
  payload: funkis
});

export const bookFunkisSuccess = () => ({
  type: BOOK_FUNKIS.SUCCESS,
  payload: {}
});

export const bookFunkisFailure = (err) => ({
  type: BOOK_FUNKIS.FAILURE,
  payload: err
});

export const bookFunkis = ({
  funkisId,
  timeslotId,
}) => {

  return async dispatch => {
    dispatch(bookFunkisBegin())
    api.post('funkis_bookings', {
      item: {
        funkis_id: funkisId,
        funkis_timeslot_id: timeslotId
      }
    }) // TODO: UPDATE
      .then((json) => {
        dispatch(bookFunkisSuccess())
      })
      .catch((err) => dispatch(bookFunkisFailure(err)))
  }
};



export const UNBOOK_FUNKIS = {
  BEGIN: `${funkisActionBase}UNBOOK_FUNKIS_BEGIN`,
  SUCCESS: `${funkisActionBase}UNBOOK_FUNKIS_SUCCESS`,
  FAILURE: `${funkisActionBase}UNBOOK_FUNKIS_FAILURE`,
}

export const unbookFunkisBegin = (funkis) => ({
  type: UNBOOK_FUNKIS.BEGIN,
  payload: funkis
});

export const unbookFunkisSuccess = () => ({
  type: UNBOOK_FUNKIS.SUCCESS,
  payload: {}
});

export const unbookFunkisFailure = (err) => ({
  type: UNBOOK_FUNKIS.FAILURE,
  payload: err
});

export const unbookFunkis = ({
  funkisId,
  timeslotId,
}) => {

  return async dispatch => {
    dispatch(unbookFunkisBegin())
    api.delete(`funkis_bookings/destroy_by_ids/${funkisId}/${timeslotId}`) // TODO: UPDATE
      .then((json) => {
        dispatch(unbookFunkisSuccess())
      })
      .catch((err) => dispatch(unbookFunkisFailure(err)))
  }
};


export const GET_FUNKIS_APP_STATUS = {
  BEGIN: `${funkisActionBase}GET_FUNKIS_APP_STATUS_BEGIN`,
  FAILURE: `${funkisActionBase}GET_FUNKIS_APP_STATUS_FAILURE`,
  SUCCESS: `${funkisActionBase}GET_FUNKIS_APP_STATUS_SUCCESS`,
};

export const getFunkisAppStatusBegin = () => ({
  type: GET_FUNKIS_APP_STATUS.BEGIN,
  payload: {}
});

export const getFunkisAppStatusSuccess = (hasApp) => ({
  type: GET_FUNKIS_APP_STATUS.SUCCESS,
  payload: hasApp
});

export const getFunkisAppStatusFailure = (err) => ({
  type: GET_FUNKIS_APP_STATUS.FAILURE,
  payload: err
});

export const getFunkisAppStatus = () => {
  return async dispatch => {
    dispatch(getFunkisAppStatusBegin());
    return api.get(`users/get_user`)
      .then((res) => {
        const json = res.data;
        dispatch(getFunkisAppStatusSuccess({
          hasApp: 'funkis_application' in json,
          userId: json.id,
        }));
      })
      .catch(err => dispatch(getFunkisAppStatusFailure(err)));
  }
};