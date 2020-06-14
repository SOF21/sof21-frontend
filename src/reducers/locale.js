import { SET_LOCALE } from '../actions/locale'

const locale = (state = { lang: 'sv'}, action) => {
	switch (action.type) {
		case SET_LOCALE:
			return {...state, lang: action.lang }
		default: 
			return state;
	}
}

export default locale;