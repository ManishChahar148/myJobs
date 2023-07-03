import { call, select } from 'redux-saga/effects';
import { putWrap, get, post } from '../../Utils/utility';

import * as Api from './api';

import {
    GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE_PENDING,
    GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE_FULFILLED,
    GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE_REJECTED,
    GET_APPLIED_JOBS_FOR_CANDIDATE_PENDING,
    GET_APPLIED_JOBS_FOR_CANDIDATE_FULFILLED,
    GET_APPLIED_JOBS_FOR_CANDIDATE_REJECTED,
    CANDIDATE_APPLY_TO_JOB_PENDING,
    CANDIDATE_APPLY_TO_JOB_FULFILLED,
    CANDIDATE_APPLY_TO_JOB_REJECTED,
    GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE,
    POST_NEW_JOB_PENDING,
    POST_NEW_JOB_FULFILLED,
    POST_NEW_JOB_REJECTED,
    GET_POSTED_JOBS_PENDING,
    GET_POSTED_JOBS_FULFILLED,
    GET_POSTED_JOBS_REJECTED,
    GET_PARTICULAR_JOB_CANDIDATES_PENDING,
    GET_PARTICULAR_JOB_CANDIDATES_FULFILLED,
    GET_PARTICULAR_JOB_CANDIDATES_REJECTED,
} from './actionTypes';


export function* fetchAllJobsForCandidate(action) {
    yield* putWrap(GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE_PENDING);
    try {
    const userInfo = yield select(state => state?.auth?.userInfo);
    const token = userInfo?.token;
    const url = Api.getAllAvailableJobsForCandidate.replace('<<page>>', action?.payload?.page || 1)
    const data = yield call(get,url , { headers : { Authorization : token }});
    yield* putWrap(GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE_FULFILLED, data);
    } catch (err) {
        yield* putWrap(GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE_REJECTED, err);
    }
};


export function* fetchAllAppliedJobsForCandidate(action) {
    yield* putWrap(GET_APPLIED_JOBS_FOR_CANDIDATE_PENDING);
    try {
    const userInfo = yield select(state => state?.auth?.userInfo);
    const token = userInfo?.token;
    const data = yield call(get, Api.getAppliedJobsForCandidate, { headers : { Authorization : token }});
    yield* putWrap(GET_APPLIED_JOBS_FOR_CANDIDATE_FULFILLED, data);
    } catch (err) {
        yield* putWrap(GET_APPLIED_JOBS_FOR_CANDIDATE_REJECTED, err);
    }
};

export function* candidateApplyToJob(action) {
    yield* putWrap(CANDIDATE_APPLY_TO_JOB_PENDING);
    try {
    const userInfo = yield select(state => state?.auth?.userInfo);
    const token = userInfo?.token;
    const body = {
        jobId: action?.payload?.jobId,
    }
    const options = { headers : { Authorization : token }};
    const data = yield call(post, Api.candidateApplyToJob, body, options );
    yield* putWrap(CANDIDATE_APPLY_TO_JOB_FULFILLED, data);
    yield* putWrap(GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE)
    } catch (err) {
        yield* putWrap(CANDIDATE_APPLY_TO_JOB_REJECTED, err);
    }
};

export function* postNewJob(action) {
    yield* putWrap(POST_NEW_JOB_PENDING);
    try {
        const userInfo = yield select(state => state?.auth?.userInfo);
        const token = userInfo?.token;
        const body = {
            title: action.payload.title,
            description: action.payload.description,
            location: action.payload.location,
        };
        const options = { headers: { Authorization: token } };
        const data = yield call(post, Api.postNewJobs, body, options);
        const history = action?.payload?.history;
        history?.push('/')
        yield* putWrap(POST_NEW_JOB_FULFILLED, data);
    } catch (err) {
        yield* putWrap(POST_NEW_JOB_REJECTED, err);
    }
}

export function* getPostedJobs(action) {
    yield* putWrap(GET_POSTED_JOBS_PENDING);
    try {
        const userInfo = yield select(state => state?.auth?.userInfo);
        const token = userInfo?.token;
        const options = { headers : { Authorization : token }};
        const url = Api.getPostedJobs.replace('<<page>>', action?.payload?.page || 1)
        const data = yield call(get, url, options);
        yield* putWrap(GET_POSTED_JOBS_FULFILLED, data);
    } catch (err) {
        yield* putWrap(GET_POSTED_JOBS_REJECTED, err);
    }
}

export function* getParticularJobCandidates(action) {
    yield* putWrap(GET_PARTICULAR_JOB_CANDIDATES_PENDING);
    try {
        const userInfo = yield select(state => state?.auth?.userInfo);
        const token = userInfo?.token;
        const options = { headers : { Authorization : token }};
        const url = Api.getJobApplicants.replace('<<jobId>>', action?.payload?.jobId);
        const data = yield call(get, url, options);
        yield* putWrap(GET_PARTICULAR_JOB_CANDIDATES_FULFILLED, data);
    } catch (err) {
        yield* putWrap(GET_PARTICULAR_JOB_CANDIDATES_REJECTED, err);
    }
}