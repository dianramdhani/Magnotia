(function () {
    'use strict';

    window.app
        .config(TenantUserRoute);

    TenantUserRoute.$inject = ['$stateProvider'];
    function TenantUserRoute($stateProvider) {
        let states = [
            { name: 'tenantUser.applicationSuite.home', component: 'tenantUserApplicationSuiteHome' },
            { name: 'tenantUser.applicationSuite.formNewInstance', url: '/new-instance/{applicationSuiteId}', component: 'tenantUserApplicationSuiteFormNewInstance' },
            { name: 'tenantUser.applicationSuite.formUpdateInstance', url: '/reconfigure-instance/{applicationSuiteId}/{applicationInstanceId}', component: 'tenantUserApplicationSuiteFormUpdateApplicationInstance' }
        ];
        states.forEach(state => $stateProvider.state(state));
    }
})();