import { ACCOUNT_POPUP_OPEN, SHOP_POPUP_OPEN } from '../actions/login'

const accountPopup = (state = { accountPopupOpen: false, shopPopupOpen: false }, action) => {
	switch (action.type) {
		case ACCOUNT_POPUP_OPEN:
			return {...state, accountPopupOpen: action.isOpen }
		case SHOP_POPUP_OPEN:
			return {...state, shopPopupOpen: action.isOpen }
		default: 
			return state;
	}
}

export default accountPopup;
