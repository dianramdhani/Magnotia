(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('search', {
            template: require('./search.html'),
            controller: searchController,
            bindings: {
                position: '@',
                filter: '='
            }
        });

    searchController.$inject = ['$scope'];
    function searchController($scope) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.id = $scope.$id;
            $scope.setFocusLeft = () => angular.element(`#search-left-${$scope.id}`).focus();
            $scope.setFocusRight = () => angular.element(`#search-right-${$scope.id}`).focus();
        };
    }
})();