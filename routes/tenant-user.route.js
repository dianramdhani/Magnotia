(function () {
    'use strict';

    window.app
        .config(TenantUserRoute);

    TenantUserRoute.$inject = ['$stateProvider'];
    function TenantUserRoute($stateProvider) {
        let states = [
            { name: 'tenantUser.appSuite', url: '/appsuite', component: 'tenantUserAppSuite' },
            { name: 'tenantUser.appSuiteNew', url: '/appsuite/new-instance/{idApplicationSuite}', component: 'tenantUserNewInstanceForm' },
            { name: 'tenantUser.dataBrowser', url: '/browser', template: 'dataBrowser' },
            { name: 'tenantUser.dataVisualization', url: '/visual', template: 'dataVisualization' },
            { name: 'tenantUser.dataExplorer', url: '/explorer', template: 'dataExplorer' },
            { name: 'tenantUser.userManagement', url: '/user', template: 'userManagement' },
        ];
        states.forEach(state => $stateProvider.state(state));
    }
})();