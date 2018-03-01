(function() {
    'use strict';
    
    angular
        .module('myTodo', [])
        .controller('MainController', MainController);

    MainController.$inject = ["$http"];
        
    function MainController($http) {
        var vm = this;
        vm.message = "Enter your to-do";
        vm.formData = {};

        // when landing on the page, get all todos and show them
        // TODO: use axios for passing data to backend
        $http.get('/todo')
            .success(function(data) {
                vm.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        // when submitting the add form, send the text to the node API
        vm.createTodo = function() {
            $http.post('/todo', vm.formData)
                .success(function(data) {
                    console.log('success creating a new todo with', vm.formData);
                    // vm.formData = {}; // clear the form so our user is ready to enter another
                    vm.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        // delete a todo after checking it
        vm.deleteTodo = function(id) {
            $http.delete('/todo/' + id)
                .success(function(data) {
                    vm.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

    }
})();
