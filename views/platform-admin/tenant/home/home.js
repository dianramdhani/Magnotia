(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('platformAdminTenantHome', {
            template: require('./home.html'),
            controller: platformAdminTenantHomeController
        });

    platformAdminTenantHomeController.$inject = ['$scope', 'TenantUserService'];
    function platformAdminTenantHomeController($scope, TenantUserService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.refreshTenants();
        };

        $scope.refreshTenants = () => {
            TenantUserService.getTenant(null, null)
                .then(resGetTenant => $scope.tenants = resGetTenant);
        };
    }
})();