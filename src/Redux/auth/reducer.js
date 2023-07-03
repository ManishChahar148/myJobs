import {
    SIGNUP_USER_PENDING,
    SIGNUP_USER_FULFILLED,
    SIGNUP_USER_REJECTED,
    RESET_USER_ALREADY_REGISTERED_ERROR,
    LOGIN_USER_PENDING,
    LOGIN_USER_FULFILLED,
    LOGIN_USER_REJECTED,
    HIDE_LOGOUT_BUTTON,
    SHOW_LOGOUT_BUTTON,
    LOGOUT_USER,
    GET_PASSWORD_RESET_TOKEN_PENDING,
    GET_PASSWORD_RESET_TOKEN_FULFILLED,
    GET_PASSWORD_RESET_TOKEN_REJECTED,
    CLEAR_PASSWORD_RESET_DATA,
    RESET_PASSWORD_PENDING,
    RESET_PASSWORD_FULFILLED,
    RESET_PASSWORD_REJECTED,
    RESET_LOGIN_ERROR,
    AUTH_REDUCER_STATE_RESETTER,
} from './actionTypes';

import customToast from '../../Utils/Toast/customToast';

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    userAlreadyRegisteredError: false,
    isErrorWhileLogin: false,
    userInfo: undefined,
    isLogoutChipVisible: false,
    isFetchingResetToken: false,
    resetPasswordData: undefined,
    isResettingPassword: false,
    emailNotFoundWhileFetchingResetToken: '',
    resetPasswordSameAsPrevError: ''
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGNUP_USER_PENDING: {
            return {
                ...state,
                isLoading: true,
                userInfo: undefined,
            }
        }
        case SIGNUP_USER_FULFILLED: {
            const { payload } = action;
            const data = payload?.data?.data;
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                userInfo: data,
                userAlreadyRegisteredError: false,
            }
        }
        case SIGNUP_USER_REJECTED: {
            const { payload } = action;
            let alreadyRegisterdErr = '';
            if(payload?.response?.data?.message === 'You are already registered.') {
                alreadyRegisterdErr='You are already registered.';
            }
            return {
                ...state,
                isLoading: false,
                userAlreadyRegisteredError: alreadyRegisterdErr,
            }
        }

        case RESET_USER_ALREADY_REGISTERED_ERROR: {
            return {
                ...state,
                userAlreadyRegisteredError: '',
            }
        }

        case LOGIN_USER_PENDING: {
            return {
                ...state,
                isLoading: true,
                isErrorWhileLogin: false,
            };
        }
        case LOGIN_USER_FULFILLED: {
            const { payload: { data: { data } }} = action;

            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                userInfo: data,
                isErrorWhileLogin: false,
            };
        }
        case LOGIN_USER_REJECTED: {
            return {
                ...state,
                isLoading: false,
                isErrorWhileLogin: true,
            };
        }

        case HIDE_LOGOUT_BUTTON: {
            return {
                ...state,
                isLogoutChipVisible: false,
            }
        }

        case SHOW_LOGOUT_BUTTON: {
            return {
                ...state,
                isLogoutChipVisible: true,
            }
        }

        case LOGOUT_USER: {
            localStorage.clear();
            customToast('Logout', 'You have successfully logged out.');
            return { 
                ...state,
                userInfo: undefined,
                isLoggedIn: false,
                isLogoutChipVisible: false,
            }
        }

        case GET_PASSWORD_RESET_TOKEN_PENDING: {
            return {
                ...state,
                isFetchingResetToken: true,
            };
        }

        case GET_PASSWORD_RESET_TOKEN_FULFILLED: {
            const { payload: { data: { data } }} = action;
            return {
                ...state,
                isFetchingResetToken: false,
                resetPasswordData: data,
            };
        }

        case GET_PASSWORD_RESET_TOKEN_REJECTED: {
            return {
                ...state,
                isFetchingResetToken: false,
                emailNotFoundWhileFetchingResetToken: 'No user found with the provided email.',
            };
        }

        case CLEAR_PASSWORD_RESET_DATA: {
            return {
                ...state,
                resetPasswordData: undefined,
            }
        }

        case RESET_PASSWORD_PENDING: {
            return {
                ...state,
                isResettingPassword: true,
            };
        }

        case RESET_PASSWORD_FULFILLED: {
            return {
                ...state,
                isResettingPassword: false,
                resetPasswordData: {},
            };
        }

        case RESET_PASSWORD_REJECTED: {
            return {
                ...state,
                isResettingPassword: false,
                resetPasswordSameAsPrevError: 'The password you entered matches one of your previous passwords.'
            };
        }

        case RESET_LOGIN_ERROR: {
            return {
                ...state,
                isErrorWhileLogin: false,
            }
        }

        case AUTH_REDUCER_STATE_RESETTER: {
            const { payload } = action;
            return {
                ...state,
                ...payload,
            }
        }

        default:  return { ...state };
    }
};

export default reducer;