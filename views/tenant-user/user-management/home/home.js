(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserUserManagementHome', {
            template: require('./home.html'),
            controller: tenantUserUserManagementHomeController
        });

    tenantUserUserManagementHomeController.$inject = ['$scope', 'TenantUserService'];
    function tenantUserUserManagementHomeController($scope, TenantUserService) {
        let $ctrl = this;
        $ctrl.$onInit = function () {
            TenantUserService.getInternalUser()
                .then(resGetInternalUser => $scope.users = resGetInternalUser);
        };
    }
})();