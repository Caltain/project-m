import {useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import * as authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';
import { useNotificationContext,types } from '../../contexts/NotificationContext';

const Logout = () => {
    const navigate = useNavigate();
  const { addNotification } = useNotificationContext();

    const { user, logout } = useContext(AuthContext);
    //Handles the logout of the user
    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                addNotification('Successfull logout!', types.info)
                logout();
                navigate('/');
            })
    }, [addNotification,user,logout,navigate])

    return null;
};

export default Logout;