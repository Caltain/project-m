import {useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useEffect } from 'react';
import { useNotificationContext,types } from '../../contexts/NotificationContext';

const Logout = () => {
    const navigate = useNavigate();
  const { addNotification } = useNotificationContext();

    const { user, logout } = useContext(AuthContext);
    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                addNotification('Successfull logout!', types.success)
                logout();
                navigate('/');
            })
    }, [addNotification,user,logout,navigate])

    return null;
};

export default Logout;