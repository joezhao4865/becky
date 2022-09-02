var express = require('express');
var router = express.Router();
var config = require('./config.js');
var sql = require("mssql/msnodesqlv8");
const excel = require('node-excel-export');

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

router.post('/saveClaim', (req, res) => {
	var body = req.body
	var startDate = body.startdate
	var endDate = body.enddate
	var querystr = 'insert corrupted_visits(visitId, claim_status, pca_first_name, pca_last_name, recipient_first_name, recipient_last_name,procedure_code, service_date, end_date, invoice_date, payer_code, calculated_amount, billable_amount, paid_amount, remarks) values ('
	querystr = querystr + "'" + body.visitid +"', '" + body.status + "', '" + body.pfname + "', '" + body.plname +"', '" + body.rfname+"', '" + body.rlname + "', '" + body.proc +"', '" + body.startdate + "', '"+body.enddate + "', '" + body.invoicedate + "', '" +body.payer +"', '" + body.calculated + "', '" + body.billable + "', '" + body.paid + "', '" + body.remark + "')"
	
	sql.connect(config)
		.then(pool => pool.query(querystr))
		.then(result => res.json(result))
})

router.post('/download', function(req, res, next){
	const styles = {
		 headerDark: {
		fill: {
		  fgColor: {
			rgb: 'FF000000'
		  }
		},
		font: {
		  color: {
			rgb: 'FFFFFFFF'
		  },
		  sz: 14,
		  bold: true,
		  underline: true
		}
	  }
	}
	const headings = [
		//{value: 'pca first name'}, 
		//{value: 'pca last name'}, 
		//{value: 'recipient first name'},
		//{value: 'recipient last name'}, 
		//{value: 'service date'}, 
		//{value: 'invoice date'},
		//{value: 'payer'}, 
		//{value: 'calculated amount'}, 
		//{value: 'billable amount'},
		//{value: 'paid amount'}
		//['pca first name', 'pca last name', 'recipient first name', 'recipient last name', 'service date', 'invoice date','payer','calculated amount','billable amount','paid amount']
	];
	
	const specification = {	 
	  pca_first_name : { 
		displayName: 'pca first name', 
		headerStyle: styles.headerDark,
		width: 120 
	  },
	  pca_last_name : { 
		displayName: 'pca last name', 
		headerStyle: styles.headerDark,		
		width: 120 
	  },
	  recipient_first_name : { 
		displayName: 'recipient first name',
		headerStyle: styles.headerDark,		
		width: 120 
	  },
	  recipient_last_name : { 
		displayName: 'pca first name',
		headerStyle: styles.headerDark,
		width: 120 
	  },
	  service_date : { 
		displayName: 'service date',
		headerStyle: styles.headerDark,
		width: 120 
	  },
	  invoice_date : { 
		displayName: 'invoice date',
		headerStyle: styles.headerDark,
		width: 120 
	  },
	  payer_code : { 
		displayName: 'payer',
		headerStyle: styles.headerDark,
		width: 120 
	  },
	  calculated_amount : { 
		displayName: 'amount calculated', 
		headerStyle: styles.headerDark,
		width: 120 
	  },
	  billable_amount : { 
		displayName: 'amount billable',
		headerStyle: styles.headerDark,
		width: 120 
	  },
	  paid_amount : { 
		displayName: 'amount paid', 
		headerStyle: styles.headerDark,
		width: 120 
	  }
	}
	 
	
	const merges = [
	  //{ start: { row: req.body.data.length-1, column: 1 }, end: { row:  req.body.data.length-1, column: 10 } },
	  //{ start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
	  //{ start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
	]
	 

	const report = excel.buildExport(
	  [
		{
		  name: 'Report', 
		  heading: headings, 
		  merges: merges, 
		  specification: specification, 
		  data: req.body.data 
		}
	  ]
	);
	 	
	res.attachment('report.xlsx'); 
	return res.send(report);
})

module.exports = router;
