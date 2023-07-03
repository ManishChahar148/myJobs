import { call, select } from 'redux-saga/effects';
import { putWrap, get, post } from '../../Utils/utility';
import {
    SIGNUP_USER_PENDING,
    SIGNUP_USER_FULFILLED,
    SIGNUP_USER_REJECTED,
    LOGIN_USER_PENDING,
    LOGIN_USER_FULFILLED,
    LOGIN_USER_REJECTED,
    GET_PASSWORD_RESET_TOKEN_PENDING,
    GET_PASSWORD_RESET_TOKEN_FULFILLED,
    GET_PASSWORD_RESET_TOKEN_REJECTED,
    RESET_PASSWORD_PENDING,
    RESET_PASSWORD_FULFILLED,
    RESET_PASSWORD_REJECTED,
} from './actionTypes';

import * as Api from './api';

export function* signupUser(action) {
    yield* putWrap(SIGNUP_USER_PENDING);
    try {
    const userData = action.payload;
    const data = yield call(post, Api.registerUser, userData);
    yield* putWrap(SIGNUP_USER_FULFILLED, data);
    } catch (err) {
        yield* putWrap(SIGNUP_USER_REJECTED, err);
    }
};

export function* loginUser(action) {
    yield* putWrap(LOGIN_USER_PENDING);
    try {
    const userData = action.payload;
    const data = yield call(post, Api.loginUser, userData);
    yield* putWrap(LOGIN_USER_FULFILLED, data);
    } catch (err) {
        yield* putWrap(LOGIN_USER_REJECTED, err);
    }
};


export function* getResetPasswordToken(action) {
    yield* putWrap(GET_PASSWORD_RESET_TOKEN_PENDING);
    try {
    const { email } = action.payload;
    const data = yield call(get, `${Api.getResetPasswordToken}${email}`);
    yield* putWrap(GET_PASSWORD_RESET_TOKEN_FULFILLED, data);
    } catch (err) {
        yield* putWrap(GET_PASSWORD_RESET_TOKEN_REJECTED, err);
    }
};


export function* resetPassword(action) {
    yield* putWrap(RESET_PASSWORD_PENDING);
    try {
    const { password, confirmPassword } = action.payload;
    const resetPasswordData = yield select(state => state?.auth?.resetPasswordData);
    const body = {
        password,
        confirmPassword,
        token: resetPasswordData?.token,
    }
    const data = yield call(post, `${Api.resetPassword}`, body);
    yield* putWrap(RESET_PASSWORD_FULFILLED, data);
    } catch (err) {
        yield* putWrap(RESET_PASSWORD_REJECTED, err);
    }
};