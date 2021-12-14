import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNotificationContext,types } from '../../../contexts/NotificationContext';

const GuardedRouteForComments = () => {
    const { user } = useAuthContext();
  const { addNotification } = useNotificationContext();

  addNotification('You cannot do that! You are not the admin!', types.alert)
   
    return user.email==="peter@abv.bg" ? <Outlet /> : <Navigate to="/" />
}

export default GuardedRouteForComments;