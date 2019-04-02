(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteFormNewInstance', {
            template: require('./form-new-instance.html'),
            controller: tenantUserApplicationSuiteFormNewInstanceController,
        });

    tenantUserApplicationSuiteFormNewInstanceController.$inject = ['$scope', 'applicationPoolService'];

    function tenantUserApplicationSuiteFormNewInstanceController($scope, applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            applicationPoolService.getApplicationList()
                .then(resGetApplicationList => $scope.applicationList = resGetApplicationList);

            $scope.setApplicationNow = (application) => $scope.applicationNow = application;
        };
    }
})();