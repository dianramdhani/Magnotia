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

    tenantUserUserManagementFormUpdateUserController.$inject = ['$scope', '$rootScope', '$element', '$compile', '$state', '$stateParams', 'TenantUserService'];
    function tenantUserUserManagementFormUpdateUserController($scope, $rootScope, $element, $compile, $state, $stateParams, TenantUserService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            TenantUserService.getInternalUserByUsername($stateParams.username)
                .then(resGetInternalUserByUsername => $scope.user = resGetInternalUserByUsername);
        };

        $scope.update = (user) => {
            console.log(user);
        };
    }
})();