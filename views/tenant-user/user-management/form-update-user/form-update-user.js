(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserUserManagementFormUpdateUser', {
            template: require('./form-update-user.html'),
            controller: tenantUserUserManagementFormUpdateUserController
        });

    tenantUserUserManagementFormUpdateUserController.$inject = ['$scope', '$element', '$compile', '$state', '$stateParams', 'TenantUserService'];
    function tenantUserUserManagementFormUpdateUserController($scope, $element, $compile, $state, $stateParams, TenantUserService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            TenantUserService.getInternalUserByUsername($stateParams.username)
                .then(resGetInternalUserByUsername => $scope.user = resGetInternalUserByUsername);
        };

        $scope.update = (user) => {
            TenantUserService.updateInternalUser(user)
                .then(resUpdateInternalUser => {
                    $scope.onCloseAlert = () => $state.go('tenantUser.userManagement.home');
                    $element.append($compile(`
                        <alert type="success" title="${resUpdateInternalUser.message}" on-close="onCloseAlert()"></alert>
                    `)($scope));
                });
        };
    }
})();