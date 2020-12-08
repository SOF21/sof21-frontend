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

export const sendFunkisAppFailure = ({err}) => ({
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

export const SET_FUNKIS_TYPE = {
  BEGIN: `${funkisActionBase}UPDATE_FUNKIS_BEGIN`,
  FAILURE: `${funkisActionBase}UPDATE_FUNKIS_FAILURE`,
  SUCCESS: `${funkisActionBase}UPDATE_FUNKIS_SUCCESS`,
};

export const setFunkisTypeBegin = () => ({
  type: SET_FUNKIS_TYPE.BEGIN,
  payload: {}
});

export const setFunkisTypSuccess = () => ({
  type: SET_FUNKIS_TYPE.SUCCESS,
  payload: {}
});

export const setFunkisTypeFailure = ({err}) => ({
  type: SET_FUNKIS_TYPE.FAILURE,
  payload: err
});

export const updateFunkisType = ({ // TODO: UPDATE
  id,
  funkisType,
}) => {
  return async dispatch => {
    dispatch(SET_FUNKIS_TYPE.BEGIN)
    api.post('/funkis/update/update') 
      .then(() => {
        dispatch(setFunkisTypSuccess())
      })
      .catch((err) => dispatch(setFunkisTypeFailure(err)))
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
        console.log("ASDASD")
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

export const getFunkisarFailure = ({err}) => ({
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
    /*api.post('/funkis/update/update') // TODO: UPDATE
      .then((res) => res.json) 
      .then((json) => {
        dispatch(getFunkisarSuccess(json.funkisar))
      })
      .catch((err) => dispatch(setFunkisTypeFailure()))
  }*/
  await new Promise(r => setTimeout(r, 2000))
  dispatch(getFunkisarSuccess(testFunkisar))
}
}

export const UPDATE_FUNKIS = `${funkisActionBase}UPDATE_FUNKIS`;

export const updateFunkis = (funkis) => ({
  type: UPDATE_FUNKIS,
  payload: funkis
});