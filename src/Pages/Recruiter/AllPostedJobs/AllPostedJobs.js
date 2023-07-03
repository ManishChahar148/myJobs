import React, { useState, useEffect } from 'react';
import './AllPostedJobs.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboard, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Components/Button';
import Dialog from '../../../Components/Dialog';
import JobCard from '../../../Components/JobCard';
import APP_ROUTES from '../../../Routes/appRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchWrap } from '../../../Utils/utility';
import {
    GET_POSTED_JOBS,
    GET_PARTICULAR_JOB_CANDIDATES,
    JOBS_REDUCER_STATE_RESETTER,
} from '../../../Redux/jobs/actionTypes';
import Loader from '../../../Components/Loader';
import Pagination from '../../../Components/Pagination';
import { Helmet } from 'react-helmet-async';

function AllPostedJobs({ history }) {

    const dispatch = useDispatch();
    const [isApplicantsDialogVisible, setApplicantsDialogVisible] = useState(false);

    const postedJobs = useSelector(state => state?.jobs?.postedJobs || []);
    const isFetchingPostedJobs = useSelector(state => state?.jobs?.isFetchingPostedJobs);
    const applicants = useSelector(state => state?.jobs?.particularJobCandidates);
    const totalJobsPostedByRecruiter = useSelector(state => state?.jobs?.totalJobsPostedByRecruiter);
    const isFetchingParticularJobApplicants = useSelector(state => state?.jobs?.isFetchingParticularJobCandidats)

    useEffect(() => {
        const resetValues = {
            postedJobs: [],
            totalJobsPostedByRecruiter: 0,
        }
        dispatchWrap(dispatch, JOBS_REDUCER_STATE_RESETTER, resetValues);
        dispatchWrap(dispatch, GET_POSTED_JOBS, { page: 1 });
    }, [dispatch]);

    const handlePageChange = ({ selected }) => {
        dispatchWrap(dispatch, GET_POSTED_JOBS, { page: selected + 1 });
    }
    

    return (
            <div className='allPostedJobsComponent'>
                <Helmet><title>Posted Jobs</title></Helmet>
                <Loader
                    isLoading={isFetchingPostedJobs || isFetchingParticularJobApplicants}
                    loaderMessage={`Loading ${isFetchingPostedJobs ? 'Jobs' : 'Applicants'}, Please Wait...`}/>
                <div className='container'>
                <div className='pathIndicator'>
                    <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faHome} className='fa-lg'/>Home
                </div>
                <div className='jobsPostedByYouHeading'>
                    Jobs posted by you
                </div>
                {postedJobs && postedJobs.length > 0 ?
                    <div className='jobCardsContainer'>                
                        {postedJobs.map((job) => (
                            <JobCard
                            key={job?.id}
                            job={job}
                            onButtonClick={() => {
                                dispatchWrap(dispatch, GET_PARTICULAR_JOB_CANDIDATES, {jobId:  job?.id});
                                setApplicantsDialogVisible(true);
                            }}
                            buttonLabel={'View Applications'}
                        />
                        ))}
                    </div>
                    :
                    <div className='noJobsView'>
                        <div>
                            <FontAwesomeIcon icon={faClipboard} className='fa-lg' style={{ opacity: '50%', fontSize: '106px' }}/>
                        </div>
                        <div className='noJobsViewInfoText'>
                            Your posted jobs will show here!
                        </div>
                        <div className='postAJobFromJobComponent'>
                            <Button
                                label='Post a Job'
                                cursor='pointer'
                                onClick={() => {history && history.push(APP_ROUTES.RECRUITER.ROUTES.POST_JOBS)}}
                            />
                        </div>
                    </div>
                }
                </div>
                {Math.ceil(totalJobsPostedByRecruiter/20) > 0 &&
                    <Pagination
                    pageCount={Math.ceil(totalJobsPostedByRecruiter/20)}
                    onPageChange={handlePageChange}
                    />
                }
                <Dialog
                    dialogTitle={<span>Applicants for this job</span>}
                    isOpen={isApplicantsDialogVisible}
                    closeDialog={() => setApplicantsDialogVisible(false)}
                >   
                    <div className='totalApplicantsCount'>
                     {applicants && applicants.length === 0 ?
                        '0 applications'
                        :
                        `Total ${applicants.length} applicantion${applicants.length === 1 ? '' : 's'}`
                     }
                    </div>
                    {applicants && applicants.length > 0 ?
                    <div className='appicantsCardContainer'>
                        {applicants.map((applicant) => (
                        <div key={applicant.id} className='applicantCard'>
                            <div className='applicantInfo'>
                                <div className='applicantProfilePic'>{applicant.name.slice(0,1)}</div>
                                <div className='applicantPersonalDetails'>
                                    <div className='applicantsName'>{applicant.name}</div>
                                    <div className='applicantsEmail'>{applicant.email}</div>
                                </div>
                            </div>
                            <div className='applicantSkillsHeading'>
                                Skills
                            </div>
                            <div className='applicantSkills'>
                                {applicant.skills}
                            </div>
                        </div>
                        ))}
                    </div>
                    :
                    <div className='noApplicantView'>
                        <div>
                            <FontAwesomeIcon style={{ fontSize: '80px', opacity: '.8'}} icon={faFileAlt} className='fa-lg'/>
                        </div>
                        <div className='noApplicationsInfoText'>
                            No applicantions available!
                        </div>
                    </div>
                    }
                </Dialog>
            </div>
        
    )
}

export default AllPostedJobs;
