import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormCard from '../../Components/FormCard';
import TextInput from '../../Components/TextInput';
import Button from '../../Components/Button';
import { dispatchWrap } from '../../Utils/utility';
import {
    LOGIN_USER,
    RESET_LOGIN_ERROR,
} from '../../Redux/auth/actionTypes';
import APP_ROUTES from '../../Routes/appRoutes';
import Loader from '../../Components/Loader';
import {Helmet} from "react-helmet-async";
import './Login.scss';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
        };
    }

    componentDidMount() {
        const {
            resetLoginError,
        } = this.props;
        
        resetLoginError();
    }


    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
        });
        const {
            resetLoginError,
        } = this.props;
        resetLoginError();

        this.setState({
            emailError: '',
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        });
        const {
            resetLoginError,
        } = this.props;
        resetLoginError();
        this.setState({
            passwordError: '',
        });
    }

    isDataValid = (e) => {
        const {
            email,
            password,
        } = this.state;

        let isEmailError = false;
        let isPasswordError = false;

        if(!email) isEmailError = true;
        if(!password) isPasswordError = true;

        this.setState({
            emailError: isEmailError ? 'This field is mandatory.' : '',
            passwordError: isPasswordError ? 'This field is mandatory.' : '',
        });
        
        if(isEmailError || isPasswordError) return false;
        return true;
    }

    handleLogin = (e) => {
        e.preventDefault();
        if(!this.isDataValid()) return;
        const {
            loginUser,
            
        } = this.props;
        const {
            email,
            password,
        } = this.state;
        loginUser(email, password)
    }

    render() {

        const {
            history,
            isErrorWhileLogin,
            isLoading,
        } = this.props;

        const {
            email,
            password,
            emailError,
            passwordError,
        } = this.state;

        return (
            <div className="loginComponent">
                <Helmet><title>Login</title></Helmet>
                <Loader isLoading={isLoading} loaderMessage={'Logging in, Please wait...'} />
               <FormCard
                heading={'Login'}
               >
                   <div className='formContainer'>
                            <form onSubmit={this.handleLogin}>
                                <TextInput
                                    value={email}
                                    label={'Email address'}
                                    placeholder={'Enter your email'}
                                    autoFocus={true}
                                    onChange={this.handleEmailChange}
                                    isMandatory={true}
                                    shouldHideErrorMessage={emailError ? false : true}
                                    errorMessage={emailError || (isErrorWhileLogin ? 'Incorrect email or password' : '')}
                                />
                                <TextInput
                                    value={password}
                                    label={'Password'}
                                    placeholder={'Enter your password'}
                                    type='password'
                                    questionAlongLabel={'Forgot your password?'}
                                    history={history}
                                    onChange={this.handlePasswordChange}
                                    isMandatory={true}
                                    errorMessage={passwordError || (isErrorWhileLogin ? 'Incorrect email or password' : '')}
                                />
                                <div className='loginButtonContainer'>
                                    <Button
                                        label={'Login'}
                                        cursor={'pointer'}
                                        style={{
                                            backgroundColor: '#43AFFF'
                                        }}
                                        onClick={this.handleLogin}
                                        type='submit'
                                    />
                                </div>
                            </form>
                            
                        </div>
                        <div className='bottomTextLoginFormContainer'>
                            New to MyJobs?
                            <span
                                onClick={() => {history && history.push(APP_ROUTES.PUBLIC.ROUTES.SIGNUP)}}
                                className='createAnAccountTextLoginForm'
                            >
                                Create an account
                            </span>
                        </div>
               </FormCard>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    isErrorWhileLogin: state.auth.isErrorWhileLogin,
    isLoading: state.auth.isLoading,
    // showPasswordUpdatedToast: state.login.showPasswordUpdatedToast,
  });

const mapDispatchToProps = (dispatch) => ({
    loginUser: (email, password) => {
        dispatchWrap(dispatch, LOGIN_USER, { email, password });
    },
    // hidePasswordResetToast: () => {
    //     dispatch(hidePasswordResetToast());
    // },
    resetLoginError: () => {
        dispatchWrap(dispatch, RESET_LOGIN_ERROR);
    }
  });
  
  export default connect(mapStateToProps, mapDispatchToProps) (Login);
