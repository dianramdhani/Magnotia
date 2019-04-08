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

    tenantUserApplicationSuiteModalNewSchedulerApplicationInstanceController.$inject = ['$scope', '$stateParams', 'applicationPoolService'];
    function tenantUserApplicationSuiteModalNewSchedulerApplicationInstanceController($scope, $stateParams, applicationPoolService) {
        var $ctrl = this;
        $scope.id = $scope.$id;

        $ctrl.$onInit = function () {
            $scope.focusFirstInput = () => angular.element(`#modal-${$scope.id}`).on('shown.bs.modal', () => angular.element(`#first-input-${$scope.id}`).focus());
            applicationPoolService.getApplicationInstance($stateParams.applicationInstanceId)
                .then(resGetApplicationInstance => {
                    applicationPoolService.getApplication(resGetApplicationInstance.applicationId)
                        .then(resGetApplication => {
                            applicationPoolService.getOrchestratorServiceList(resGetApplication.orchestratorId, null, true)
                                .then(resGetOrchestratorServiceList => $scope.services = resGetOrchestratorServiceList);
                        });
                });
        };
    }
})();