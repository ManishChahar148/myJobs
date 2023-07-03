import { combineReducers } from 'redux';
import auth from './auth/reducer';
import jobs from './jobs/reducer';

const rootReducer = combineReducers({
    auth,
    jobs,
});

export default rootReducer;
