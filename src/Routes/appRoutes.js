const APP_ROUTES = {
    RECRUITER: {
        DEFAULT_PATH: '/recruiter/home',
        ROUTES: {
            HOME: '/recruiter/home',
            POST_JOBS: '/recruiter/jobs/post',
        }
        
    },
    CANDIDATE: {
        DEFAULT_PATH: '/candidate/home',
        ROUTES: {
            HOME: '/candidate/home',
            APPLIED_JOBS: '/candidate/jobs/applied',
        },
    },
    PUBLIC: {
        DEFAULT_PATH: '/',
        ROUTES: {
            WELCOME: '/',
            LOGIN: '/login',
            SIGNUP: '/register',
            FORGOT_PASSWORD: '/password/forgot',
            RESET_PASSWORD: '/password/reset',
        },
    },
};

export default APP_ROUTES;