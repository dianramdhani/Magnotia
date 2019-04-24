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

    tenantUserApplicationSuiteListSchedulerApplicationInstanceController.$inject = ['$scope', '$stateParams', '$element', '$compile', 'applicationPoolService'];
    function tenantUserApplicationSuiteListSchedulerApplicationInstanceController($scope, $stateParams, $element, $compile, applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.applicationSuiteId = $stateParams.applicationSuiteId;

            applicationPoolService.getApplicationSuite($stateParams.applicationSuiteId)
                .then(resGetApplicationSuite => $scope.applicationSuite = resGetApplicationSuite);
            applicationPoolService.getApplicationInstance($stateParams.applicationInstanceId)
                .then(resGetApplicationInstance => $scope.applicationInstance = resGetApplicationInstance);
            $scope.refreshInstanceSchedulerList = () => {
                applicationPoolService.getInstanceSchedulerList($stateParams.applicationInstanceId)
                    .then(resGetInstanceSchedulerList => {
                        $scope.instanceSchedulerList = resGetInstanceSchedulerList;
                        $scope.instanceSchedulerList.forEach(_resGetInstanceSchedulerList => {
                            applicationPoolService.getOrchestratorService(_resGetInstanceSchedulerList.orchestratorServiceId)
                                .then(resApplicationPoolService => _resGetInstanceSchedulerList['dataApplicationPoolService'] = resApplicationPoolService);
                        });
                    });
            }
            $scope.refreshInstanceSchedulerList();
            $scope.deleteSchedule = (scheduleId) => {
                $scope.onDeleteSchedule = () => {
                    applicationPoolService.removeInstanceSchedule(scheduleId)
                        .then(() => {
                            $element.append($compile(`<alert type="success" title="Delete success."></alert>`)($scope));
                            $scope.refreshInstanceSchedulerList();
                        });
                };
                $element.append($compile(`
                    <delete title="Delete This Schedule?"
                        body="Confirm if you are going to delete this schedule."
                        on-delete="onDeleteSchedule()">
                    </delete> 
                `)($scope));
            };
            $scope.startSchedule = (scheduleId) => {
                applicationPoolService.startInstanceScheduler(scheduleId)
                    .then((resStartInstanceScheduler) => {
                        switch (resStartInstanceScheduler.status) {
                            case 'OK':
                                $element.append($compile(`<alert type="success" title="Starting instance service schedule success."></alert>`)($scope));
                                break;
                            case 'FAILED':
                                $element.append($compile(`<alert type="danger" title="Instance service schedule is already running!"></alert>`)($scope));
                                break;
                        }
                    });
            };
        };
    }
})();