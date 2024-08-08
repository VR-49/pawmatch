import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    console.log(props);
    fetch('/api/auth/verify', {
        method: 'GET',
    })
    .then(result => result.json())
    .then(response => {
        //console.log(response);
        if(response === 'valid'){
            //console.log('valid');
            props.setAuth(response);
        }
        else if(response === 'expired'){
            //console.log('expired');
            props.setAuth(response);
        }
        else if(response === 'invalid'){
            //console.log('invalid');
            props.setAuth(response);
        }
    })
    .catch(err => {
        console.log('error in getting authentication' + err);
    });
    console.log(props.auth);
    if(props.auth === 'valid'){
        return <Navigate to="/profile" />;
    }
    else if(props.auth === 'expired'){
        return <Navigate to="/login" />;
    }
    else if(props.auth === 'invalid'){
        return <Navigate to="/login" />;
    }
    else{
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;