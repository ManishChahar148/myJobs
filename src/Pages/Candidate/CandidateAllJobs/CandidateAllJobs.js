import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboard } from '@fortawesome/free-solid-svg-icons';
import JobCard from '../../../Components/JobCard';
import {
    GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE,
    CANDIDATE_APPLY_TO_JOB,
    JOBS_REDUCER_STATE_RESETTER,
} from '../../../Redux/jobs/actionTypes';
import { dispatchWrap } from '../../../Utils/utility';
import Loader from '../../../Components/Loader';
import './CandidateAllJobs.scss';
import Pagination from '../../../Components/Pagination';
import { Helmet } from 'react-helmet-async';


export class CandidateAllJobs extends Component {

    componentDidMount() {
        const {
            getAllJobs,
            resetJobsValues,
        } = this.props;

        // reset some values
        const resetValues = {
            allAvailableJobsForCandidates: [],
            totalJobsForCandidate: 0,
        };
        resetJobsValues(resetValues);
        
        // fetch jobs for first page
        getAllJobs(1);
    }

    handlePageChange = ({ selected }) => {
        const {
            getAllJobs,
        } = this.props;

        getAllJobs(selected + 1);
    }

    render() {
        const {
            jobs,
            isFetchingAllAvailableJobsForCandidates,
            isCandidateApplyingToJob,
            candidateApplyToJob,
            totalJobsForCandidate,
        } = this.props;

        return (
            <div className='candidateAllJobsComponent'>
                <Helmet><title>Jobs</title></Helmet>
                <Loader
                    isLoading={isFetchingAllAvailableJobsForCandidates || isCandidateApplyingToJob}
                    loaderMessage={'Loading Jobs, Please Wait...'}    
                />            
                <div className='container'>
                <div className='pathIndicator'>
                    <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faHome} className='fa-lg'/>Home
                </div>
                <div className='jobsPostedByYouHeading'>
                    Jobs for you
                </div>
                {jobs && jobs.length > 0 ?
                    <div className='jobCardsContainer'>                
                        {jobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onButtonClick={() => {candidateApplyToJob(job.id)}}
                                buttonLabel={'Apply'}
                            />
                        ))}
                    </div>
                    :
                    <div className='noJobsView'>
                        <div>
                            <FontAwesomeIcon icon={faClipboard} className='fa-lg' style={{ opacity: '50%', fontSize: '106px' }}/>
                        </div>
                        <div className='noJobsViewInfoText'>
                            No jobs found!
                        </div>
                    </div>
                }
                </div>
                {Math.ceil(totalJobsForCandidate/20) > 0 &&
                    <Pagination
                        onPageChange={this.handlePageChange}
                        pageCount={Math.ceil(totalJobsForCandidate/20)}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFetchingAllAvailableJobsForCandidates: state.jobs.isFetchingAllAvailableJobsForCandidates,
    jobs: state.jobs.allAvailableJobsForCandidates,
    isCandidateApplyingToJob: state.jobs.isCandidateApplyingToJob,
    totalJobsForCandidate: state.jobs.totalJobsForCandidate,
});

const mapDispatchToProps = (dispatch) => ({
    getAllJobs: (page) => {
        dispatchWrap(dispatch, GET_ALL_AVAILABLE_JOBS_FOR_CANDIDATE, { page });
    },
    candidateApplyToJob: (jobId) => {
        dispatchWrap(dispatch, CANDIDATE_APPLY_TO_JOB, { jobId })
    },
    resetJobsValues: (resetValues) => {
        dispatchWrap(dispatch, JOBS_REDUCER_STATE_RESETTER, resetValues); 
    }
})

export default connect(mapStateToProps, mapDispatchToProps) (CandidateAllJobs);
