(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteModalNewApplicationSuite', {
            template: require('./modal-new-application-suite.html'),
            controller: tenantUserApplicationSuiteModalNewApplicationSuiteController,
            bindings: {
                refreshApplicationSuiteList: '&',
            }
        });

    tenantUserApplicationSuiteModalNewApplicationSuiteController.$inject = ['$scope', '$rootScope', 'applicationPoolService'];
    function tenantUserApplicationSuiteModalNewApplicationSuiteController($scope, $rootScope, applicationPoolService) {
        var $ctrl = this;
        $scope.id = $scope.$id;

        $ctrl.$onInit = function () {
            $scope.focusFirstInput = () => angular.element(`#modal-${$scope.id}`).on('shown.bs.modal', () => angular.element(`#first-input-${$scope.id}`).focus());
            $scope.save = (applicationSuiteName) => {
                applicationPoolService.saveApplicationSuite({ applicationSuiteName, tenant: $rootScope.globals.currentUser.tenant })
                    .then(() => $ctrl.refreshApplicationSuiteList());
                $scope.applicationSuiteName = '';
                angular.element(`#modal-${$scope.id}`).modal('hide');
            };
        };
    }
})();