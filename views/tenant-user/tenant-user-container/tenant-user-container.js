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

    tenantUserContainerController.$inject = ['$scope', '$state', '$rootScope', 'AuthService'];

    function tenantUserContainerController($scope, $state, $rootScope, AuthService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $state.go('tenantUser.appSuite');
            $scope.stateNow = 'tenantUser.appSuite';
            $scope.logout = AuthService.logout;
            $scope.username = $rootScope.globals.currentUser.username;
        };
    }
})();