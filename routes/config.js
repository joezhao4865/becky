module.exports = {
	driver: 'msnodesqlv8',
	connectionString: 'Driver={SQL Server Native Client 11.0};Server={LAPTOP-IC51KS2G};Database={beckycare};Trusted_Connection={yes};',
	options: {
		trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}