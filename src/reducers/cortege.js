import { GET_CORTEGES, SEND_CORTEGE_APP, UPDATE_CORTEGE } from "../actions/cortege";

const initialState = {
  loading: false,
  error: null,
	success: false,
	corteges: [],
}

const cortege = (state = initialState, action) => {
	switch (action.type) {
		case SEND_CORTEGE_APP.BEGIN: {
			return {
				...state,
				loading: true,
				success: false,
			}
		}
		case SEND_CORTEGE_APP.SUCCESS: {
			return {
				...state,
				loading: false,
				success: true,
			}
		}
		case SEND_CORTEGE_APP.FAILURE: {
			const err = action.payload;
			return {
				...state,
				loading: false,
				success: false,
				error: err,
			}
		}
		case GET_CORTEGES.BEGIN: {
			return {
				...state,
				loading: true,
			}
		}
		case GET_CORTEGES.SUCCESS: {
			const corteges = action.payload;
			return {
				...state,
				loading: false,
				corteges: {
					...corteges
				}
			}
		}
		case GET_CORTEGES.FAILURE: {
			const error = action.payload
			return {
				...state,
				loading: false,
				error,
			}
		}
		case UPDATE_CORTEGE.BEGIN: {
			const cortege = action.payload;
			return {
				...state,
				loading: true,
				corteges: {
					...state.corteges,
					[cortege.id]: {
						...state.corteges[cortege.id],
						...cortege,
					}
				}
			}
		}
		case UPDATE_CORTEGE.SUCCESS: {
			return {
				...state,
				loading: false,
				success: false,
			}
		}
		case UPDATE_CORTEGE.FAILURE: {
			const error = action.payload
			return {
				...state,
				loading: false,
				success: false,
				error,
			}
		}
    default: 
			return state;
	}
}

export default cortege;
