export const ACCOUNT_POPUP_OPEN = 'ACCOUNT_POPUP_OPEN';
export const SHOP_POPUP_OPEN = 'SHOP_POPUP_OPEN';


export function setAccountPopupOpen(isOpen) {
	return {
		type: ACCOUNT_POPUP_OPEN,
		isOpen,
	}
}

export function setShopPopupOpen(isOpen) {
	return {
		type: SHOP_POPUP_OPEN,
		isOpen,
	}
}
