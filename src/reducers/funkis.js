import { 
  SEND_FUNKIS_APP,
  SET_FUNKIS_TYPE,
  GET_FUNKISAR,
  UPDATE_FUNKIS,
  GET_FUNKIS_TYPES,
} from '../actions/funkis'

const initialState = {
  loading: true,
  success: false,
  error: {},
  funkisar: [],
}

const funkisReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEND_FUNKIS_APP.BEGIN:
      return {
        ...state,
        success: false,
        loading: true,
      }
		case SEND_FUNKIS_APP.SUCCESS:
			return {
        ...state,
        success: true,
        loading: false,
      }
    case GET_FUNKISAR.BEGIN:
      return {
        ...state,
        loading: true,
      }
    case GET_FUNKISAR.SUCCESS:
      const {payload: {funkisar}} = action;
      return {
        ...state,
        loading: false,
        funkisar: funkisar.sort(f => f.liuid),
      }
    case UPDATE_FUNKIS:
      const funkis = action.payload;
      return {
        ...state,
        funkisar: [
          ...state.funkisar.filter(f => f.liuid !== funkis.liuid),
          funkis
        ].sort(f => f.liuid)
      }

    case GET_FUNKIS_TYPES.BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_FUNKIS_TYPES.SUCCESS:
      const {positions} = action.payload;
      console.log(positions)
      return {
        ...state,
        positions,
        loading: false,
      }
    case GET_FUNKIS_TYPES.FAILURE:
      const error = action.payload;
      return {
        ...state,
        loading: false,
        error,
      }
		default: 
			return state;
	}
}

export default funkisReducer;
