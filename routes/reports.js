var express = require('express');
var router = express.Router();
var config = require('./config.js');
var sql = require("mssql/msnodesqlv8");
const excel = require('node-excel-export');

router.post('/', function(req, res, next){
	var {serviceStartDate, serviceEndDate, checkStartDate, checkEndDate, payer} = req.body
	sql.connect(config).then(conn => {
	    var request = new sql.Request(conn);
		request.input('serviceStartDate', sql.VarChar(10), serviceStartDate)
		request.input('serviceEndDate', sql.VarChar(10), serviceEndDate)
		request.input('checkStartDate', sql.VarChar(10), checkStartDate)
		request.input('checkEndDate', sql.VarChar(10), checkEndDate)
		request.input('payer', sql.VarChar(10), payer)
		request.execute('sp_income_expense').then((result) => {
			sql.close()
			res.json({
				data: result.recordset,
				calculated: result.recordset.reduce((start, v) => start + v.total_calculated, 0).toFixed(2),
				billable: result.recordset.reduce((start, v) => start + v.total_billable, 0).toFixed(2),
				paid: result.recordset.reduce((start, v) => start + v.total_paid, 0).toFixed(2),
				balance: result.recordset.reduce((start, v) => start + v['paid - billable'], 0).toFixed(2),
				tax: result.recordset.reduce((start, v) => start + v.total_tax, 0).toFixed(2),
				expense: result.recordset.reduce((start, v) => start + v.total_expense, 0).toFixed(2),
				liability: result.recordset.reduce((start, v) => start + v.total_liability, 0).toFixed(2),
				expected: result.recordset.reduce((start, v) => start + v['expected profit'], 0).toFixed(2),
				real: result.recordset.reduce((start, v) => start + v['real profit'], 0).toFixed(2)
			})
		}).catch( err => {console.log(err)})
	})
})

router.post('/export', function(req, res, next){
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
	  },
	  headerIncome: {
		  fill: {
		  fgColor: {
			rgb: '33CC00'
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
	  },
	  headerExpense: {
		  fill: {
		  fgColor: {
			rgb: 'FF9900'
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
	  },
	  headerSummary: {
		  fill: {
		  fgColor: {
			rgb: 'FF80FF'
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
	  },
	  cellIncome: {
		font: {
			color: {
				rgb: '33CC00'
			}
		}
	  },
	  cellExpense: {
		font: {
			color:{
				rgb: 'FF9900'
			}
		}
	  }, 
	  cellSummary: {
		font: {
			color: {
				rgb: 'FF80FF'
			}
		}
	  },
	  cellNegative: {
		font: {
			color: {
				rgb: 'FF0000'
			}
		}
	  }
	};
	 
	const heading = [
	 // [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}]
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
		cellStyle: (value, row) => row.idx == req.body.data.length-1 ? styles.headerDark : {},
		width: 120 
	  },
	  total_calculated : { 
		displayName: 'total calculated', 
		headerStyle: styles.headerIncome, 
		cellStyle: (value, row) => row.idx == req.body.data.length-1 ? styles.headerDark : styles.cellIncome,
		width: 120 
	  },
	  total_billable : { 
		displayName: 'total billable', 
		headerStyle: styles.headerIncome, 
		cellStyle: (value, row) => row.idx == req.body.data.length-1 ? styles.headerDark : styles.cellIncome,
		width: 95 
	  },
	  total_paid : { 
		displayName: 'total paid', 
		headerStyle: styles.headerIncome, 
		cellStyle: (value, row) => row.idx == req.body.data.length-1 ? styles.headerDark : styles.cellIncome,
		width: 85 
	  },
	  'paid - billable' : { 
		displayName: 'pending balance', 
		headerStyle: styles.headerSummary, 
		cellStyle: (value, row) => row.idx == req.body.data.length-1 ? styles.headerDark :
										value < 0 ? styles.cellNegative : styles.cellSummary,
		width: 120
	  },
	  total_tax : { 
		displayName: 'total tax', 
		headerStyle: styles.headerExpense, 
		cellStyle: (value, row) => row.idx == req.body.data.length-1 ? styles.headerDark : styles.cellExpense,
		width: 85 
	  },
	  total_pay : { 
		displayName: 'total pay', 
		headerStyle: styles.headerExpense, 
		cellStyle: (value, row) => row.idx == req.body.data.length-1 ? styles.headerDark : styles.cellExpense,
		width: 85 
	  },
	  total_liability : { 
		displayName: 'total liability', 
		headerStyle: styles.headerExpense, 
		cellStyle: (value, row) => row.idx == req.body.data.length-1 ? styles.headerDark : styles.cellExpense,
		width: 110 
	  },
	  total_expense : { 
		displayName: 'total expense', 
		headerStyle: styles.headerExpense, 
		cellStyle: (value, row) => row.idx == req.body.data.length-1 ? styles.headerDark : styles.cellExpense,
		width: 120 
	  },
	  'expected profit' : { 
		displayName: 'expected profit',
		headerStyle: styles.headerSummary, 
		cellStyle: (value, row) =>  row.idx == req.body.data.length-1 ? styles.headerDark :
										value < 0 ? styles.cellNegative : styles.cellSummary,
		width: 120 
	  },
	  'real profit' : { 
		displayName: 'real profit',
		headerStyle: styles.headerSummary,
		cellStyle: (value, row) =>  row.idx == req.body.data.length-1 ? styles.headerDark :
										value < 0 ? styles.cellNegative : styles.cellSummary,
		width: 85 
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
		  heading: heading, 
		  merges: merges, 
		  specification: specification, 
		  data: req.body.data 
		}
	  ]
	);
	 	
	res.attachment('report.xlsx'); 
	return res.send(report);
})


module.exports = router