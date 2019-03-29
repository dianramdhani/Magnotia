(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('login', {
            template: require('./login.html'),
            controller: loginController,
        });

    loginController.$inject = ['$scope', '$state', '$rootScope', 'AuthService'];

    function loginController($scope, $state, $rootScope, AuthService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            if ($rootScope.globals.currentUser) {
                gotoStateByRole($rootScope.globals.currentUser.role);
            }

            $scope.login = (username, password) => {
                AuthService.login(username, password)
                    .then(resLogin => {
                        gotoStateByRole(resLogin.role);
                    });
            };

            function gotoStateByRole(role) {
                switch (role) {
                    case 'TENANT_USER':
                        $state.go('tenantUser');
                        break;
                }
            }
        };
    }
})();