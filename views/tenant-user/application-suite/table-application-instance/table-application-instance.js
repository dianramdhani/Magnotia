(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteTableApplicationInstance', {
            template: require('./table-application-instance.html'),
            controller: tenantUserApplicationSuiteTableApplicationInstanceController
        });

    tenantUserApplicationSuiteTableApplicationInstanceController.$inject = ['$stateParams', '$scope', '$element', '$compile', 'applicationPoolService'];
    function tenantUserApplicationSuiteTableApplicationInstanceController($stateParams, $scope, $element, $compile, applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.applicationSuiteId = $stateParams.applicationSuiteId;
            let refreshApplicationInstanceList = () => {
                applicationPoolService.getApplicationInstanceList($scope.applicationSuiteId)
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
            refreshApplicationInstanceList();

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