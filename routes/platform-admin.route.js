(function () {
    'use strict';

    window.app
        .config(PlatformAdminRoute);

    PlatformAdminRoute.$inject = ['$stateProvider'];
    function PlatformAdminRoute($stateProvider) {
        let states = [
            { name: 'platformAdmin.dashboard', url: '/dashboard', template: 'dashboard' },
            { name: 'platformAdmin.orchestrator', url: '/orchestrator', template: 'orchestrator' },
            { name: 'platformAdmin.tenant', url: '/tenant', component: 'platformAdminTenantHome' }
        ];
        states.forEach(state => $stateProvider.state(state));
    }
})();