var express = require('express');
var router = express.Router();
var config = require('./config.js');
var sql = require("mssql/msnodesqlv8");
const pdf = require('html-pdf');
const pdfTemplate = require('../file_templates/invoice_template');

router.post('/', (req, res) => {
  var rootfolder = 
  pdf.create(pdfTemplate(req.body), {}).toFile(`${process.cwd()}/generated_files/rezultati.pdf`, (err) => {
    if(err) {
        return console.log('error');
    }
	res.sendFile(`${process.cwd()}/generated_files/rezultati.pdf`);
  })
})

router.post('/search', (req, res, next)=>{
  sql.connect(config)
	.then(pool => {
		let querystr = 'select billing_address1, billing_address2, shipping_address1, shipping_address2, billable_units, hourly_charge from private_visits '
		querystr += 'where first_name=' + "'" + req.body.recifname + "' and last_name = '" + req.body.recilname + "' and service_date between '" +  
	    req.body.startdate + "' and '" + req.body.enddate + "'"
		return pool.query(querystr)	
	})
	.then(result => {
		//console.dir(result)
		res.json({bills: result.recordset})
	})	
})

module.exports = router;