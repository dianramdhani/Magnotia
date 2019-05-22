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

    platformAdminTenantHomeController.$inject = ['$scope'];
    function platformAdminTenantHomeController($scope) {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();