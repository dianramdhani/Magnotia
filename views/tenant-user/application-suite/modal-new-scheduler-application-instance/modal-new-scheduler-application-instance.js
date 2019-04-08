(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteModalNewSchedulerApplicationInstance', {
            template: require('./modal-new-scheduler-application-instance.html'),
            controller: tenantUserApplicationSuiteModalNewSchedulerApplicationInstanceController,
            bindings: {
                Binding: '=',
            },
        });

    tenantUserApplicationSuiteModalNewSchedulerApplicationInstanceController.$inject = [];
    function tenantUserApplicationSuiteModalNewSchedulerApplicationInstanceController() {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            console.log('testing hallo');
        };
    }
})();