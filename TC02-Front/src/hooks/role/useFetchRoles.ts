import { useState, useEffect } from 'react';
import { fetchRolesService } from '@/services/role/fetchRolesService';
import { RoleInterface } from '@/interfaces/RoleInterface';

export const useFetchRoles = (): {
	data: RoleInterface[];
	loading: boolean;
	error: boolean;
} => {
	const [data, setData] = useState<RoleInterface[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const roles = await fetchRolesService();
				setData(roles);
				setError(false);
			} catch (err) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchRoles();
	}, []);

	return { data, loading, error };
};
