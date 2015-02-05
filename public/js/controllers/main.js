angular.module('todoController', [])
	.controller('mainController', function($scope, $http, Todos) {
		$scope.formData = {};
		// GET -------------------------------------------------------------
		// Get & show all todo items when on landing page
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
			})
		// Create ----------------------------------------------------------
		// When add form submitted, sends text to Node API
		$scope.createTodo = function() {
			if(!$.isEmptyObject($scope.formData)) { // Validates formData, prevents empty form submition
				Todos.create($scope.formData)
					.success(function(data) {
						$scope.formData = {}; // Clears the form data, prepping for another user request
						$scope.todos = data;
					});
			}
		};
		// Delete ----------------------------------------------------------
		// Delete a todo item after checking it
		$scope.deleteTodo = function(id) {
			Todos.delete(id)
				.success(function(data) { // On success, calls GET on new list of todos
					$scope.todos = data; // Assigns new list of todos
				});
		};

		$scope.getTextToCopy = function() {
        	return "ngClip is awesome!";
    	};

	    $scope.doSomething = function() {
	        console.log("NgClip...");
	    };


	});