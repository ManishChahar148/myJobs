import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import validator from 'validator';
import FormCard from '../../Components/FormCard';
import Button from '../../Components/Button';
import TextInput from '../../Components/TextInput';
import Loader from '../../Components/Loader';
import {
    RESET_USER_ALREADY_REGISTERED_ERROR,
    SIGNUP_USER,
} from '../../Redux/auth/actionTypes';
import APP_ROUTES from '../../Routes/appRoutes';
import './Signup.scss';
import { Helmet } from 'react-helmet-async';

export class Signup extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            role: 1,
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            skills: '',
            passwordErr: '',
            nameError: '',
            emailError: '',
            skillsError: '',
        }
        this.disabledRoleStyles = {
            backgroundColor: 'white',
            color: '#303F60',
            border: '2px solid lightgray',
        }
    }


    changeRole(role) {
        this.setState({ role: role });
    }

    isValidData = () => {
        const {
            password,
            confirmPassword,
            name,
            email,
            skills,
        } = this.state;

        let isPasswordMatchErr = false;
        let isPasswordEmptyError = false;
        let isPasswordLengthError = false;
        let isNameError = false;
        let isNameLengthError = false;
        let isNameAlphaError = false;
        let isEmailError = false;
        let validEmailError = false;
        let isSkillsError = false;
        let isSkillsLengthError = false;

        if(password !== confirmPassword) isPasswordMatchErr = true;
        if(password === '' && confirmPassword === '') isPasswordEmptyError = true;
        if(password && password.length < 6) isPasswordLengthError = true;
        if(name === '') isNameError = true;
        if(name && name.length < 3) isNameLengthError = true;
        if(name && !validator.isAlpha(name)) isNameAlphaError = true;
        if(email === '') isEmailError = true;
        if(!validator.isEmail(email)) validEmailError = true;
        if(skills === '') isSkillsError = true;
        if(skills && skills.length < 3 ) isSkillsLengthError = true;

        this.setState({
            passwordErr: isPasswordEmptyError ?
                'This field is mandatory.'
                :
                isPasswordMatchErr ?
                    'Password & confirm password should be same.'
                    :
                    isPasswordLengthError ?
                        'Atleast 6 characters are required.'
                        :
                        '',
            nameError: isNameError ?
                'This field is mandatory.'
                :
                isNameLengthError ?
                    'Atleast 3 characters are required.'
                    :
                    isNameAlphaError ?
                        'Name cannot have special characters and numbers.'
                        :
                        '',
            emailError: isEmailError ? 'This field is mandatory.' : validEmailError ? 'Invalid email address.' : '',
            skillsError: isSkillsError ? 'This field is mandatory.' : isSkillsLengthError ? 'Atleast 3 characters are required.' : '',
        })

        if(
            isEmailError ||
            isNameError ||
            isNameLengthError ||
            isPasswordMatchErr ||
            isPasswordEmptyError ||
            isPasswordLengthError ||
            validEmailError ||
            isSkillsError ||
            isSkillsLengthError
        ) {
            return false;
        }
        
        return true;
    }

    handleSignup = (e) => {
        e.preventDefault();
        if(!this.isValidData()) return;

        const {
            email,
            password,
            name,
            confirmPassword,
            skills,
            role,
        } = this.state;

        const {
            signupUser,
        } = this.props;

        const userData = {
            email,
            name,
            password,
            confirmPassword,
            skills,
            userRole: role,
        };

        signupUser(userData);
        
    }
    

    render() {
        const {
            history,
            userAlreadyRegisteredError,
            resetUserAlreadyRegisteredError,
            isLoading,
        } = this.props;

        const {
            role,
            email,
            password,
            name,
            confirmPassword,
            emailError,
            nameError,
            passwordErr,
            skills,
            skillsError,
        } = this.state;


        return (
            <div className='signupComponent'>
                <Helmet><title>Signup</title></Helmet>
                <Loader isLoading={isLoading} loaderMessage={'Signing in please wait...'}/>
                <FormCard
                        heading={'Signup'}
                    >
                        <div className='IAmAContainer'>
                            <div className='iAmAText'>I'm a* <span className='roleDisplayOnSmallScreen'>{role=== 0 ? 'Student' : 'Recruiter'}</span></div>
                            <div className='iAmButtons'>
                                <Button
                                    label={<span><FontAwesomeIcon style={{ marginRight: '10px' }} color={role=== 0 ? '#EDF6FF' : '#43AFFF'} icon={faUser} className='fa-lg'/><span className='iAmButtonsLabelText'>Recruiter</span></span>}
                                    cursor={'pointer'}                                    
                                    type='submit'
                                    onClick={() => {this.changeRole(0)}}
                                    style={{
                                        marginRight: '20px',
                                        minWidth: '10px',
                                        ...(role !== 0 && this.disabledRoleStyles)
                                    }}
                                />
                                <Button
                                    label={<span><FontAwesomeIcon style={{ marginRight: '10px' }} color={role=== 1 ? '#EDF6FF' : '#43AFFF'} icon={faUsers} className='fa-lg'/><span className='iAmButtonsLabelText'>Candidate</span></span>}
                                    cursor={'pointer'}
                                    type='submit'
                                    onClick={() => {this.changeRole(1)}}
                                    style={{
                                        minWidth: '10px',
                                        transition: '.5s',
                                        ...(role !== 1 && this.disabledRoleStyles)
                                    }}
                                />
                            </div>
                        </div>
                        <div className = 'formContainer'>
                            <form onSubmit={this.handleSignup}>
                                <TextInput
                                    value={name}
                                    label={'Full name'}
                                    isMandatory={true}
                                    placeholder={'Enter your full name'}
                                    autoFocus={true}
                                    errorMessage={nameError}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        this.setState({ name });
                                        if(name && name.length >= 3) this.setState({ nameError: ''});
                                        // if(name && name.length < 3) this.setState({ nameError: 'Atleast 3 characters are required.' });
                                        // if(!name) this.setState({ nameError: 'This field is mandatory.' });
                                    }}
                                />
                                <TextInput
                                    value={email}
                                    label={'Email address'}
                                    isMandatory={true}
                                    placeholder={'Enter your email'}
                                    autoFocus={false}
                                    errorMessage={emailError ? emailError : userAlreadyRegisteredError}
                                    onChange={(e) => {
                                        const email = e.target.value;
                                        if(userAlreadyRegisteredError){
                                            resetUserAlreadyRegisteredError();
                                        }
                                        this.setState({ email });
                                        if(email && validator.isEmail(email)) {
                                            this.setState({ emailError : '' });
                                        }
                                    }}
                                />
                                <div className='passwordContainerSignup'>
                                    <TextInput
                                        value={password}
                                        label={'Create Password'}
                                        isMandatory={true}
                                        placeholder={'Enter your password'}
                                        type='password'
                                        onChange={(e) => {
                                            this.setState({ password: e.target.value })
                                            this.setState({ passwordErr: '' })
                                        }}
                                        errorMessage={passwordErr}
                                        shouldHideErrorMessage={true}
                                    />
                                    <TextInput
                                        value={confirmPassword}
                                        label={'Confirm Password'}
                                        isMandatory={true}
                                        placeholder={'Enter your password'}
                                        type='password'
                                        onChange={(e) => {
                                            this.setState({ confirmPassword: e.target.value });
                                            this.setState({ passwordErr: '' })
                                        }}
                                        errorMessage={passwordErr}
                                    />
                                </div>
                                <TextInput
                                    value={skills}
                                    label={role===0 ? 'Organization' : 'Skills'}
                                    isMandatory={true}
                                    errorMessage={skillsError}
                                    placeholder={role===0 ? 'Enter organization name' : 'Enter comma seperated skills'}
                                    onChange={(e) => {this.setState({ skills: e.target.value })}}
                                />
                                <div className='signupButtonContainer'>
                                    <Button
                                        label={'Signup'}
                                        cursor={'pointer'}
                                        onClick={this.handleSignup}
                                        type='submit'
                                    />
                                </div>
                            </form>
                            
                        </div>
                        <div className='bottomTextSignupFormContainer'>
                            Have an account?
                            <span
                                className='createAnAccountTextSignupForm'
                                onClick={() => {history && history.push(APP_ROUTES.PUBLIC.ROUTES.LOGIN)}}
                            >
                                Login
                            </span>
                        </div>
                    </FormCard>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.auth.isLoading,
    userAlreadyRegisteredError: state.auth.userAlreadyRegisteredError,  
  });
  
const mapDispatchToProps = (dispatch) => ({
    signupUser: (userData) => {
      dispatch({ type: SIGNUP_USER, payload: userData });
  },
  resetUserAlreadyRegisteredError: ()=> {
      dispatch({ type: RESET_USER_ALREADY_REGISTERED_ERROR })
  }
});

export default connect(mapStateToProps, mapDispatchToProps) (Signup);
