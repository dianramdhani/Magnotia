(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserContainer', {
            template: require('./container.html'),
            controller: tenantUserContainerController,
        });

    tenantUserContainerController.$inject = ['$scope', '$state', '$rootScope', 'AuthService'];
    function tenantUserContainerController($scope, $state, $rootScope, AuthService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $state.go('tenantUser.applicationSuite.home');
            $scope.stateNow = 'tenantUser.applicationSuite.home';
            $scope.logout = AuthService.logout;
            $scope.username = $rootScope.globals.currentUser.username;
        };
    }
})();