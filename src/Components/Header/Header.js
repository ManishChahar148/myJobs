import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import './Header.scss';
import { dispatchWrap } from '../../Utils/utility';
import { 
    HIDE_LOGOUT_BUTTON,
    SHOW_LOGOUT_BUTTON,
    LOGOUT_USER,
} from '../../Redux/auth/actionTypes'
import APP_ROUTES from '../../Routes/appRoutes';

class Header extends Component {

    handleLogoutCaretClick = () => {
        const {
            isLogoutChipVisible,
            enableLogoutButton,
            hideLogoutButton,
        } = this.props;    
        if(isLogoutChipVisible) hideLogoutButton();
        else enableLogoutButton();
    }



    shouldHighlightHeaderButton = () => {
        const { currentPath } = this.props;
        if(!currentPath) return false;
        return (currentPath === APP_ROUTES.CANDIDATE.ROUTES.APPLIED_JOBS || currentPath === APP_ROUTES.RECRUITER.ROUTES.POST_JOBS);
    }
    
    render() {
        const {
            userInfo,
            isLoggedIn,
            isLogoutChipVisible,
            signOutUser,
        } = this.props;


        const headerButtonHighlight = this.shouldHighlightHeaderButton();
        return (
                <div className="headerComponent">
                    <div className="headerBody container">
                        <Link to={APP_ROUTES.PUBLIC.DEFAULT_PATH} className='myJobTitle'>
                            My<span className='jobsText'>Jobs</span>
                        </Link>
                        {isLoggedIn ?
                        <div className='authenticatedUserFeatures'>
                            <Link
                                to={userInfo?.userRole === 0 ? APP_ROUTES.RECRUITER.ROUTES.POST_JOBS : APP_ROUTES.CANDIDATE.ROUTES.APPLIED_JOBS}
                                className='postJobButtonHeader'
                            >
                                {userInfo?.userRole === 0 ? 'Post a Job' : 'Applied Jobs'}
                                {headerButtonHighlight &&
                                    <span style={{
                                    position: 'absolute',
                                    height: '5px',
                                    width: '50px',
                                    left: 15,
                                    top: '40px',
                                    backgroundColor: '#43AFFF',
                                    }}></span>
                                }
                            </Link>
                            <div className='userProfilePic'>
                                {userInfo && userInfo.name.slice(0,1)}
                            </div>
                            <div className='headerCaretDown'
                                onClick={this.handleLogoutCaretClick}
                            >
                                <FontAwesomeIcon icon={faCaretDown} className='fa-lg'/>
                                {isLogoutChipVisible && 
                                    <span onClick={signOutUser}  className='logoutButton'>
                                        Logout
                                    </span>
                                }
                            </div>
                        </div>
                        :
                        <div className='loginSignupButtonWrapper'>
                            <Link to='/login'>
                                Login
                            </Link>
                            /
                            <Link to='/register'>
                                Signup
                            </Link>
                        </div>
                        }
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    isLogoutChipVisible: state.auth.isLogoutChipVisible,
    userInfo: state.auth.userInfo,
    currentPath: window.location.pathname,
  });
  
const mapDispatchToProps = (dispatch) => ({
    signOutUser: (email, password) => {
      dispatchWrap(dispatch, LOGOUT_USER);
  },
  enableLogoutButton: () => {
      dispatchWrap(dispatch, SHOW_LOGOUT_BUTTON);
  },
  hideLogoutButton: () => {
    dispatchWrap(dispatch, HIDE_LOGOUT_BUTTON);
},
});

export default connect(mapStateToProps, mapDispatchToProps) (Header);
