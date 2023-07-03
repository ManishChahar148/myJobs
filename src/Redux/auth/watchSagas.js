import { takeEvery } from 'redux-saga/effects';
import {
    signupUser,
    loginUser,
    getResetPasswordToken,
    resetPassword,
} from './sagas';

import {
    SIGNUP_USER,
    LOGIN_USER,
    GET_PASSWORD_RESET_TOKEN,
    RESET_PASSWORD,
} from './actionTypes';

export function* watchSignupUser() {
    yield takeEvery(SIGNUP_USER, signupUser);
};

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchGetResetPasswordToken() {
    yield takeEvery(GET_PASSWORD_RESET_TOKEN, getResetPasswordToken);
}

export function* watchResetPassword() {
    yield takeEvery(RESET_PASSWORD, resetPassword);
}