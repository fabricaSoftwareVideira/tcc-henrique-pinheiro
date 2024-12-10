import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { login as loginService } from '@/services/login/loginService';

interface AuthContextData {
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	isAccessTokenValid: () => boolean;
	loading: boolean;
	role?: string;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [role, setRole] = useState<string | undefined>(undefined);

	useEffect(() => {
		const storedAccessTokenExpiresAt = localStorage.getItem('accessTokenExpiresAt');
		const storedRole = localStorage.getItem('role');

		if (storedAccessTokenExpiresAt && storedRole) {
			const accessTokenExpiresAt = new Date(storedAccessTokenExpiresAt);
			const isTokenValid = accessTokenExpiresAt > new Date();
			if (isTokenValid) {
				setIsAuthenticated(true);
				setRole(storedRole);
			} else {
				logout();
			}
		}
		setLoading(false);
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const data = await loginService(email, password);
			localStorage.setItem('userEmail', email);
			localStorage.setItem('role', data.user.role.roleTitle);
			localStorage.setItem('accessTokenExpiresAt', data.accessTokenExpiration);
			setRole(data.user.role.roleTitle);
				setIsAuthenticated(true);
		} catch (error) {
			setIsAuthenticated(false);
			throw error;
		}
	};

	const logout = () => {
		localStorage.removeItem('accessTokenExpiresAt');
		localStorage.removeItem('role');
		setIsAuthenticated(false);
		setRole(undefined);
	};

	const isAccessTokenValid = (): boolean => {
		const accessTokenExpiresAt = localStorage.getItem('accessTokenExpiresAt');
		if (accessTokenExpiresAt) {
			return new Date(accessTokenExpiresAt) > new Date();
		}
		return false;
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				login,
				logout,
				isAccessTokenValid,
				loading,
				role,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
