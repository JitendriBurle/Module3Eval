import {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, role } = useContext(AuthContext);

    if (!isAuthenticated) return <Navigate to="/" />;
    if(role !== allowedRole) return <Navigate to="/" />;

    return children;
};

export default ProtectedRoute;