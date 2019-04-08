(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteListSchedulerApplicationInstance', {
            // template: require('./list-scheduler-application-instance.html'),
            template: './list-scheduler-application-instance.html',
            controller: tenantUserApplicationSuiteListSchedulerApplicationInstanceController
        });

    tenantUserApplicationSuiteListSchedulerApplicationInstanceController.$inject = [];
    function tenantUserApplicationSuiteListSchedulerApplicationInstanceController() {
        var $ctrl = this;

        $ctrl.$onInit = function () { };
    }
})();