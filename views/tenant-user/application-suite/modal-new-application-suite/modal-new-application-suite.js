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
                idModal: '=',
            }
        });

    tenantUserApplicationSuiteModalNewApplicationSuiteController.$inject = ['$scope'];
    function tenantUserApplicationSuiteModalNewApplicationSuiteController($scope) {
        var $ctrl = this;
        $scope.id = $scope.$id;

        $ctrl.$onInit = function () {
            $scope.focusFirstInput = () => angular.element(`#modal-${$scope.id}`).on('shown.bs.modal', () => angular.element(`#first-input-${$scope.id}`).focus());
            $scope.save = (nameApplicationSuite) => {
                console.log('nameApplicationSuite', nameApplicationSuite);
                $scope.nameApplicationSuite = '';
                angular.element(`#modal-${$scope.id}`).modal('hide');
            };
        };
    }
})();