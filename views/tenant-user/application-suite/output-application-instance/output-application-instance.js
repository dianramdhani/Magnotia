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

    tenantUserApplicationSuiteOutputApplicationInstanceController.$inject = ['$scope', '$stateParams', 'applicationPoolService'];
    function tenantUserApplicationSuiteOutputApplicationInstanceController($scope, $stateParams, applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            applicationPoolService.getApplicationSuite($stateParams.applicationSuiteId)
                .then(resGetApplicationSuite => $scope.applicationSuite = resGetApplicationSuite);
            applicationPoolService.getApplicationInstance($stateParams.applicationInstanceId)
                .then(resGetApplicationInstance => $scope.applicationInstance = resGetApplicationInstance);
            applicationPoolService.getApplicationInstanceProperties($stateParams.applicationInstanceId)
                .then(resGetApplicationInstanceProperties => $scope.dir = (resGetApplicationInstanceProperties.find(property => property.propertyName === 'Output Directory')).propertyValue);
        };
    }
})();