(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('platformAdminTenantModalNewTenant', {
            template: require('./modal-new-tenant.html'),
            controller: platformAdminTenantModalNewTenantController,
            bindings: {
                refreshTenants: '&'
            },
        });

    platformAdminTenantModalNewTenantController.$inject = ['$scope', '$timeout'];
    function platformAdminTenantModalNewTenantController($scope, $timeout) {
        let $ctrl = this,
            modalElement;
        $ctrl.$onInit = () => {
            $scope.id = $scope.$id;
            $timeout(() => {
                modalElement = angular.element(`#modal-${$scope.id}`);
                modalElement.on('shown.bs.modal', () => angular.element(`#first-input-${$scope.id}`).focus());
            });
        };

        $scope.save = (tenantName) => {
            console.log(tenantName);
            $ctrl.refreshTenants();
            $scope.tenantName = '';
            modalElement.modal('hide');
        };
    }
})();