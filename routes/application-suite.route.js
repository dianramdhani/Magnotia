(function () {
    'use strict';

    window.app
        .config(TenantUserRoute);

    TenantUserRoute.$inject = ['$stateProvider'];
    function TenantUserRoute($stateProvider) {
        let states = [
            { name: 'tenantUser.applicationSuite.home', component: 'tenantUserApplicationSuiteHome' },
            { name: 'tenantUser.applicationSuite.formNewInstance', url: '/new-instance/{idApplicationSuite}', component: 'tenantUserApplicationSuiteFormNewInstance' }
        ];
        states.forEach(state => $stateProvider.state(state));
    }
})();