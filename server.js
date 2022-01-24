const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var visitsRouter = require('./routes/visits');
var payrollRouter = require('./routes/payroll');
var invoiceRouter = require('./routes/invoice');
var profitLossRouter = require('./routes/profit-loss');
var reportRouter = require('./routes/reports');
var claimRouter = require('./routes/claims');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/visits', visitsRouter);
app.use('/payroll', payrollRouter);
app.use('/invoice', invoiceRouter);
app.use('/reports', reportRouter);
app.use('/profit-loss', profitLossRouter);
app.use('/claims', claimRouter);


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));