(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserDataBrowser', {
            template: require('./data-browser.html'),
            controller: tenantUserDataBrowserController
        });

    tenantUserDataBrowserController.$inject = ['$scope', '$rootScope', '$q', 'TenantUserService'];
    function tenantUserDataBrowserController($scope, $rootScope, $q, TenantUserService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $q.all([
                TenantUserService.diskUsage(`/tenant/${$rootScope.globals.currentUser.tenant}`, false),
                TenantUserService.diskUsage(`/user/${$rootScope.globals.currentUser.username}`, false)
            ])
                .then(resAll => {
                    $scope.directories = [
                        {
                            fileName: 'Tenant Storage',
                            filePath: `/tenant/${$rootScope.globals.currentUser.tenant}`,
                            byteSize: resAll[0].details[0].humanSize
                        },
                        {
                            fileName: 'User Storage',
                            filePath: `/tenant/${$rootScope.globals.currentUser.username}`,
                            byteSize: resAll[1].details[0].humanSize,
                        }
                    ];
                });
            $scope.dir = null;
            $scope.open = (filePath) => $scope.dir = filePath;
            $scope.onBackRoot = () => $scope.dir = null;
        };
    }
})();