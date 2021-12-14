import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext,types } from '../../contexts/NotificationContext';

const GuardedRoute = () => {
    const { user } = useAuthContext();
  const { addNotification } = useNotificationContext();
   
  addNotification('You cannot do that! You have to login first!', types.alert)
    return user._id ? <Outlet /> : <Navigate to="/login" />


}

export default GuardedRoute;