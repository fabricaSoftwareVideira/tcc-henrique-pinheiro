// components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
	element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
	const { isAuthenticated, loading } = useAuth();


	if (loading) {
		return null;
	}

	return isAuthenticated ? element : <Navigate to='/login' replace />;
};

export default PrivateRoute;
