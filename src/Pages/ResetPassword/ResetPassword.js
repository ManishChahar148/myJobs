import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormCard from '../../Components/FormCard';
import TextInput from '../../Components/TextInput';
import Button from '../../Components/Button';
import  APP_ROUTES from '../../Routes/appRoutes';
import { dispatchWrap } from '../../Utils/utility';
import { 
    CLEAR_PASSWORD_RESET_DATA,
    RESET_PASSWORD,
    AUTH_REDUCER_STATE_RESETTER,
} from '../../Redux/auth/actionTypes';
import Loader from '../../Components/Loader';
import './ResetPassword.scss';
import { Helmet } from 'react-helmet-async';

class ResetPassword extends Component {

    constructor(props){
        super(props)
        this.state = {
            password: '',
            confirmPassword: '',
            errorMessage: '',
        }
    }

    componentDidMount() {
        const {
            authStateResetter,
        } = this.props;
        authStateResetter({ resetPasswordSameAsPrevError: '' });
        
    }


    componentWillUnmount() {
        const {
            clearPasswordResetData,
        } = this.props;
        clearPasswordResetData();
    }

    handlePasswordReset = (e) => {
        e.preventDefault();
        const {
            password,
            confirmPassword,
        } = this.state;

        const {
            resetPassword,
        } = this.props;

        if(!password) {
            this.setState({
                errorMessage: 'Password is mandatory'
            });
            return;
        }
        else if (password?.length < 6) {
            this.setState({
                errorMessage: 'Password should have at least 6 characters',
            });
            return;
        }
        else if(password !== confirmPassword) {
            this.setState({
                errorMessage: 'Password and confirm password should be same.'
            });
            return;
        } else {
            this.setState({
                errorMessage: '',
            });
        }

        resetPassword(password, confirmPassword)
    }

    render() {

        const{
            password,
            confirmPassword,
            errorMessage,
        } = this.state;

        const { 
            resetPasswordData,
            isResettingPassword,
            resetPasswordSameAsPrevError,
            authStateResetter,
        } = this.props;

        if(!resetPasswordData || Object.keys(resetPasswordData).length === 0) {
            return <Redirect to={APP_ROUTES.PUBLIC.ROUTES.LOGIN} />
        }

        return (
            <div className='resetPasswordComponent'>
                <Helmet><title>Reset Password</title></Helmet>
                <Loader isLoading={isResettingPassword} />
                <FormCard
                        heading={'Reset Your Password?'}
                    >
                        <div className='forgotPasswordInfo'>
                            Enter your new password below.
                        </div>
                        <div className = 'formContainerResetPassword'>
                            <form onSubmit={this.handlePasswordReset}>
                                <TextInput
                                    value={password}
                                    type={'password'}
                                    label={'New password'}
                                    placeholder={'Enter your password'}
                                    autoFocus={true}
                                    errorMessage={errorMessage || resetPasswordSameAsPrevError}
                                    isMandatory={true}
                                    shouldHideErrorMessage={true}
                                    onChange={(e) => {
                                        this.setState({ password: e.target.value })
                                        this.setState({ errorMessage: '' })
                                        authStateResetter({ resetPasswordSameAsPrevError: '' });
                                    }}
                                />
                                <TextInput
                                    value={confirmPassword}
                                    type={'password'}
                                    label={'Confirm New password'}
                                    placeholder={'Enter your password'}
                                    errorMessage={errorMessage || resetPasswordSameAsPrevError}
                                    isMandatory={true}
                                    onChange={(e) => {
                                        this.setState({ confirmPassword: e.target.value })
                                        this.setState({ errorMessage: '' })
                                        authStateResetter({ resetPasswordSameAsPrevError: '' });
                                    }}
                                /> 
                                <div className='submitButtonResetComponentContainer'>
                                    <Button
                                        label={' Reset '}
                                        cursor={'pointer'}
                                        onClick={this.handlePasswordReset}
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
    isResettingPassword: state.auth.isResettingPassword,
    resetPasswordSameAsPrevError: state.auth.resetPasswordSameAsPrevError,
  });
  
const mapDispatchToProps = (dispatch) => ({
    resetPassword: (password, confirmPassword) => {
      dispatchWrap(dispatch, RESET_PASSWORD, { password, confirmPassword });
    },
    clearPasswordResetData: () => {
        dispatchWrap(dispatch, CLEAR_PASSWORD_RESET_DATA);
    },
    authStateResetter: (resetValue) => {
        dispatchWrap(dispatch, AUTH_REDUCER_STATE_RESETTER, resetValue)
    }
});

export default connect(mapStateToProps, mapDispatchToProps) (ResetPassword);
