(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserContainer', {
            template: require('./tenant-user-container.html'),
            controller: tenantUserContainerController,
        });

    tenantUserContainerController.$inject = ['$scope', '$state', 'AuthService'];

    function tenantUserContainerController($scope, $state, AuthService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $state.go('tenantUser.appSuite');
            $scope.logout = AuthService.logout;
        };
    }
})();