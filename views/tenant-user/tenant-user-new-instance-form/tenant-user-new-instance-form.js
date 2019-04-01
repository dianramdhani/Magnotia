(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserNewInstanceForm', {
            template: require('./tenant-user-new-instance-form.html'),
            controller: tenantUserNewInstanceFormController,
        });

    tenantUserNewInstanceFormController.$inject = ['$scope', 'applicationPoolService'];

    function tenantUserNewInstanceFormController($scope, applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            applicationPoolService.getApplicationList()
                .then(resGetApplicationList => $scope.applicationList = resGetApplicationList);

            $scope.setApplicationNow = (application) => $scope.applicationNow = application;
        };
    }
})();