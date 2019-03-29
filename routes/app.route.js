(function () {
    'use strict';

    window.app
        .config(RouteApp);

    RouteApp.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RouteApp($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        [
            { name: 'login', url: '/login', component: 'login' },
            { name: 'tenantUser', url: '/tenant-user', component: 'tenantUserContainer' },
        ]
            .forEach(state => $stateProvider.state(state));
    }
})();