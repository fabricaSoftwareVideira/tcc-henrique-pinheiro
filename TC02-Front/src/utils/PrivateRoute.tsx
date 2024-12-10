import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
	roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
	const { isAuthenticated, isAccessTokenValid, loading, role } = useAuth();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated || !isAccessTokenValid()) {
		return <Navigate to='/login' />;
	}

	if (roles && !roles.includes(role!)) {
		return <Navigate to='/unauthorized' />;
	}

	return <Outlet />;
};

export default PrivateRoute;
