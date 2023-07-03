import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormCard from '../../Components/FormCard';
import TextInput from '../../Components/TextInput';
import Button from '../../Components/Button';
import { Redirect } from 'react-router-dom';
import APP_ROUTES from '../../Routes/appRoutes';
import Loader from '../../Components/Loader';
import {
    GET_PASSWORD_RESET_TOKEN,
    AUTH_REDUCER_STATE_RESETTER,
} from '../../Redux/auth/actionTypes';
import './ForgotPassword.scss';
import { dispatchWrap } from '../../Utils/utility';
import { Helmet } from 'react-helmet-async';

class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        this.state={
            email: '',
            emailError: '',
        }
    }

    componentDidMount() {
        const {
            authStateResetter,
        } = this.props;
        authStateResetter({ emailNotFoundWhileFetchingResetToken: '' });
    }

    handleEmailSubmit = (e) => {
        e.preventDefault();
        const {
            getPasswordResetToken,
        } = this.props;
        const {
            email,
        } = this.state;

        if(email === '') {
            this.setState({
                emailError: 'This field is mandatory',
            });
            return;
        } else {
            this.setState({
                emailError: '',
            });
        }

        getPasswordResetToken(email)
    }


    render() {

        const {
            resetPasswordData,
            isFetchingResetToken,
            emailNotFoundError,
            authStateResetter,
        } = this.props;

        const {
            email,
            emailError,
        } = this.state;

        if(resetPasswordData && resetPasswordData.token) {
            return <Redirect to={APP_ROUTES.PUBLIC.ROUTES.RESET_PASSWORD} />
        }

        return (
            <div className='forgotPasswordComponent'>
                <Helmet><title>Forgot Password</title></Helmet>
                <Loader isLoading={isFetchingResetToken} />
                <FormCard
                        heading={'Forgot your password?'}
                    >
                        <div className='forgotPasswordInfo'>
                            Enter the email associated with your account and we'll send you
                            instructions to reset your password.
                        </div>
                        <div className = 'formContainerForgetPassword'>
                            <form onSubmit={this.handleEmailSubmit}>
                                <TextInput
                                    value={email}
                                    label={'Email address'}
                                    placeholder={'Enter your email'}
                                    isMandatory={true}
                                    autoFocus={true}
                                    onChange={(e) => {
                                        this.setState({ email: e.target.value });
                                        this.setState({ emailError: '' })
                                        authStateResetter({ emailNotFoundWhileFetchingResetToken: '' });
                                    }}
                                    errorMessage={emailError || emailNotFoundError}
                                />         
                                <div className='submitButtonForgetComponentContainer'>
                                    <Button
                                        label={' Submit '}
                                        cursor={'pointer'}
                                        onClick={this.handleEmailSubmit}
                                        type='submit'
                                    />
                                </div>                      
                            </form>
                            
                        </div>
                    </FormCard>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    resetPasswordData: state.auth.resetPasswordData,
    isFetchingResetToken: state.auth.isFetchingResetToken,
    emailNotFoundError: state.auth.emailNotFoundWhileFetchingResetToken, 
  });
  
const mapDispatchToProps = (dispatch) => ({
    getPasswordResetToken: (email) => {
      dispatchWrap(dispatch, GET_PASSWORD_RESET_TOKEN, { email: email });
    },
    authStateResetter: (propertiesToReset) => {
        dispatchWrap(dispatch, AUTH_REDUCER_STATE_RESETTER, propertiesToReset);
    },
});

export default connect(mapStateToProps, mapDispatchToProps) (ForgotPassword);
