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
    POST_NEW_JOB_PENDING,
    POST_NEW_JOB_FULFILLED,
    POST_NEW_JOB_REJECTED,
    GET_POSTED_JOBS_PENDING,
    GET_POSTED_JOBS_FULFILLED,
    GET_POSTED_JOBS_REJECTED,
    GET_PARTICULAR_JOB_CANDIDATES_PENDING,
    GET_PARTICULAR_JOB_CANDIDATES_FULFILLED,
    GET_PARTICULAR_JOB_CANDIDATES_REJECTED,
    JOBS_REDUCER_STATE_RESETTER,
} from './actionTypes';

import customToast from '../../Utils/Toast/customToast';

const initialState = {
    isFetchingAllAvailableJobsForCandidates: false,
    allAvailableJobsForCandidates: [],
    isFetchingAppliedJobsForCandidate: false,
    appliedJobsForCandidate: [],
    isCandidateApplyingToJob: false,
    isPostingNewJob: false,
    isFetchingPostedJobs: false,
    postedJobs: [],
    isFetchingParticularJobCandidats: false,
    particularJobCandidates: [],
    totalJobsForCandidate: 0,
    totalJobsPostedByRecruiter: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE_PENDING: {
            return {
                ...state,
                isFetchingAllAvailableJobsForCandidates: true,
            }
        }

        case GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE_FULFILLED: {
            const { payload } = action;
            const data = payload?.data?.data;
            // console.table(data);
            let totalJobs = state.totalJobsForCandidate;
            if(payload?.data?.metadata?.count) {
                totalJobs = payload?.data?.metadata?.count;
            }

            return {
                ...state,
                isFetchingAllAvailableJobsForCandidates: false,
                allAvailableJobsForCandidates: data || [],
                totalJobsForCandidate: totalJobs,
            }
        }

        case GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE_REJECTED: {
            return {
                ...state,
                isFetchingAllAvailableJobsForCandidates: false,
            }
        }

        case GET_APPLIED_JOBS_FOR_CANDIDATE_PENDING: {
            return {
                ...state,
                isFetchingAppliedJobsForCandidate: true,
            }
        }

        case GET_APPLIED_JOBS_FOR_CANDIDATE_FULFILLED: {
            const { payload } = action;
            const data = payload?.data?.data;
            // console.table(data);
            return {
                ...state,
                isFetchingAppliedJobsForCandidate: false,
                appliedJobsForCandidate: data || [],
            }
        }

        case GET_APPLIED_JOBS_FOR_CANDIDATE_REJECTED: {
            return {
                ...state,
                isFetchingAppliedJobsForCandidate: false,
            }
        }

        case CANDIDATE_APPLY_TO_JOB_PENDING: {
            return {
                ...state,
                isCandidateApplyingToJob: true,
            }
        }

        case CANDIDATE_APPLY_TO_JOB_FULFILLED: {
            customToast('Apply to Job', 'Congratulations, Your application is submitted successfully :)');
            return {
                ...state,
                isCandidateApplyingToJob: false,
            }
        }

        case CANDIDATE_APPLY_TO_JOB_REJECTED: {
            customToast('Apply to Job', 'Oops, Failed to send application!')
            return {
                ...state,
                isCandidateApplyingToJob: false,
            }
        }

        case POST_NEW_JOB_PENDING: {
            return {
                ...state,
                isPostingNewJob: true,
            };
        }
        case POST_NEW_JOB_FULFILLED: {
            customToast('Post Job', 'Job posted successfully');
            return {
                ...state,
                isPostingNewJob: false,
            };
        }
        case POST_NEW_JOB_REJECTED: {
            customToast('Post Job', 'Failed to post job!');
            return {
                ...state,
                isPostingNewJob: false,
            };
        }

        case GET_POSTED_JOBS_PENDING: {
            return {
                ...state,
                isFetchingPostedJobs: true,
            }
        }

        case GET_POSTED_JOBS_FULFILLED: {
            const { payload: { data } } = action;
            if (!data) {
                return {
                    ...state,
                    isFetchingPostedJobs: false,
                    postedJobs: [],
                }
            }
            const jobsData = data.data && data.data.data;
            if (!jobsData) {
                return {
                    ...state,
                    isFetchingPostedJobs: false,
                    postedJobs: [],
                }
            }

            // let totalJobs = state.totalJobsForCandidate;
            // if(data?.data?.metadata?.count) {
            //     totalJobs = data?.data?.metadata?.count;
            // }
            
            return {
                ...state,
                isFetchingPostedJobs: false,
                postedJobs: jobsData || [],
                totalJobsPostedByRecruiter: data?.data?.metadata?.count || 0,
            }
        }

        case GET_POSTED_JOBS_REJECTED: {
            return {
                ...state,
                isFetchingPostedJobs: false,
            }
        }

        case GET_PARTICULAR_JOB_CANDIDATES_PENDING: {
            return {
                ...state,
                isFetchingParticularJobCandidats: true,
                particularJobCandidates: [],
            }
        }

        case GET_PARTICULAR_JOB_CANDIDATES_FULFILLED: {
            const { payload: { data }} = action;
            if(!data) {
                return {
                    ...state,
                    isFetchingParticularJobCandidats: false,
                    particularJobCandidates: [],
                }    
            }
            let candidateDetails = data.data;

            return {
                ...state,
                isFetchingParticularJobCandidats: false,
                particularJobCandidates: candidateDetails || [],
            }
        }

        case GET_PARTICULAR_JOB_CANDIDATES_REJECTED: {
            return {
                ...state,
                isFetchingParticularJobCandidats: false,
                particularJobCandidates: [],
            }
        }
        
        case JOBS_REDUCER_STATE_RESETTER: {
            const { payload } = action;
            return {
                ...state,
                ...payload,
            }     
        }

        default: return { ...state };
    }
};

export default reducer;