(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserAddApplication', {
            template: require('./tenant-user-add-application.html'),
            controller: tenantUserAddApplicationController,
        });

    tenantUserAddApplicationController.$inject = [];

    function tenantUserAddApplicationController() {
        var $ctrl = this;

        $ctrl.$onInit = function () {};
    }
})();