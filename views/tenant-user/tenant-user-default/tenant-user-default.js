(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserDefault', {
            template: require('./tenant-user-default.html'),
            controller: tenantUserDefaultController,
        });

    tenantUserDefaultController.$inject = [];

    function tenantUserDefaultController() {
        var $ctrl = this;

        $ctrl.$onInit = function () {};
    }
})();