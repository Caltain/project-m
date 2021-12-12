import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const GuardedRoute = () => {
    const { user } = useAuthContext();
   
    return user._id ? <Outlet /> : <Navigate to="/login" />
}

export default GuardedRoute;