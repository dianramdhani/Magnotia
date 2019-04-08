(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteListSchedulerApplicationInstance', {
            template: require('./list-scheduler-application-instance.html'),
            controller: tenantUserApplicationSuiteListSchedulerApplicationInstanceController
        });

    tenantUserApplicationSuiteListSchedulerApplicationInstanceController.$inject = ['$scope', '$q', '$stateParams', 'applicationPoolService'];
    function tenantUserApplicationSuiteListSchedulerApplicationInstanceController($scope, $q, $stateParams, applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            applicationPoolService.getApplicationSuite($stateParams.applicationSuiteId)
                .then(resGetApplicationSuite => $scope.applicationSuite = resGetApplicationSuite);
            applicationPoolService.getApplicationInstance($stateParams.applicationInstanceId)
                .then(resGetApplicationInstance => $scope.applicationInstance = resGetApplicationInstance);
            applicationPoolService.getInstanceSchedulerList($stateParams.applicationInstanceId)
                .then(resGetInstanceSchedulerList => {
                    $scope.instanceSchedulerList = resGetInstanceSchedulerList;
                    $scope.instanceSchedulerList.forEach(_resGetInstanceSchedulerList => {
                        applicationPoolService.getOrchestratorService(_resGetInstanceSchedulerList.orchestratorServiceId)
                            .then(resApplicationPoolService => _resGetInstanceSchedulerList['dataApplicationPoolService'] = resApplicationPoolService);
                    });
                });
        };
    }
})();