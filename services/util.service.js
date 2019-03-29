(function () {
    'use strict';

    window.app
        .service('UtilService', UtilService);

    UtilService.$inject = ['$state'];
    function UtilService($state) {
        this.goToStateByRole = goToStateByRole;

        function goToStateByRole(role) {
            switch (role) {
                case 'TENANT_USER':
                    $state.go('tenantUser');
                    break;
                case 'PLATFORM_ADMIN':
                    $state.go('platformAdmin');
                    break;
            }
        }
    }
})();