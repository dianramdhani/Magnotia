(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserAppSuite', {
            template: require('./tenant-user-app-suite.html'),
            controller: tenantUserDefaultController,
        });

    tenantUserDefaultController.$inject = ['applicationPoolService'];

    function tenantUserDefaultController(applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () { };
    }
})();