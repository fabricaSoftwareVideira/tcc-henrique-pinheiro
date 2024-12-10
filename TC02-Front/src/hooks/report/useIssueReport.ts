import { useState } from 'react';
import { issueReport } from '../../services/report/IssueReportService';

export const useIssueReport = () => {
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<any>(null);
	const [message, setMessage] = useState<string | null>(null);

	const handleIssueReport = async (eventId: number) => {
		setError(null);
		setMessage(null);
		try {
			const result = await issueReport(eventId);
			setData(result);
			setMessage(`Relatório de evento ${eventId} gerado com sucesso!`);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Erro desconhecido');
			}
		}
	};

	return { handleIssueReport, error, data, message };
};
