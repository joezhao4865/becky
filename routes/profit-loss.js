var express = require('express');
var router = express.Router();
var config = require('./config.js');
var sql = require("mssql/msnodesqlv8");
const pdf = require('html-pdf');
const pdfTemplate = require('../file_templates/profit_loss_template');

router.post('/', (req, res) => {
  var rootfolder = 
  pdf.create(pdfTemplate(req.body), {}).toFile(`${process.cwd()}/generated_files/resultfile.pdf`, (err) => {
    if(err) {
        return console.log('error');
    }
	res.sendFile(`${process.cwd()}/generated_files/resultfile.pdf`);
  })
})

module.exports = router;