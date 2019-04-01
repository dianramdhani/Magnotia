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
            }
        });

    searchController.$inject = ['$scope'];
    function searchController($scope) {
        var $ctrl = this;

        $ctrl.$onInit = () => $scope.setFocus = () => angular.element(`#search-${$scope.$id}`).focus();
    }
})();