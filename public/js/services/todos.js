angular.module('todoService', [])
	.factory('Todos', function($http) { // Each funciton returns a promise object
		return {
			get: function() {
				return $http.get('/api/todos');
			},
			create: function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete: function() {
				return $http.delete('/api/todos/' + id);
			}
		}
	});