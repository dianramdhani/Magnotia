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
                refreshInstanceSchedulerList: '&'
            },
        });

    tenantUserApplicationSuiteModalNewSchedulerApplicationInstanceController.$inject = ['$scope', '$stateParams', '$timeout', 'applicationPoolService'];
    function tenantUserApplicationSuiteModalNewSchedulerApplicationInstanceController($scope, $stateParams, $timeout, applicationPoolService) {
        var $ctrl = this;
        $scope.id = $scope.$id;

        $ctrl.$onInit = function () {
            let modalElement;
            $timeout(() => modalElement = angular.element(`#modal-${$scope.id}`));
            applicationPoolService.getApplicationInstance($stateParams.applicationInstanceId)
                .then(resGetApplicationInstance => {
                    applicationPoolService.getApplication(resGetApplicationInstance.applicationId)
                        .then(resGetApplication => {
                            applicationPoolService.getOrchestratorServiceList(resGetApplication.orchestratorId, null, true)
                                .then(resGetOrchestratorServiceList => $scope.services = resGetOrchestratorServiceList);
                        });
                });

            $scope.focusFirstInput = () => modalElement.on('shown.bs.modal', () => angular.element(`#first-input-${$scope.id}`).focus());
            $scope.save = (schedule) => {
                schedule['applicationInstanceId'] = $stateParams.applicationInstanceId;
                applicationPoolService.saveInstanceScheduler(schedule)
                    .then(() => {
                        $ctrl.refreshInstanceSchedulerList();
                        $scope.schedule = null;
                        modalElement.modal('hide');
                    });
            };
        };
    }
})();