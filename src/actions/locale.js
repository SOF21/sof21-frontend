export const SET_LOCALE = 'SET_LOCALE';

export function setLocale(lang) {
	return {
		type: SET_LOCALE,
		lang,
	}
}

export function setLocaleAndStore(lang) {
	return dispatch => {
		localStorage.setItem('sofLang', lang);	
		dispatch(setLocale(lang));
	}
}