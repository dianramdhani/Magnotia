(function () {
    'use strict';

    window.app
        .config(UserManagementRoute);

    UserManagementRoute.$inject = ['$stateProvider'];
    function UserManagementRoute($stateProvider) {
        let states = [
            { name: 'tenantUser.userManagement.home', url: '/user', component: 'tenantUserUserManagementHome' },
        ];
        states.forEach(state => $stateProvider.state(state));
    }
})();