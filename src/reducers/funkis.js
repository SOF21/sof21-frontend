import { 
  SEND_FUNKIS_APP,
  SET_FUNKIS_TYPE,
  GET_FUNKISAR,
  UPDATE_FUNKIS,
  GET_FUNKIS_TYPES,
  GET_FUNKIS_TIME_SLOTS,
} from '../actions/funkis'

const initialState = {
  loading: true,
  success: false,
  error: {},
  positions: {},
  funkisar: [],
  timeslots: {}
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
      const {payload: {funkisar}} = action;
      return {
        ...state,
        loading: false,
        funkisar: funkisar.sort(f => f.liuid),
      }
    }
    case UPDATE_FUNKIS.BEGIN: {
      const funkis = action.payload;
      return {
        ...state,
        funkisar: [
          ...state.funkisar.filter(f => f.liuid !== funkis.liuid),
          funkis
        ].sort(f => f.liuid),
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
      const {positions} = action.payload;
      const newPost = positions.reduce((obj, curr) => ({
        ...obj,
        [curr.id]: curr.title
      }), {})
      return {
        ...state,
        positions: newPost,
        loading: false,
      }
    case GET_FUNKIS_TYPES.FAILURE: {
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      }
    }
    case GET_FUNKIS_TIME_SLOTS.BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_FUNKIS_TIME_SLOTS.SUCCESS:
      const {timeslots} = action.payload;
      const options = {day: 'numeric', month: 'numeric'};
      const newSlots = timeslots.reduce((obj, curr) => {
        return {
          ...obj,
          [curr.funkis_category_id]: {
            ...obj[curr.funkis_category_id],
            [new Date(curr.start_time).toLocaleDateString(options)] : {
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
        loading: false,
      }
    case GET_FUNKIS_TIME_SLOTS.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
		default: 
			return state;
	}
}

export default funkisReducer;
