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
        });

    searchController.$inject = ['$scope'];
    function searchController($scope) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.setFocus = () => document.querySelector('#search').focus();
        };
    }
})();