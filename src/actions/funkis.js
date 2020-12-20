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
        first_day: firstPrefferedDate,
        second_day: secondPrefferedDate,
        third_day: thirdPrefferedDate,
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


const testFunkisar = [
  {
    name:'Test Testsson',
    liuid:'teste123',
    email: 'test123@student.liu.se',
    funkisAlts: [
      '1',
      '2',
    ],
    funkisDays: {
      1: {
        selected: false,
        day: '4/5',
      },
      2: {
        selected: true,
        day: '5/5',
      },
      3: {
        selected: false,
        day: '6/5',
      },
    },
    selectedFunkisAlt: '',
    markedAsDone: false,
    selectedTimeSlots: [],
  },
  {
    name:'Test Testsson2',
    liuid:'teste666',
    email: 'teste666@student.liu.se',
    funkisDays: {
      1: {
        selected: false,
        day: '4/5',
      },
      2: {
        selected: false,
        day: '15/4',
      },
      3: {
        selected: true,
        day: '14/4',
      },
    },
    funkisAlts: [
      '1',
      '2',  
    ],
    selectedFunkisAlt: '1',
    markedAsDone: true,
    selectedTimeSlots: [1],
  }
]

export const getFunkisar = () => {
  return async dispatch => {
    dispatch(getFunkisarBegin())
    api.get('funkis')
      .then((funkisJson) => {
        const funkisar = funkisJson.data;
        api.get('funkis_applications')
        .then(appJson => {
          const apps = appJson.data;
          const mergedFunkisar = funkisar.map(f => ({
            ...f,
            ...apps.reduce((acc, v) => v.funkis_id === f.id? {...v}:{}, {})
          })).map(mf => ({
            id: mf.id,
            name: mf.name,
            liuid: mf.liu_id,
            email: mf.mail,
            phonenumber: mf.phone_number,
            allergy: mf.allergies,
            allergyOther: mf.allergies_other,
            tshirtSize: mf.tshirt_size,
            markedAsDone: mf.marked_done,
            postAddress: mf.post_address,
            workfriend: mf.workfriend,
            selectedFunkisAlt: mf.funkis_category_id,
            funkisAlts: [
              mf.first_post_id,
              mf.second_post_id,
              mf.third_post_id
            ],
            preferedDates: [
              mf.first_day,
              mf.second_day,
              mf.third_day,
            ],
            selectedTimeSlots: [],
          }))
          dispatch(getFunkisarSuccess(mergedFunkisar))
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
    console.log("API TEST")
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