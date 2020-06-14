export const OPEN_DIALOG  = 'OPEN_DIALOG ';
export const CLOSE_DIALOG  = 'CLOSE_DIALOG ';

export function openDialog(title, text) {
	return {
		type: OPEN_DIALOG,
    title, 
    text,
	}
}

export function closeDialog() {
	return {
		type: CLOSE_DIALOG,
	}
}

export const OPEN_SNACKBAR  = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR  = 'CLOSE_SNACKBAR';

export function openSnackbar(msg) {
	return {
		type: OPEN_SNACKBAR,
    msg
	}
}

export function closeSnackbar() {
	return {
		type: CLOSE_SNACKBAR,
	}
}