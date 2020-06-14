export const IS_MOBILE = 'IS_MOBILE';

export function setMobile(isMobile) {
	return {
		type: IS_MOBILE,
		isMobile,
	}
}
