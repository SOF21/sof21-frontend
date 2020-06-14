export const SET_TITLE = 'SET_TITLE';
export const SET_ACTIVE_TAB_INDEX = 'SET_ACTIVE_TAB_INDEX';

export function setTitle(title) {
	return {
		type: SET_TITLE,
		title,
	}
}

export function setActiveTab(index) {
	return {
		type: SET_ACTIVE_TAB_INDEX,
		index,
	}
}

export const mapTabToIndex = {
  ACCOUNT: 0, 
	PURCHASES: 1, 
	ORCHESTRA: 2,
  ADMIN: 3
}