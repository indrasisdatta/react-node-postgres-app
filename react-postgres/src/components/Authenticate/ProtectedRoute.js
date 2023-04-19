import React from 'react'
import { useSelector } from 'react-redux';
import { 
    Navigate, 
    Outlet, 
    useLocation 
} from 'react-router-dom';

const ProtectedRoute = ({ redirectPath = "/login" }) => {
    const authState = useSelector(state => state.auth.authUser);
    const location = useLocation();
    if (!authState.token) {
        return <Navigate to={redirectPath} replace state={{from: location}} />
    }
    return <Outlet />
}

export default ProtectedRoute
