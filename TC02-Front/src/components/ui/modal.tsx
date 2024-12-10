import React from 'react';
import { Button } from '@/components/ui/button';

interface ModalProps {
	title: string;
	onClose: () => void;
	actions?: React.ReactNode;
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, onClose, actions, children }) => {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white rounded-lg p-6 w-full max-w-md'>
				<div className='mb-4'>
					<h2 className='text-xl font-bold'>{title}</h2>
				</div>
				<div className='mb-4'>{children}</div>
				<div className='flex justify-end space-x-2'>
					{actions || (
						<Button variant='outline' onClick={onClose}>
							Fechar
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};
