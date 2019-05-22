(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserUserManagementContainer', {
            template: require('./container.html'),
            controller: tenantUserUserManagementContainerController
        });

    tenantUserUserManagementContainerController.$inject = ['$state'];
    function tenantUserUserManagementContainerController($state) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $state.go('tenantUser.userManagement.home');
        };
    }
})();