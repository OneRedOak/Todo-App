var todoApp = angular.module('angularTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};
	// Get & show all todo items when on landing page
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error:' + data);
		});
	// When add form submitted, sends text to Node API
	$scope.createTodo = function() {
		$http.post('/api/todos/', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // Clears the form data, prepping for another user request
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	// Delete a todo item after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.sucess(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}