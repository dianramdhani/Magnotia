(function () {
    'use strict';

    window.app
        .service('TenantUserService', TenantUserService);

    TenantUserService.$inject = ['$http', '$q', '$rootScope', 'CONFIG'];
    function TenantUserService($http, $q, $rootScope, CONFIG) {
        this.browseDirectory = browseDirectory;

        const url = CONFIG.tenant;

        function browseDirectory(path) {
            let q = $q.defer(),
                params = { path };
            $http.get(`${url}/fileBrowserService/browseDirectory`, {
                params,
                headers: {
                    token: $rootScope.globals.currentUser.token,
                    username: $rootScope.globals.currentUser.username
                }
            }).then(res => q.resolve(res.data));
            return q.promise;
        }
    }
})();