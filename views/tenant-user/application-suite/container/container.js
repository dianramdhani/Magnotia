(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteContainer', {
            template: require('./container.html'),
            controller: tenantUserApplicationSuiteContainerController
        });

    tenantUserApplicationSuiteContainerController.$inject = ['$state'];
    function tenantUserApplicationSuiteContainerController($state) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $state.go('tenantUser.applicationSuite.home');
        };
    }
})();