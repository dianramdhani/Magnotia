(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserUserManagement', {
            template: require('./user-management.html'),
            controller: tenantUserUserManagementController
        });

    tenantUserUserManagementController.$inject = ['$scope', 'TenantUserService'];
    function tenantUserUserManagementController($scope, TenantUserService) {
        let $ctrl = this;
        $ctrl.$onInit = function () {
            TenantUserService.getInternalUser()
                .then(resGetInternalUser => $scope.users = resGetInternalUser);
        };
    }
})();