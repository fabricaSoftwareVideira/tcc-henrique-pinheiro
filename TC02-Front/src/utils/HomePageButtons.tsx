import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { roles } from '@/config/RoleRoutes';
import { DefaultWarning } from './DefaultWarning';

export const HomePageButtons: React.FC = () => {
	const navigate = useNavigate();
	const { role, loading } = useAuth();

	if (loading) {
		return <DefaultWarning message='Carregando, Aguarde' />;
	}

	const buttons = [
		roles.CREATE_USER_ROLES.includes(role ?? '') && (
			<Button
				className='w-full max-w-[250px] h-[60px] py-4 rounded bg-green-600 text-primary-foreground text-center'
				onClick={() => navigate('/cadastrarUsuario')}
				key='cadastrarUsuario'>
				Cadastrar Usuários
			</Button>
		),
		roles.LIST_USERS_ROLES.includes(role ?? '') && (
			<Button
				className='w-full max-w-[250px] h-[60px] py-4 rounded bg-green-600 text-primary-foreground text-center'
				onClick={() => navigate('/usuarios')}
				key='consultarUsuarios'>
				Consultar Usuários
			</Button>
		),
		roles.CREATE_EVENT_ROLES.includes(role ?? '') && (
			<Button
				className='w-full max-w-[250px] h-[60px] py-4 rounded bg-green-600 text-primary-foreground text-center'
				onClick={() => navigate('/cadastrarEvento')}
				key='cadastrarEvento'>
				Cadastrar Eventos
			</Button>
		),
		roles.FETCH_ALL_EVENTS.includes(role ?? '') && (
			<Button
				className='w-full max-w-[250px] h-[60px] py-4 rounded bg-green-600 text-primary-foreground text-center'
				onClick={() => navigate('/eventos')}
				key='gerenciarEventos'>
				Gerenciar Eventos
			</Button>
		),
	].filter(Boolean);

	return <div className='w-full flex flex-wrap justify-center gap-6 px-2'>{buttons}</div>;
};
