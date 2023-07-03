import React, { Component } from 'react';
import './Welcome.scss';
import Button from '../../Components/Button';
import CompaniesTrustImage from '../../assets/img/companiesTrust.jpg';
import { motion } from 'framer-motion';
import APP_ROUTES from '../../Routes/appRoutes';
import { Helmet } from 'react-helmet-async';

export class Welcome extends Component {

    // componentDidMount() {
    //     document.title =  'MyJobs';
    // }


    
    render() {
        return (
            <div className="welcomeComponent">
                <Helmet><title>MyJobs</title></Helmet>
                <div className="container">
                <div className='welcomeContentContainer'>
                    <div className='leftSideContent'>
                        <div className='welcomeTextContainer'>
                            <div>Welcome to</div>
                            <div>My<span className='jobsTextLarge'>Jobs</span></div>
                        </div>
                        <div className='getStartedButtonWrapper'>
                            <Button
                                label='Get Started'
                                onClick={() => {this.props.history.push(APP_ROUTES.PUBLIC.ROUTES.SIGNUP)}}
                                style={{
                                    color: 'white',
                                    backgroundColor: '#43AFFF'
                                }}
                                cursor='pointer'
                            />
                        </div>
                    </div>
                    <div className='rightSideImage'>
                        <motion.img
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            src='https://picsum.photos/622/395' alt='welcome'/>
                    </div>
                </div>
                <div className='welcomePageContent'>
                    <div className='whyUsContentContainer'>
                        <div className='whyUsHeading'>Why Us</div>
                        <div className='whyUseCardsContainer'>
                            <div className='whyUsCard'>
                                <div>Get More<br/>Visibility</div>
                                <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</div>
                            </div>
                            <div className='whyUsCard'>
                                <div>Organize Your<br/>Candidates</div>
                                <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</div>
                            </div>
                            <div className='whyUsCard'>
                                <div>Verify their<br/>Abilities</div>
                                <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</div>
                            </div>
                        </div>
                    </div>
                    <div className='companiesTrust'>
                        <div className='companiesTrustHeading'>Companies Who Trust Us</div>
                        <div className='companiesTrustImageContainer'>
                            <img src={CompaniesTrustImage} alt='companies trust'></img>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Welcome;
