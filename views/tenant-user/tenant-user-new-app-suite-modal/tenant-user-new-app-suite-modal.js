(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserNewAppSuiteModal', {
            template: require('./tenant-user-new-app-suite-modal.html'),
            controller: tenantUserNewAppSuiteModalController,
            bindings: {
                idModal: '=',
            }
        });

    tenantUserNewAppSuiteModalController.$inject = ['$scope'];
    function tenantUserNewAppSuiteModalController($scope) {
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