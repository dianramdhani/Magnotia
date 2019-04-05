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

    tenantUserContainerController.$inject = ['$scope', '$state', '$rootScope', '$timeout', 'AuthService'];
    function tenantUserContainerController($scope, $state, $rootScope, $timeout, AuthService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.stateNow = 'tenantUser.applicationSuite.home';
            $state.go('tenantUser.applicationSuite.home');
            $scope.logout = AuthService.logout;
            $timeout(() => $scope.username = $rootScope.globals.currentUser.username);
        };
    }
})();