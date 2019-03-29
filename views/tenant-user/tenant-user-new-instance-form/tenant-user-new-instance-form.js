(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserNewInstanceForm', {
            template: require('./tenant-user-new-instance-form.html'),
            controller: tenantUserNewInstanceFormController,
        });

    tenantUserNewInstanceFormController.$inject = [];

    function tenantUserNewInstanceFormController() {
        var $ctrl = this;

        $ctrl.$onInit = function () { };
    }
})();