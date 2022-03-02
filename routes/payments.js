var express = require('express');
var router = express.Router();
var config = require('./config.js');
var sql = require("mssql/msnodesqlv8");


router.post('/', function(req, res, next) {
	var {recipient_first_name, recipient_last_name, serviceStartDate, serviceEndDate, payer} = req.body
	sql.connect(config).then(conn => {
	    var request = new sql.Request(conn);
		request.input('fname', sql.VarChar(30), recipient_first_name)
		request.input('lname', sql.VarChar(30), recipient_last_name)
		request.input('startDate', sql.VarChar(18), serviceStartDate)
		request.input('endDate', sql.VarChar(18), serviceEndDate)
		request.input('payer', sql.VarChar(10), payer)
		request.execute('sp_Get_Payments').then((result) => {
			sql.close()
			res.json({
				data: result.recordset
			})
		}).catch( err => {console.log(err)})
	})
})



module.exports = router;
