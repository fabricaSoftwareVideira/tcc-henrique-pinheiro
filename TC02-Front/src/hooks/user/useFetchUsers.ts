import { fetchUsersService } from '@/services/user/fetchAllUsersService';
import { useState, useEffect } from 'react';
import { User } from '../../components/tables/users/UserTableColumns';

export const useFetchUsers = (
	skip: number,
	take: number,
	searchTerm: string
): {
	data: User[];
	loading: boolean;
	error: boolean;
	total: number;
} => {
	const [data, setData] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { users, total } = await fetchUsersService(skip, take, searchTerm);
				setData(users);
				setTotal(total);
				setError(false);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [skip, take, searchTerm]);

	return { data, loading, error, total };
};
