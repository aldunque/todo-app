(function() {
    angular
        .module('churvalooApp')
        .controller('MainController', MainController);

    MainController.$inject = [];
    
    function MainController(MainFactory, meh) {
        // reference this
        var vm = this;    
        vm.person = {
            name: 'Pew',
            hobby: 'Choo Choo'
        };
    }
})();