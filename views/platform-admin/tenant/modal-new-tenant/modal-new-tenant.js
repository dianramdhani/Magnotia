(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('platformAdminTenantModalNewTenant', {
            template: require('./modal-new-tenant.html'),
            controller: platformAdminTenantModalNewTenantController
        });

    platformAdminTenantModalNewTenantController.$inject = ['$scope'];
    function platformAdminTenantModalNewTenantController($scope) {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();