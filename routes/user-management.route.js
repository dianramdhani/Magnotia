(function () {
    'use strict';

    window.app
        .config(UserManagementRoute);

    UserManagementRoute.$inject = ['$stateProvider'];
    function UserManagementRoute($stateProvider) {
        let states = [
            { name: 'tenantUser.userManagement.home', url: '/user', component: 'tenantUserUserManagementHome' },
            { name: 'tenantUser.userManagement.new', url: '/new-user', component: 'tenantUserUserManagementFormNewUser' },
            { name: 'tenantUser.userManagement.update', url: '/user-update/{username}', component: 'tenantUserUserManagementFormUpdateUser' }
        ];
        states.forEach(state => $stateProvider.state(state));
    }
})();