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
  otherAllergy,
  gdpr,
  liuCard
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
        allergies_other: otherAllergy,
        gdpr,
        liu_card: liuCard,
        first_post_id: funkisOne,
        second_post_id: funkisTwo,
        third_post_id: funkisThree,
        first_day: new Date(2021, firstPrefferedDate.split('/')[0], firstPrefferedDate.split('/')[1]),
        second_day: new Date(2021, secondPrefferedDate.split('/')[0], secondPrefferedDate.split('/')[1]),
        third_day: new Date(2021, thirdPrefferedDate.split('/')[0], thirdPrefferedDate.split('/')[1]),
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
  payload: {positions: data}
});

export const getFunkisTypesSuccess = (positions) => ({
  type: GET_FUNKIS_TYPES.SUCCESS,
  payload: {positions}
});

export const getFunkisTypesFailure = ({err}) => ({
  type: GET_FUNKIS_TYPES.FAILURE,
  payload: err
});


export const getFunkisTypes = () => {
  return async dispatch => {
    dispatch(getFunkisTypesBegin())
    api.get('funkis_category') // TODO: UPDATE
      .then((json) => dispatch(getFunkisTypesSuccess(json.data)))
      .catch((err) => dispatch(getFunkisTypesFailure(err)))
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
  payload: {timeslots}
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
  payload: {funkisar}
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
            allergyOther: cur.allergies_other,
            tshirtSize: cur.tshirt_size,
            markedAsDone: cur.marked_done,
            postAddress: cur.post_address,
            selectedFunkisAlt: cur.funkis_category_id,
            selectedTimeSlots: cur.timeslots? cur.timeslots.map(t => t.funkis_timeslot_id) : []
          }
        }), {});
        console.log(funkisarObject);
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
          console.log(appsObj);
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
    console.log(funkis);
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
    api.delete('funkis_bookings/', {
      item: {
        funkis_id: funkisId,
        funkis_timeslot_id: timeslotId
      }
    }) // TODO: UPDATE
      .then((json) => {
        dispatch(unbookFunkisSuccess())
      })
      .catch((err) => dispatch(unbookFunkisFailure(err)))
  }
};