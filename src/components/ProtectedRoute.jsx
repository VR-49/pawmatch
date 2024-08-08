import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    return <Route path={props.path} element={props.element}/>
};

export default ProtectedRoute;