import { useState } from 'react';
import {
	createAttendance,
	CreateAttendanceRequest,
	CreateAttendanceResponse,
} from '../services/createAttendanceService';

export const useCreateAttendance = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<CreateAttendanceResponse | null>(null);

	const handleCreateAttendance = async (attendanceData: CreateAttendanceRequest) => {
		setLoading(true);
		setError(null);
		try {
			const response = await createAttendance(attendanceData);
			setData(response);
		} catch (err: any) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, data, handleCreateAttendance };
};
