module.exports = {
	driver: 'msnodesqlv8',
	connectionString: 'Driver={SQL Server Native Client 11.0};Server={WCP-MP1XGSNE};Database={beckycare};Trusted_Connection={yes};',
	options: {
		trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}