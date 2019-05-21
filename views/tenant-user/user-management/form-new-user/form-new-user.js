(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserUserManagementFormNewUser', {
            template: require('./form-new-user.html'),
            controller: tenantUserUserManagementFormNewUserController
        });

    tenantUserUserManagementFormNewUserController.$inject = ['$scope'];
    function tenantUserUserManagementFormNewUserController($scope) {
        var $ctrl = this;
        $ctrl.$onInit = function () { };
    }
})();