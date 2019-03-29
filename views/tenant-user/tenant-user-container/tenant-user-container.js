(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserContainer', {
            template: require('./tenant-user-container.html'),
            controller: tenantUserContainerController,
        });

    tenantUserContainerController.$inject = [];

    function tenantUserContainerController() {
        var $ctrl = this;

        $ctrl.$onInit = function () {};
    }
})();