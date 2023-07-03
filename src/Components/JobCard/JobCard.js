import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './JobCard.scss';

class JobCard extends Component {
    render() {
        const {
            job,
            onButtonClick,
            buttonLabel,
            hideButton,
        } = this.props;
        return (
            <div className='jobCard'>
                <div>
                    <div className='jobTitle'>{job.title}</div>
                    <div className='jobDescription'>{job.description}</div>
                </div>
                <div className='jobCardActions'>
                    <div data-location={job.location} className='jobLocation'><FontAwesomeIcon color={'#43afff'} style={{ marginRight: '10px' }} icon={faMapMarkerAlt} className='fa-lg'/>{job.location}</div>
                    {!hideButton && <div className='viewApplicationButtonContainer'>
                        <button onClick={() => {onButtonClick(job.id)}}>{buttonLabel}</button>
                    </div>}
                </div>
            </div>
        )
    }
}

export default JobCard;
