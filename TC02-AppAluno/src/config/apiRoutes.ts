// const apiBaseUrl = 'http://localhost:4000';
// const apiBaseUrl = 'http://200.135.55.14:4000';
const apiBaseUrl = 'https://cti.videira.ifc.edu.br/api';

export const apiRoutes = {
	createAttendance: `${apiBaseUrl}/createAttendance`,
	fetchAllEvents: `${apiBaseUrl}/fetchEvents`,
	getEventByIdStudent: `${apiBaseUrl}/getEventByIdStudent`,
	getGovbrToken: `${apiBaseUrl}/auth/exchange`,
	govbrLogin: `${apiBaseUrl}/auth/login`,
};
