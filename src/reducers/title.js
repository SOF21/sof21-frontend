import { SET_TITLE, SET_ACTIVE_TAB_INDEX } from '../actions/title'

const title = (state = { title: '', activeTab: 0}, action) => {
	switch (action.type) {
		case SET_TITLE:
			return {...state, title: action.title }
		case SET_ACTIVE_TAB_INDEX:
			return {...state, activeTab: action.index}
		default: 
			return state;
	}
}

export default title;