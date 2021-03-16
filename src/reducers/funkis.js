import {
  SEND_FUNKIS_APP,
  SET_FUNKIS_TYPE,
  GET_FUNKISAR,
  UPDATE_FUNKIS,
  GET_FUNKIS_TYPES,
  GET_FUNKIS_TIME_SLOTS,
  SET_FUNKIS_DATA,
  GET_FUNKIS_APP_STATUS,
  CHECK_IN_FUNKIS,
  GET_FUNKIS_TYPE,
  ADD_FUNKIS_TYPE,
} from '../actions/funkis'

const initialState = {
  loading: true,
  success: false,
  checkedInFunkis: {},
  error: {},
  positionTitles: {},
  currentFunkisType: {},
  positions: {},
  funkisar: {},
  timeslots: {},
  idTimeslots: {},
  userId: {},
}

const funkisReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_FUNKIS_APP.BEGIN: {
      return {
        ...state,
        success: false,
        loading: true,
      }
    }
    case SEND_FUNKIS_APP.SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false,
      }
    }
    case SEND_FUNKIS_APP.FAILURE: {
      const error = action.payload;
      return {
        ...state,
        success: false,
        loading: false,
        error,
      }
    }
    case GET_FUNKISAR.BEGIN:
      return {
        ...state,
        loading: true,
      }
    case GET_FUNKISAR.SUCCESS: {
      const { payload: { funkisar } } = action;
      return {
        ...state,
        loading: false,
        funkisar: funkisar,
      }
    }
    case SET_FUNKIS_DATA: {
      const funkis = action.payload;
      return {
        ...state,
        funkisar: {
          ...state.funkisar,
          [funkis.id]: {
            ...state.funkisar[funkis.id],
            ...funkis,
          }
        }
      }
    }
    case UPDATE_FUNKIS.BEGIN: {
      return {
        ...state,
        loading: true,
      }
    }
    case UPDATE_FUNKIS.SUCCESS: {
      return {
        ...state,
        loading: false,
      }
    }
    case UPDATE_FUNKIS.FAILURE: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        error
      }
    }
    case GET_FUNKIS_TYPES.BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_FUNKIS_TYPES.SUCCESS:
      const { positions } = action.payload;
      const titles = positions.reduce((obj, curr) => ({
        ...obj,
        [curr.id]: curr.title
      }), {})
      const newPost = positions.reduce((obj, curr) => {
        return {
          ...obj,
          [curr.id]: {
            id: curr.id,
            title: curr.title,
            needed: curr.amount_needed,
            current: curr.amount_count
          }

        }
      }, {})
      return {
        ...state,
        positionTitles: titles,
        positions: newPost,
        loading: false,
      }
    case GET_FUNKIS_TYPES.FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      }
    }
    case GET_FUNKIS_TYPE.BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_FUNKIS_TYPE.SUCCESS: {
      const { positions } = action.payload
      return {
        ...state,
        currentFunkisType: {
          id: positions.id,
          title: positions.title,
          needed: positions.amount_needed,
          current: positions.amount_count
        },
        loading: false,
      }
    }
    case GET_FUNKIS_TYPE.FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      }
    }
    case ADD_FUNKIS_TYPE.BEGIN:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      }
    case ADD_FUNKIS_TYPE.SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      }
    case ADD_FUNKIS_TYPE.FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      }
    case GET_FUNKIS_TIME_SLOTS.BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_FUNKIS_TIME_SLOTS.SUCCESS:
      const { timeslots } = action.payload;
      const options = { day: 'numeric', month: 'numeric' };
      const newSlots = timeslots.reduce((obj, curr) => {
        return {
          ...obj,
          [curr.funkis_category_id]: {
            ...obj[curr.funkis_category_id],
            [new Date(curr.start_time).toLocaleDateString(options)]: {
              ...({} || obj[curr.funkis_category_id][new Date(curr.start_time).toLocaleDateString(options)]),
              [curr.id]: {
                start: new Date(curr.start_time),
                end: new Date(curr.end_time),
                id: curr.id
              }
            }
          }
        }
      }, {})
      return {
        ...state,
        timeslots: newSlots,
        idTimeslots: timeslots.reduce((obj, cur) => ({
          ...obj,
          [cur.id]: {
            ...cur,
            start_time: new Date(cur.start_time),
            end_time: new Date(cur.end_time),
          }
        }), {}),
        loading: false,
      }
    case GET_FUNKIS_TIME_SLOTS.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }

    case GET_FUNKIS_APP_STATUS.SUCCESS: {
      const hasPrevAppInfo = action.payload;
      return {
        ...state,
        hasPrevApp: hasPrevAppInfo.hasApp,
        userId: hasPrevAppInfo.userId,
      }
    }
    case CHECK_IN_FUNKIS.BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case CHECK_IN_FUNKIS.SUCCESS:
      return {
        ...state,
        loading: false,
        checkedInFunkis: action.payload
      }
    case CHECK_IN_FUNKIS.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

export default funkisReducer;
