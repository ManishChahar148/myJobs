import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import APP_ROUTES from '../../Routes/appRoutes';
import { useSelector } from 'react-redux';

function ProtectedRoute({ ...rest }) {
    const auth = useSelector(state => state.auth);
    const isLoggedIn = auth.isLoggedIn;
    const role = auth?.userInfo?.userRole;
    const validRoutes = Object.values(APP_ROUTES[Object.keys(APP_ROUTES)[role]]?.ROUTES || {});

    if (isLoggedIn && validRoutes.indexOf(rest.path) !== -1) {
        return <Route {...rest}></Route>
    } else {
        return <Redirect to='/' />
    }
    
}

export default ProtectedRoute;
