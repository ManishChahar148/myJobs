import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import  'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './Pages/Welcome';
import Header from './Components/Header';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import CandidateAllJobs from './Pages/Candidate/CandidateAllJobs';
import AppliedJobs from './Pages/Candidate/AppliedJobs';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
import NotFound404 from './Pages/NotFound404';
import APP_ROUTES from './Routes/appRoutes';
import PostJob from './Pages/Recruiter/PostJob';
import AllPostedJobs from './Pages/Recruiter/AllPostedJobs';

function App() {
  const {
    RECRUITER,
    CANDIDATE,
    PUBLIC
  } = APP_ROUTES;

  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
            <PublicRoute path={PUBLIC.ROUTES.WELCOME} component={Welcome} exact/>
            <PublicRoute path={PUBLIC.ROUTES.LOGIN} component={Login} exact/>
            <PublicRoute path={PUBLIC.ROUTES.SIGNUP} component={Signup} exact/>
            <PublicRoute path={PUBLIC.ROUTES.FORGOT_PASSWORD} component={ForgotPassword} exact/>
            <PublicRoute path={PUBLIC.ROUTES.RESET_PASSWORD} component={ResetPassword} exact/>

            <ProtectedRoute path={CANDIDATE.ROUTES.HOME} component={CandidateAllJobs} exact />
            <ProtectedRoute path={CANDIDATE.ROUTES.APPLIED_JOBS} component={AppliedJobs} exact />
            
            <ProtectedRoute path={RECRUITER.ROUTES.HOME} component={AllPostedJobs} exact/>
            <ProtectedRoute path={RECRUITER.ROUTES.POST_JOBS} component={PostJob} exact/>     

            <Route path='/*' component={NotFound404}/>
          </Switch>
      </Router>


    </div>
  );
}

export default App;
