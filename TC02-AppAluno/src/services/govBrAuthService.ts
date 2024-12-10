const govBrService = {
	getGovBrAuthUrl: (): string => {
		const baseUrl = import.meta.env.VITE_GOVBR_URL_PROVIDER || '';
		const clientId = import.meta.env.VITE_GOVBR_CLIENT_ID || '';
		const redirectUri = import.meta.env.VITE_GOVBR_REDIRECT_URI || '';
		const scopes = import.meta.env.VITE_GOVBR_SCOPES || '';
		if (!baseUrl || !clientId || !redirectUri || !scopes) {
			console.error('Variáveis de ambiente não estão definidas corretamente.');
			return '';
		}

		return `${baseUrl}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
			redirectUri
		)}&scope=${scopes}`;
	},
};

export default govBrService;
