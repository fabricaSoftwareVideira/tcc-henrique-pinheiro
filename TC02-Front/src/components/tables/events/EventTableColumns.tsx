import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon, FileTextIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIssueReport } from '../../../hooks/report/useIssueReport';
import { useState } from 'react';

export type Event = {
	eventId: number;
	eventTitle: string;
	eventStatus: string;
	eventStartDate: string;
	eventEndDate: string;
};

export const columns: ColumnDef<Event>[] = [
	{
		accessorKey: 'eventTitle',
		header: 'Título',
	},
	{
		accessorKey: 'eventStartDate',
		header: 'Data de Início',
		cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('pt-BR'),
	},
	{
		accessorKey: 'eventEndDate',
		header: 'Data de Fim',
		cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('pt-BR'),
	},
	{
		accessorKey: 'eventStatus',
		header: 'Status',
	},
	{
		accessorKey: 'actions',
		header: 'Ações',
		cell: ({ row }) => {
			const { handleIssueReport, error, message } = useIssueReport();
			const [loading, setLoading] = useState(false);
			const eventId = row.original.eventId;

			const handleEmitReport = async () => {
				setLoading(true);
				await handleIssueReport(eventId);
				setLoading(false);
			};

			return (
				<div className='flex flex-col justify-center items-center space-y-2'>
					<div className='flex justify-center space-x-2'>
						<Link to={`../editarEvento/${eventId}`} state={{ event: row.original }}>
							<Button variant={'edit'}>
								<EditIcon className='pr-2' />
								Edit
							</Button>
						</Link>
						<Button onClick={handleEmitReport} variant={'default'} disabled={loading}>
							<FileTextIcon className='pr-2' />
							{loading ? 'Processando...' : 'Emitir Relatório'}
						</Button>
					</div>
					{message && <p className='text-green-500'>{message}</p>}
					{error && <p className='text-red-500'>{error}</p>}
				</div>
			);
		},
	},
];
