var express = require('express');
var router = express.Router();
var config = require('./config.js');
var sql = require("mssql/msnodesqlv8");


router.post('/', function(req, res, next) {
	sql.connect(config)
		.then(pool => {
			let queryheader = 'select * from payroll '
			let where = 'where 1=1 '			
			if(req.body.pcafname) where += 'and pca_first_name like ' + "'%" + req.body.pcafname + "%' " 
			if(req.body.pcalname) where += 'and pca_last_name like ' + "'%" +  req.body.pcalname + "%' "
			if(req.body.startdate) where += 'and check_date >= ' + "'" + req.body.startdate + "' "
			if(req.body.enddate) where += 'and check_date <= ' + "'" + req.body.enddate + "' "
			if(req.body.paystatus) where += 'and pay_status = ' + "'" + req.body.paystatus + "' "
			if(req.body.checkNo) where += 'and check_no = ' + "'" + req.body.checkNo + "'"
			
			let querystr = queryheader + where + ' order by check_date'
			return pool.query(querystr)	
		}).then(result => {
			sql.close()
			res.json({payRolls: result.recordset})
		})
		.catch(err => {console.log(err.message)})
});

module.exports = router;
