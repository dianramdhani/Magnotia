(function () {
    'use strict';

    window.app
        .config(TenantUserRoute);

    TenantUserRoute.$inject = ['$stateProvider'];
    function TenantUserRoute($stateProvider) {
        let states = [
            { name: 'tenantUser.applicationSuite', component: 'tenantUserApplicationSuiteContainer' },
            { name: 'tenantUser.dataBrowser', url: '/browser', component: 'tenantUserDataBrowser' },
            { name: 'tenantUser.dataExplorer', url: '/explorer', component: 'tenantUserDataExplorer' },
            { name: 'tenantUser.userManagement', component: 'tenantUserUserManagementContainer' },
        ];
        states.forEach(state => $stateProvider.state(state));
    }
})();