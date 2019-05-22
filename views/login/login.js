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

    loginController.$inject = ['$scope', '$state', '$rootScope', '$element', '$compile', 'AuthService'];

    function loginController($scope, $state, $rootScope, $element, $compile, AuthService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            if ($rootScope.globals.currentUser) {
                gotoStateByRole($rootScope.globals.currentUser.role);
            }

            $scope.login = (username, password) => {
                AuthService.login(username, password)
                    .then(resLogin => {
                        gotoStateByRole(resLogin.role);
                    })
                    .catch(() => {
                        $element.append($compile(`
                            <alert type="danger" title="The username or password you entered is not valid!"></alert>
                        `)($scope));
                    });
            };

            function gotoStateByRole(role) {
                switch (role) {
                    case 'TENANT_USER':
                        $state.go('tenantUser');
                        break;
                    case 'PLATFORM_ADMIN':
                        $state.go('platformAdmin');
                        break;
                }
            }
        };
    }
})();