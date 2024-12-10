import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { roles } from '@/config/RoleRoutes';

export const Header: React.FC = () => {
	const { logout, role, loading } = useAuth();
	const navigate = useNavigate();
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const [isEventMenuOpen, setIsEventMenuOpen] = useState(false);

	if (loading) {
		return null;
	}

	const mainButtonStyles =
		'flex items-center w-full bg-green-600 text-white hover:bg-gray-800 rounded-md px-4 py-2 my-2'; // Mantido 'my-2' para margens verticais no mobile
	const submenuContainerStyles =
		'absolute top-full left-0 bg-gray-700 shadow-md rounded-md p-2 w-full z-10'; // Garantindo submenu sobreposto
	const submenuItemStyles =
		'w-full py-2 cursor-pointer text-white bg-gray-700 hover:bg-gray-600 p-4 rounded';

	return (
		<header className='w-full p-4 g-gradient-to-l bg-green-300'>
			<div className='container mx-auto flex flex-col items-center md:flex-row md:justify-between md:items-center'>
				<div className='flex-shrink-0'>
					<a href='/admin/home'>
						<img
							src='/bannerIFC.png'
							alt='Banner IFC'
							className='h-16 w-auto object-contain'
						/>
					</a>
				</div>
				<div className='flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0 w-full md:w-auto'>
					{(roles.CREATE_USER_ROLES.includes(role ?? '') ||
						roles.LIST_USERS_ROLES.includes(role ?? '')) && (
						<div
							className='relative w-full md:w-auto'
							onMouseEnter={() => setIsUserMenuOpen(true)}
							onMouseLeave={() => setIsUserMenuOpen(false)}>
							<Button
								className={mainButtonStyles}
								onClick={() => setIsUserMenuOpen((prev) => !prev)}>
								Gerenciar Usuários
								<ChevronDown className='ml-2' />
							</Button>
							{isUserMenuOpen && (
								<div className={submenuContainerStyles}>
									{roles.CREATE_USER_ROLES.includes(role ?? '') && (
										<div
											className={submenuItemStyles}
											onClick={() => navigate('/cadastrarUsuario')}>
											Cadastrar Usuários
										</div>
									)}
									{roles.LIST_USERS_ROLES.includes(role ?? '') && (
										<div
											className={submenuItemStyles}
											onClick={() => navigate('/usuarios')}>
											Consultar Usuários
										</div>
									)}
								</div>
							)}
						</div>
					)}

					{(roles.CREATE_EVENT_ROLES.includes(role ?? '') ||
						roles.FETCH_ALL_EVENTS.includes(role ?? '')) && (
						<div
							className='relative w-full md:w-auto'
							onMouseEnter={() => setIsEventMenuOpen(true)}
							onMouseLeave={() => setIsEventMenuOpen(false)}>
							<Button
								className={mainButtonStyles}
								onClick={() => setIsEventMenuOpen((prev) => !prev)}>
								Gerenciar Eventos
								<ChevronDown className='ml-2' />
							</Button>
							{isEventMenuOpen && (
								<div className={submenuContainerStyles}>
									{roles.CREATE_EVENT_ROLES.includes(role ?? '') && (
										<div
											className={submenuItemStyles}
											onClick={() => navigate('/cadastrarEvento')}>
											Cadastrar Eventos
										</div>
									)}
									{roles.FETCH_ALL_EVENTS.includes(role ?? '') && (
										<div
											className={submenuItemStyles}
											onClick={() => navigate('/eventos')}>
											Gerenciar Eventos
										</div>
									)}
								</div>
							)}
						</div>
					)}

					<Button
						className='w-full md:w-auto my-2 md:my-0'
						onClick={() => {
							logout();
							navigate('/home');
						}}>
						<LogOut className='px-1' /> Sair
					</Button>
				</div>
			</div>
		</header>
	);
};
