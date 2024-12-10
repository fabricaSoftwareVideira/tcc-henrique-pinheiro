// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
	studentCpf: string | null;
	isAuthenticated: boolean;
	setStudentCpf: (cpf: string) => void;
	logout: () => void;
	loading: boolean; // Adicionando `loading` novamente
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [studentCpf, setStudentCpfState] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const setStudentCpf = (cpf: string | null) => {
		setStudentCpfState(cpf);
		if (cpf) {
			localStorage.setItem('studentCpf', cpf);
		} else {
			localStorage.removeItem('studentCpf');
		}
	};

	useEffect(() => {
		const savedCpf = localStorage.getItem('studentCpf');
		if (savedCpf) {
			setStudentCpfState(savedCpf);
		} else {
		}
		setLoading(false); // Define `loading` como false após a verificação
	}, []);

	const isAuthenticated = !!studentCpf;

	const logout = () => {
		setStudentCpf(null);
	};

	return (
		<AuthContext.Provider
			value={{ studentCpf, isAuthenticated, setStudentCpf, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider');
	}
	return context;
};
