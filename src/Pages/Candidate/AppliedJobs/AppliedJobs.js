import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboard, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import JobCard from '../../../Components/JobCard';
import Button from '../../../Components/Button';
import { connect } from 'react-redux';
import {
    GET_APPLIED_JOBS_FOR_CANDIDATE,
    JOBS_REDUCER_STATE_RESETTER,
} from '../../../Redux/jobs/actionTypes';
import { dispatchWrap } from '../../../Utils/utility';
import Loader from '../../../Components/Loader';
import './AppliedJobs.scss';
import APP_ROUTES from '../../../Routes/appRoutes';
import Pagination from '../../../Components/Pagination';
import { Helmet } from 'react-helmet-async';

class AppliedJobs extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             currentPage: 0,
        }
        this.pageSize = 20;
    }

    componentDidMount() {
        const {
            getAppliedJobsForCandidate,
            resetJobsValues,
        } = this.props;

        // reset some values
        const resetValues = {
            appliedJobsForCandidate: [],
        };
        resetJobsValues(resetValues);


        getAppliedJobsForCandidate();
    }

    handlePageChange = ({ selected })  => {
        this.setState({
            currentPage: selected,
        })
    }

    render() {
        const {
            history,
            jobs,
            isFetchingAppliedJobsForCandidate,
        } = this.props;        

        const {
            currentPage,
        } = this.state;

        return (
            <div className='appliedJobsComponent'>
                <Helmet><title>Applied Jobs</title></Helmet>
                <Loader isLoading={isFetchingAppliedJobsForCandidate} loaderMessage={'Loading Applied Jobs, Please wait...'}/>
                <div className='container'>
                <div className='pathIndicator'>
                    <span style={{ cursor: 'pointer' }} onClick={() => { history && history.push('/')}}>
                        <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faHome} className='fa-lg'/>Home
                    </span>
                    <FontAwesomeIcon style={{ marginRight: '10px', marginLeft: '10px' }} icon={faAngleRight} className='fa-lg'/> Post a Job
                </div>
                <div className='jobsPostedByYouHeading'>
                    Jobs applied by You
                </div>
                {jobs && jobs.length > 0 ?
                    <div className='jobCardsContainer'>                
                        {jobs.slice(currentPage*this.pageSize,  (currentPage*this.pageSize + this.pageSize)).map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                // onButtonClick={}
                                buttonLabel={'Apply'}
                                hideButton={true}
                            />
                        ))}
                    </div>
                    :
                    <div className='noJobsView'>
                        <div>
                            <FontAwesomeIcon icon={faClipboard} className='fa-lg' style={{ opacity: '50%', fontSize: '106px' }}/>
                        </div>
                        <div className='noJobsViewInfoText'>
                            Your applied jobs will show here!
                        </div>
                        <div className='seeAllJobsButtonCandidate'>
                            <Button
                                label='See all jobs'
                                cursor='pointer'
                                onClick={() => {history && history.push(APP_ROUTES.CANDIDATE.ROUTES.HOME)}}
                            />
                        </div>
                    </div>
                }
                </div>
                {(jobs && (jobs.length > 0)) && 
                    <Pagination
                        onPageChange={this.handlePageChange}
                        pageCount={Math.ceil((jobs?.length / this.pageSize) || 0)}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    jobs: state.jobs.appliedJobsForCandidate,
    isFetchingAppliedJobsForCandidate: state.jobs.isFetchingAppliedJobsForCandidate,
});

const mapDispatchToProps = (dispatch) => ({
    getAppliedJobsForCandidate: () => {
        dispatchWrap(dispatch, GET_APPLIED_JOBS_FOR_CANDIDATE);
    },
    resetJobsValues: (resetValues) => {
        dispatchWrap(dispatch, JOBS_REDUCER_STATE_RESETTER, resetValues); 
    }
})

export default connect(mapStateToProps, mapDispatchToProps) (AppliedJobs);
