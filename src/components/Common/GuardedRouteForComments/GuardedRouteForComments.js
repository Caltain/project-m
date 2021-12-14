import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

const GuardedRouteForComments = () => {
    const { user } = useAuthContext();
   
    return user.email==="peter@abv.bg" ? <Outlet /> : <Navigate to="/" />
}

export default GuardedRouteForComments;