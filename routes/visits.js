var express = require('express');
var router = express.Router();
var config = require('./config.js');
var sql = require("mssql/msnodesqlv8");


router.post('/', function(req, res, next) {
	sql.connect(config)
		.then(pool => {
			let queryheader = 'select * from visits '
			let where = 'where 1=1 '			
			if(req.body.recifname) where += 'and recipient_first_name = '+ "'"+req.body.recifname+"' "
			if(req.body.recilname) where += 'and recipient_last_name = '+ "'" + req.body.recilname + "' " 
			if(req.body.pcafname) where += 'and pca_first_name = ' + "'" + req.body.pcafname + "' " 
			if(req.body.pcalname) where += 'and pca_last_name = ' + "'" +  req.body.pcalname + "' "
			if(req.body.startdate) where += 'and service_date >= ' + "'" + req.body.startdate + "' "
			if(req.body.enddate) where += 'and service_date <= ' + "'" + req.body.enddate + "' "
			if(req.body.payer) where += 'and payer_code = ' + "'" + req.body.payer + "'"
			
			let querystr = queryheader + where + ' order by service_date'
			return pool.query(querystr)	
		}).then(result => {
			sql.close()
			res.json({allVisits: result.recordset})
		})
		.catch(err => {console.log(err.message)})
});

router.post('/updateVisit', (req, res) => {
	var body = req.body
	var querystrHeader = 'update visits set '
	var querystrBody = ''
	var input_amount = ''

	sql.connect(config)
		.then(pool => {
			for (key in body.targets){
				querystrBody = ''				
				var visit = body.targets[key]
				if('billable' in visit){
					input_amount = visit.billable ? visit.billable : '0.00'
					querystrBody += 'billable_amount = '+ input_amount
				}
				if('paid' in visit){
					input_amount = visit.paid ? visit.paid : '0.00'
					querystrBody += ', paid_amount = ' + input_amount
				}
				if('remarks' in visit)
					querystrBody += ', remarks = '+ "'" + visit.remarks + "'"
				querystrBody = querystrBody.replace(/^\s*,\s*/, '')
				querystrBody += ' where visitId = ' + "'" + key + "'"
				pool.query(querystrHeader + querystrBody)
			}
			return ""
		})
		.then(result => {
			//sql.close()
			res.json(result)
		})			
});


module.exports = router;
