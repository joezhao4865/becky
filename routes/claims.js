var express = require('express');
var router = express.Router();
var config = require('./config.js');
var sql = require("mssql/msnodesqlv8");

router.post('/', function(req, res, next){
	var {firstname, lastname, startdate, enddate, servicehours, canrespite} = req.body
	sql.connect(config).then(conn => {
	    var request = new sql.Request(conn);
		request.input('startdate', sql.VarChar(10), startdate)
		request.input('enddate', sql.VarChar(10), enddate)
		request.input('fname', sql.VarChar(20), firstname)
		request.input('lname', sql.VarChar(20), lastname)
		
		request.execute('get_wl_info').then((result) => {
			sql.close()
			res.json({
				data: {
						details: result.recordset,
						personalTotal: result.recordset.filter(r => r.procedure_code=='T1019').reduce((start, v)=> start+v.billable_units, 0)
					  }	
			})
		}).catch( err => {console.log(err)})
	})
})

module.exports = router