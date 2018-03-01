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

        vm.createTodo = createNewTodo;
        vm.deleteTodo = deleteTheTodo;

        // when landing on the page, get all todos and show them
        // TODO: use axios for passing data to backend
        $http.get('/todo')
            .then(function (response) {
                var data = response.data;
                vm.todos = data;
                console.log(data);
            });
        // .success(function(data) {
                
        // })
        // .error(function(data) {
        //     console.log('Error: ' + data);
        // });

        // when submitting the add form, send the text to the node API
        // vm.createTodo = function() {
        //     $http.post('/todo', vm.formData)
        //         .success(function(data) {
        //             console.log('success creating a new todo with', vm.formData);
        //             // vm.formData = {}; // clear the form so our user is ready to enter another
        //             vm.todos = data;
        //             console.log(data);
        //         })
        //         .error(function(data) {
        //             console.log('Error: ' + data);
        //         });
        // };

        function createNewTodo() {
            $http.post('/todo', vm.formData)
                .then(function (response) {
                    var data = response.data;
                    console.log('success creating a new todo with', vm.formData);
                    // vm.formData = {}; // clear the form so our user is ready to enter another
                    vm.todos = data;
                    console.log(data);
                });

            // .success(function(data) {
            //     console.log('success creating a new todo with', vm.formData);
            //     // vm.formData = {}; // clear the form so our user is ready to enter another
            //     vm.todos = data;
            //     console.log(data);
            // })
            // .error(function(data) {
            //     console.log('Error: ' + data);
            // });
        }

        // delete a todo after checking it
        // vm.deleteTodo = function(id) {
        //     $http.delete('/todo/' + id)
        //         .success(function(data) {
        //             vm.todos = data;
        //             console.log(data);
        //         })
        //         .error(function(data) {
        //             console.log('Error: ' + data);
        //         });
        // };

        function deleteTheTodo(id) {
            $http.delete('/todo/' + id)
                .success(function(response) {
                    var data = response.data;
                    vm.todos = data;
                    console.log(data);
                });
        }

    }
})();
