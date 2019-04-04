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

    tenantUserApplicationSuiteFormUpdateApplicationInstanceController.$inject = ['$q', '$stateParams', 'applicationPoolService'];
    function tenantUserApplicationSuiteFormUpdateApplicationInstanceController($q, $stateParams, applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            console.log($stateParams)
            $q.all([
                applicationPoolService.getApplicationInstance($stateParams.applicationInstanceId),
                applicationPoolService.getApplicationInstanceProperties($stateParams.applicationInstanceId)
            ])
                .then(res => console.log(res));
        };
    }
})();