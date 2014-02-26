// Initial Setup ---------------------------------------------------------------
var express = require('express');
var app = express();
var mongoose = require('mongoose');

// Configuration ---------------------------------------------------------------
var database = require('./config/database'); // Loads database config file
mongoose.connect(database.url); // Connects to database

app.configure(function() {
	app.use(express.static(__dirname + '/public')); // Sets static files' location from /public/example to /example
	app.use(express.logger('dev')); // Logs all requests to console
	app.use(express.bodyParser()); // Pulls info from html in POST
	app.use(express.methodOverride()); // Simulates DELET and PUT
});


// Routes ----------------------------------------------------------------------
require('./app/routes')(app); // Loads the routes

// Listen - Node app -----------------------------------------------------------
app.listen(8080);
console.log('App is listning on port 8080');