(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserUserManagementFormNewUser', {
            template: require('./form-new-user.html'),
            controller: tenantUserUserManagementFormNewUserController
        });

    tenantUserUserManagementFormNewUserController.$inject = ['$scope', '$rootScope', '$element', '$compile', '$state', 'TenantUserService'];
    function tenantUserUserManagementFormNewUserController($scope, $rootScope, $element, $compile, $state, TenantUserService) {
        let $ctrl = this;
        $ctrl.$onInit = function () {
            $scope.id = $scope.$id;
            $scope.user = {
                prefixUsername: `${$rootScope.globals.currentUser.tenant}_`
            };
        };

        $scope.save = (user) => {
            $scope.showLoading = true;

            let _user = angular.copy(user);
            _user.username = _user.prefixUsername + _user.username;

            $scope.onCloseAlert = () => $state.go('tenantUser.userManagement.home');
            TenantUserService.createInternalUser(_user.password, _user.username, _user.email)
                .then(() => {
                    $scope.showLoading = false;
                    $element.append($compile(`
                        <alert type="success" title="Add new user has been success." on-close="onCloseAlert()"></alert>
                    `)($scope));
                })
                .catch(err => {
                    $scope.showLoading = false;
                    $element.append($compile(`
                        <alert type="danger" title="${err.status}" on-close="onCloseAlert()"></alert>
                    `)($scope));
                });
        };
    }
})();