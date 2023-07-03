import { all } from 'redux-saga/effects';

import {
    watchSignupUser,
    watchLoginUser,
    watchGetResetPasswordToken,
    watchResetPassword,
} from './auth/watchSagas';

import {
    watchFetchAllJobsForCandidate,
    watchFetchAllAppliedJobsForCandidate,
    watchCandidateApplyToJob,
    watchPostNewJob,
    watchGetPostedJob,
    watchGetParticularJobCandidates,
} from './jobs/watchSagas';


export default function* rootSaga() {
    yield all([
        // auth
        watchSignupUser(),
        watchLoginUser(),
        watchGetResetPasswordToken(),
        watchResetPassword(),

        // jobs
        watchFetchAllJobsForCandidate(),
        watchFetchAllAppliedJobsForCandidate(),
        watchCandidateApplyToJob(),
        watchPostNewJob(),
        watchGetPostedJob(),
        watchGetParticularJobCandidates(),
    ]);
  };