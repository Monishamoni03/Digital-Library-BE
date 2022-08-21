//regex
export const NAME_REGEX = /^[a-zA-Z]{2,25}$/;
export const EMAIL_REGEX = /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const BOOKNAME_REGEX = /^[a-zA-Z0-9]{2,35}$/;
export const ROLES = 'user';