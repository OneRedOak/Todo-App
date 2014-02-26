// Routes ----------------------------------------------------------------------
var Todo = require('./models/todo'); // Loads todo model

module.exports = function(app) { // Exposes routes to app through module.exports
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
};