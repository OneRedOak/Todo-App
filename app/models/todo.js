var mongoose = require('mongoose'); // Loads Mongoose so we can define a model

module.exports = mongoose.model('Todo', {
	text: String,
	done: Boolean
});