import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import PropTypes from 'prop-types';

export const PrivateRoute = ({ 
    isAuthenticated,
    redirection,
    component: Component,
    ...rest
}) => {
    localStorage.setItem('lastPath', rest.location.pathname + rest.location.search );
    
    return (
        <Route {...rest} 
            component={ props => 
                (isAuthenticated ? <Component {...props} /> : <Redirect to={ redirection } />) 
            }
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
    redirection: PropTypes.string.isRequired
}