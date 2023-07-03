import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import APP_ROUTES from '../../Routes/appRoutes';
import { useSelector } from 'react-redux';

function PublicRoute({ path, ...rest }) {
    const auth = useSelector(state => state.auth);
    const isLoggedIn = auth.isLoggedIn;
    const role = auth?.userInfo?.userRole;    
    const defaultRoute = APP_ROUTES[Object.keys(APP_ROUTES)[role]]?.DEFAULT_PATH;
    const publicRoutes = Object.values(APP_ROUTES.PUBLIC.ROUTES);

    if (isLoggedIn) {
        return <Redirect to={defaultRoute} />
    } else {
        const isPublicRoute = publicRoutes.indexOf(path) !== -1;
        return isPublicRoute ? <Route {...rest} /> : <Redirect to='/' />
    }
    
}

export default PublicRoute;
