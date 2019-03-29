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

    tenantUserDefaultController.$inject = [];

    function tenantUserDefaultController() {
        var $ctrl = this;

        $ctrl.$onInit = function () { };
    }
})();