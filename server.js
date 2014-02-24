// Initial Setup ---------------------------------------------------------------
var express = require('express');
var app = express();
var mongoose = require('mongoose');

// Configuration ---------------------------------------------------------------
mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); // Scotch.io tutorial - test database

app.configure(function() {
	app.use(express.static(__dirname + '/public')); // Sets static files' location from /public/example to /example
	app.use(express.logger('dev')); // Logs all requests to console
	app.use(express.bodyParser()); // Pulls info from html in POST
	app.use(express.methodOverride()); // Simulates DELET and PUT
});

// Models ----------------------------------------------------------------------
var Todo = mongoose.model('Todo', {
	text: String
});

// Routes ----------------------------------------------------------------------
	// Api ---------------------------------------------------------------------
	// Get all todos
	app.get('/api/todos', function(req, res) {
		// Use mongoose to get all todos in the database
		Todo.find(function(err, todos) {
			// If there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)
			res.json(todos); // Return all todos in JSON format
		});
	});
	// Create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {
		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text: req.body.text,
			done: false
		}, function(err, todo) {
			if (err)
				res.send(err);
			// Get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});
	// Delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);
			// Get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

// Application -----------------------------------------------------------------
app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // Loads the single view file, where th efront-end framework will handle the rest
});

// Listen - Node app -----------------------------------------------------------
app.listen(8080);
console.log('App is listning on port 8080');