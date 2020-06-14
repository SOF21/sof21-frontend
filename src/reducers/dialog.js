import { 
	OPEN_DIALOG, 
	CLOSE_DIALOG,
	OPEN_SNACKBAR, 
	CLOSE_SNACKBAR
 } from '../actions/dialog'

const initialState = {
  open: false,
  title: "",
	text: "",
	snackBarMsg: '',
	snackBarOpen: false,
}

const dialog = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_DIALOG:
			return {...state, open: true, title: action.title, text: action.text}
		case CLOSE_DIALOG:
			return {...state, open: false}
		case OPEN_SNACKBAR:
			return {...state, snackBarOpen: true, snackBarMsg: action.msg}
		case CLOSE_SNACKBAR:
			return {...state, snackBarOpen: false}
		default: 

			return state;
	}
}

export default dialog;
