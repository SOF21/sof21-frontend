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

export const sendFunkisApplication = () => { // TODO: UPDATE
  return async dispatch => {
    dispatch(sendFunkisAppBegin());
    /*return api.post('funkis/application')
      .then(() => {
        dispatch(sendFunkisAppSuccess());
      })
      .catch(err => dispatch(SEND_FUNKIS_APP.FAILURE(err)));*/
    await new Promise(r => setTimeout(r, 2000))
    dispatch(sendFunkisAppSuccess())
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

export const getFunkisarFailuren = ({err}) => ({
  type: GET_FUNKISAR.FAILURE,
  payload: err
});


const testFunkisar = [
  {
    name:'Test Testsson',
    liuid:'teste123',
    email: 'test123@student.liu.se',
    funkisAlts: [
      'Natt',
      'Funis1',
      'Troll',
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
    selectedFunkisAlt: 'Natt',
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
        day: '5/5',
      },
      3: {
        selected: true,
        day: '6/5',
      },
    },
    funkisAlts: [
      'Natt',
      'Funis1',
      'Troll',
    ],
    selectedFunkisAlt: 'Funis1',
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