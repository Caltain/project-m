import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const GuardedRoute = () => {
    const { user } = useAuthContext();
    console.log(user);
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default GuardedRoute;