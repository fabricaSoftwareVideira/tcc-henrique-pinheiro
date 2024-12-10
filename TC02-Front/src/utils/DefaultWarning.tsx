import { Header } from './Header';
interface DefaultWarningProps {
	message: string;
}

export const DefaultWarning: React.FC<DefaultWarningProps> = ({ message }) => {
	return (
		<>
			<Header />
			<h1 className='default-warning'>{message}</h1>
		</>
	);
};
