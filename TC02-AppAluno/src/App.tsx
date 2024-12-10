import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import { EventPage } from './pages/EventPage';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/home' element={<HomePage />} />{' '}
					<Route
						path='/evento/:eventId'
						element={<PrivateRoute element={<EventPage />} />}
					/>
					<Route path='/' element={<PrivateRoute element={<DashboardPage />} />} />{' '}
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
