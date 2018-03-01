(function() {
    'use strict';
    
    angular
        .module('myTodo', [])
        .controller('MainController', MainController);

    MainController.$inject = ["$scope", "$http"];
        
    function MainController($scope, $http) {
        $scope.message = "Enter your to-do";
        $scope.formData = {};

        // when landing on the page, get all todos and show them
        // TODO: use axios for passing data to backend
        $http.get('/todo')
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
            $http.post('/todo', $scope.formData)
                .success(function(data) {
                    console.log('success creating a new todo with', $scope.formData);
                    // $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
            $http.delete('/todo/' + id)
                .success(function(data) {
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

    }
})();
