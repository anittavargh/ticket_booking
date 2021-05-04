var express = require('express');


var websiteRouter = require('./routes/website');
var dashboardRouter = require('./routes/dashboard');


var app = express();
app.use(express.json());
app.use('/website',websiteRouter);
app.use('/dashboard',dashboardRouter);

module.exports = app;

