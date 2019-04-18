(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteHome', {
            template: require('./home.html'),
            controller: tenantUserApplicationSuiteHomeController,
        });

    tenantUserApplicationSuiteHomeController.$inject = ['$scope', '$log', '$rootScope', '$element', '$compile', 'applicationPoolService'];

    function tenantUserApplicationSuiteHomeController($scope, $log, $rootScope, $element, $compile, applicationPoolService) {
        var $ctrl = this;
        $scope.$log = $log;
        $scope.id = $scope.$id;

        $ctrl.$onInit = function () {
            $scope.refreshApplicationSuiteList = () => {
                applicationPoolService.getApplicationSuiteList($rootScope.globals.currentUser.tenant)
                    .then(resGetApplicationSuiteList => {
                        $scope.applicationSuiteList = resGetApplicationSuiteList;
                        $scope.applicationSuiteNow = $scope.applicationSuiteList[0];
                    });
            };
            $scope.refreshApplicationSuiteList();
            $scope.setApplicationSuiteNow = (applicationSuite) => $scope.applicationSuiteNow = applicationSuite;

            let refreshApplicationInstanceList = () => {
                applicationPoolService.getApplicationInstanceList($scope.applicationSuiteNow.id)
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
                                    applicationPoolService.getOrchestratorServiceList(resGetApplication.orchestratorId, null, true)
                                        .then(resGetOrchestratorServiceList => _applicationInstanceList.dataGetApplication['dataServices'] = resGetOrchestratorServiceList);
                                });
                        });
                    });
            };
            $scope.$watch('applicationSuiteNow', (nowVal) => {
                if (typeof nowVal !== 'undefined') {
                    refreshApplicationInstanceList();
                }
            });

            $scope.deleteApplicationSuite = (applicationSuite) => {
                applicationPoolService.getApplicationInstanceList(applicationSuite.id)
                    .then(resGetApplicationInstanceList => {
                        if (resGetApplicationInstanceList.length === 0) {
                            $scope.onDeleteApplicationSuite = () => {
                                applicationPoolService.removeApplicationSuite(applicationSuite.id)
                                    .then(() => {
                                        $element.append($compile(`<alert type="success" title="Delete success."></alert>`)($scope));
                                        $scope.refreshApplicationSuiteList();
                                    });
                            };
                            $element.append($compile(`
                                <delete title="Delete This Application Suite?"
                                    body="Confirm if you are going to delete <strong>${applicationSuite.applicationSuiteName}</strong> Application Suite."
                                    on-delete="onDeleteApplicationSuite()">
                                </delete> 
                            `)($scope));
                        } else {
                            $element.append($compile(`
                                <alert type="danger" title="Delete failed!" body="Application instance must be empty."></alert>
                            `)($scope));
                        }
                    });
            };

            $scope.deleteApplicationInstance = (applicationInstance) => {
                if (/Process group|STOPPED/.test(applicationInstance.dataExecuteInstanceOperation.notes)) {
                    $scope.onDeleteApplicationInstance = () => {
                        applicationPoolService.removeApplicationInstance(applicationInstance.id)
                            .finally(() => {
                                $element.append($compile(`<alert type="success" title="Delete success."></alert>`)($scope));
                                refreshApplicationInstanceList();
                            });
                    };
                    $element.append($compile(`
                        <delete title="Delete This Application Instance?"
                            body="Confirm if you are going to delete <strong>${applicationInstance.name}</strong> Application Instance."
                            on-delete="onDeleteApplicationInstance()">
                        </delete> 
                    `)($scope));
                } else {
                    $element.append($compile(`
                        <alert type="danger" title="Delete failed!" body="Please stop or delete flow this application instance before."></alert>
                    `)($scope));
                }
            };

            $scope.execute = (applicationInstance, service) => {
                applicationPoolService.executeInstanceOperation(applicationInstance.id, service.id)
                    .then(() => {
                        $element.append($compile(`
                            <alert type="success" title="Execute command success."></alert>
                        `)($scope));
                        refreshApplicationInstanceList();
                    })
                    .catch(err => {
                        $element.append($compile(`
                            <alert type="danger" title="${err.message}"></alert>
                        `)($scope));
                    });
            };
        };
    }
})();