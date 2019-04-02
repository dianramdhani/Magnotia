(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteFormUpdateApplicationInstance', {
            template: require('./form-update-application-instance.html'),
            controller: tenantUserApplicationSuiteFormUpdateApplicationInstanceController,
        });

    tenantUserApplicationSuiteFormUpdateApplicationInstanceController.$inject = [];
    function tenantUserApplicationSuiteFormUpdateApplicationInstanceController() {
        var $ctrl = this;

        $ctrl.$onInit = function () { };
    }
})();