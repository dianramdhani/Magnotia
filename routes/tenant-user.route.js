(function () {
    'use strict';

    window.app
        .config(TenantUserRoute);

    TenantUserRoute.$inject = ['$stateProvider'];
    function TenantUserRoute($stateProvider) {
        let states = [
            { name: 'tenantUser.appSuite', url: '/appsuite', component: 'tenantUserAppSuite' },
        ];
        states.forEach(state => $stateProvider.state(state));
    }
})();