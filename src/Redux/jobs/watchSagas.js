import { takeEvery } from 'redux-saga/effects';
import {
    fetchAllJobsForCandidate,
    fetchAllAppliedJobsForCandidate,
    candidateApplyToJob,
    postNewJob,
    getPostedJobs,
    getParticularJobCandidates,
} from './sagas';

import {
    GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE,
    GET_APPLIED_JOBS_FOR_CANDIDATE,
    CANDIDATE_APPLY_TO_JOB,
    POST_NEW_JOB,
    GET_POSTED_JOBS,
    GET_PARTICULAR_JOB_CANDIDATES,
} from './actionTypes';


export function* watchFetchAllJobsForCandidate() {
    yield takeEvery(GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE, fetchAllJobsForCandidate);
};

export function* watchFetchAllAppliedJobsForCandidate () {
    yield takeEvery(GET_APPLIED_JOBS_FOR_CANDIDATE, fetchAllAppliedJobsForCandidate);
}

export function* watchCandidateApplyToJob() {
    yield takeEvery(CANDIDATE_APPLY_TO_JOB, candidateApplyToJob);
}

export function* watchPostNewJob() {
    yield takeEvery(POST_NEW_JOB, postNewJob);
}

export function* watchGetPostedJob() {
    yield takeEvery(GET_POSTED_JOBS, getPostedJobs);
}

export function* watchGetParticularJobCandidates() {
    yield takeEvery(GET_PARTICULAR_JOB_CANDIDATES, getParticularJobCandidates);
}