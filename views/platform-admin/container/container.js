(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('platformAdminContainer', {
            template: require('./container.html'),
            controller: platformAdminContainerController,
        });

    platformAdminContainerController.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'AuthService'];
    function platformAdminContainerController($scope, $rootScope, $state, $timeout, AuthService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            console.log('terbuka');
            $timeout(() => {
                $scope.stateNow = 'platformAdmin.dashboard';
                $state.go('platformAdmin.dashboard');
                $scope.username = $rootScope.globals.currentUser.username;
            });
        };

        $scope.logout = AuthService.logout;
    }
})();