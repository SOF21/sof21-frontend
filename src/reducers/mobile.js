import { IS_MOBILE } from '../actions/mobile'

const mobile = (state = { isMobile: false }, action) => {
	switch (action.type) {
		case IS_MOBILE:
			return {...state, isMobile: action.isMobile }
		default: 
			return state;
	}
}

export default mobile;