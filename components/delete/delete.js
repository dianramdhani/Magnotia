(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('delete', {
            template: require('./delete.html'),
            controller: deleteController,
            bindings: {
                header: '@',
                body: '@',
                onDelete: '&'
            },
        });

    deleteController.$inject = ['$scope'];
    function deleteController($scope) {
        var $ctrl = this;
        $scope.id = $scope.$id;

        $ctrl.$onInit = function () { };
    }
})();