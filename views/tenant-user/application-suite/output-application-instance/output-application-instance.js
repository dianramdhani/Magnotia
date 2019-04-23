(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteOutputApplicationInstance', {
            template: require('./output-application-instance.html'),
            controller: tenantUserApplicationSuiteOutputApplicationInstanceController
        });

    tenantUserApplicationSuiteOutputApplicationInstanceController.$inject = ['$scope', '$stateParams', '$state', '$element', '$compile', 'applicationPoolService'];
    function tenantUserApplicationSuiteOutputApplicationInstanceController($scope, $stateParams, $state, $element, $compile, applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.applicationSuiteId = $stateParams.applicationSuiteId;
            $scope.onError = (err) => {
                $scope.onClose = () => $state.go('tenantUser.applicationSuite.home.applicationInstance', { applicationSuiteId: $scope.applicationSuiteId });
                $element.append($compile(`<alert type="danger" title="${err.status}" body="${err.message}" on-close="onClose()"></alert>`)($scope));
            };

            applicationPoolService.getApplicationSuite($stateParams.applicationSuiteId)
                .then(resGetApplicationSuite => $scope.applicationSuite = resGetApplicationSuite);
            applicationPoolService.getApplicationInstance($stateParams.applicationInstanceId)
                .then(resGetApplicationInstance => $scope.applicationInstance = resGetApplicationInstance);
            applicationPoolService.getApplicationInstanceProperties($stateParams.applicationInstanceId)
                .then(resGetApplicationInstanceProperties => $scope.dir = (resGetApplicationInstanceProperties.find(property => property.propertyName === 'Output Directory')).propertyValue);
        };
    }
})();