import fs from 'fs';

export class Logger {
	private fileName: string;
	private logPath: string;

	constructor(fileName: string, logPath: string) {
		this.fileName = fileName;
		this.logPath = logPath;
	}

	error = (msg: any, userEmail?: string, error?: any) => {
		const errorMessage = error
			? `${msg} - Error: ${error.message} em ${this.fileName} por User: ${userEmail}\n`
			: `${msg} em ${this.fileName} por User: ${userEmail}\n`;
		fs.appendFileSync(
			this.logPath,
			`${new Date().toLocaleString()}: ERROR - ${errorMessage}`,
			'utf8'
		);
	};

	warn = (msg: any, userEmail?: string) => {
		const warnMessage = `${new Date().toLocaleString()}: WARN - ${msg} em ${
			this.fileName
		} por User: ${userEmail}\n`;
		fs.appendFileSync(this.logPath, warnMessage);
	};

	info = (info: any, userEmail?: string) => {
		const infoMessage = `${new Date().toLocaleString()}: INFO - ${info} por User: ${userEmail}\n`;
		fs.appendFileSync(this.logPath, infoMessage);
	};
}
