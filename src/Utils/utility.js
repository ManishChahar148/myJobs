import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* putWrap(type, payload = {}) {
    yield put({ type, payload })
};


export const get = (url='', options={}) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}${url}`, options);
}

export const post = (url='', body={}, options={}) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}${url}`, body, options);
}

export const dispatchWrap = (dispatch, type, payload={}) => {
    if(!type) {
        console.error('Empty dispatch!')
        return;
    }
    dispatch({ type, payload });
}