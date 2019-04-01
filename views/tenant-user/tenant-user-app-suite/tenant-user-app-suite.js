(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserAppSuite', {
            template: require('./tenant-user-app-suite.html'),
            controller: tenantUserDefaultController,
        });

    tenantUserDefaultController.$inject = ['$scope', '$log', '$rootScope', 'applicationPoolService'];

    function tenantUserDefaultController($scope, $log, $rootScope, applicationPoolService) {
        var $ctrl = this;
        $scope.$log = $log;

        $ctrl.$onInit = function () {
            applicationPoolService.getApplicationSuiteList($rootScope.globals.currentUser.tenant)
                .then(resGetApplicationSuiteList => {
                    $scope.applicationSuiteList = resGetApplicationSuiteList;
                    $scope.applicationSuiteNow = $scope.applicationSuiteList[0];
                });
            $scope.setApplicationSuiteNow = (i) => {
                $scope.applicationSuiteNow = $scope.applicationSuiteList[i];
            };

            $scope.$watch('applicationSuiteNow', (nowVal) => {
                if (typeof (nowVal) !== 'undefined') {
                    applicationPoolService.getApplicationInstanceList(nowVal.id)
                        .then(resGetApplicationInstanceList => {
                            $scope.applicationInstanceList = resGetApplicationInstanceList;
                            angular.forEach($scope.applicationInstanceList, _applicationInstanceList => {
                                applicationPoolService.getApplication(_applicationInstanceList.applicationId)
                                    .then(resGetApplication => {
                                        _applicationInstanceList['dataGetApplication'] = resGetApplication;
                                        applicationPoolService.getOrchestratorServiceList(resGetApplication.orchestratorId, null, null, 'checkRunningStatus')
                                            .then(resGetOrchestratorServiceList => {
                                                _applicationInstanceList.dataGetApplication['dataGetOrchestratorServiceList'] = resGetOrchestratorServiceList[0];
                                                applicationPoolService.executeInstanceOperation(_applicationInstanceList.id, resGetOrchestratorServiceList[0].id)
                                                    .then(resExecuteInstanceOperation => _applicationInstanceList['dataExecuteInstanceOperation'] = resExecuteInstanceOperation);
                                            });
                                    });
                            });
                        });
                }
            });
        };
    }
})();