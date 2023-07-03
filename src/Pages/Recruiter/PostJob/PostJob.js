import React, { useState } from 'react';
import './PostJob.scss';
import FormCard from '../../../Components/FormCard';
import TextInput from '../../../Components/TextInput';
import Button from '../../../Components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../Components/Loader';
import {
    POST_NEW_JOB,
} from '../../../Redux/jobs/actionTypes';
import { dispatchWrap } from '../../../Utils/utility';
import { Helmet } from 'react-helmet-async';

function PostJob({ history }) {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [location, setLocation] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [locationError, setLocationError] = useState('');

    const dispatch = useDispatch();

    const isPostingNewJob = useSelector(state => state.jobs.isPostingNewJob);


    const isValidData = () => {
        let isTitleError = false;
        let isDescError = false;
        let isLocationError = false;
        let isTitleLengthError = false;
        let isDescLengthError = false;
        let isLocationLengthError = false;

        if(jobTitle === '') isTitleError = true;
        if(jobDescription === '') isDescError = true;
        if(location === '') isLocationError = true;
        if(jobTitle && jobTitle.length < 3) isTitleLengthError = true;
        if(jobDescription && jobDescription.length < 3) isDescLengthError = true;
        if(location && location.length < 3) isLocationLengthError = true;

        isTitleError ? setTitleError('This field is mandatory') : isTitleLengthError ? setTitleError('Atleast 3 characters are required.') : setTitleError('');
        isDescError ? setDescriptionError('This field is mandatory') : isDescLengthError ? setDescriptionError('Atleast 3 characters are required.') : setDescriptionError('');
        isLocationError ? setLocationError('This field is mandatory') : isLocationLengthError ? setLocationError('Atleast 3 characters are required.') : setLocationError('');

        if (
            isTitleError ||
            isDescError ||
            isLocationError ||
            isTitleLengthError ||
            isDescLengthError ||
            isLocationLengthError
        ) {
            return false;
        }
        return true;

    }

    const handleCreateJob = (e) => {
        e.preventDefault();
        if(!isValidData()) return;

        const jobDetails = {
            title: jobTitle,
            description: jobDescription,
            location,
            history,
        };


        dispatchWrap(dispatch, POST_NEW_JOB, jobDetails);
    }



    return (
        <div className='postJobComponent'>
                <Helmet><title>Post a Job</title></Helmet>
                <Loader isLoading={isPostingNewJob} loaderMessage={'Posting job, Please wait...'} />
                <div className='container'>
                <div className='pathIndicator'>
                    <span style={{ cursor: 'pointer' }} onClick={() => { history && history.push('/')}}>
                        <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faHome} className='fa-lg'/>
                        Home
                    </span>
                    <FontAwesomeIcon style={{ marginRight: '10px', marginLeft: '10px' }} icon={faAngleRight} className='fa-lg'/> Post a Job
                </div>
                <div className='postJobComponentBody'>
                    <FormCard
                        heading={'Post a  Job'}
                    >
                        <div className = 'formContainer'>
                            <form 
                                onSubmit={handleCreateJob}
                            >
                                <TextInput
                                    value={jobTitle}
                                    label={'Job Title'}
                                    placeholder={'Enter job title'}
                                    autoFocus={true}
                                    errorMessage={titleError}
                                    isMandatory={true}
                                    // shouldHideErrorMessage={true}
                                    onChange={(e) => {
                                        setJobTitle( e.target.value );
                                        setTitleError('');
                                    }}
                                />
                                <TextInput
                                    value={jobDescription}
                                    label={'Description'}
                                    placeholder={'Enter job description'}
                                    textarea={true}
                                    errorMessage={descriptionError}
                                    isMandatory={true}
                                    // shouldHideErrorMessage={true}
                                    onChange={(e) => {
                                        setJobDescription( e.target.value );
                                        setDescriptionError('');
                                    }}
                                />
                                <TextInput
                                    value={location}
                                    label={'Location'}
                                    placeholder={'Enter location'}
                                    errorMessage={locationError}
                                    isMandatory={true}
                                    onChange={(e) => {
                                        setLocation( e.target.value );
                                        setLocationError('');
                                    }}
                                />
                                <div className='loginButtonContainer'>
                                    <Button
                                        label={'Post'}
                                        cursor={'pointer'}
                                        onClick={handleCreateJob}
                                        type='submit'
                                    />
                                </div>
                            </form>
                        </div>
                    </FormCard>
                </div>
                </div>
            </div>
    )
}

export default PostJob;
