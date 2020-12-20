import { SEND_CORTEGE_APP } from "../actions/cortege";

const initialState = {
  loading: false,
  error: null,
	success: false
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
    default: 
			return state;
	}
}

export default cortege;
