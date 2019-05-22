(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserUserManagementHome', {
            template: require('./home.html'),
            controller: tenantUserUserManagementHomeController
        });

    tenantUserUserManagementHomeController.$inject = ['$scope', '$element', '$compile', 'TenantUserService'];
    function tenantUserUserManagementHomeController($scope, $element, $compile, TenantUserService) {
        const
            refreshUser = () => {
                TenantUserService.getInternalUser()
                    .then(resGetInternalUser => $scope.users = resGetInternalUser);
            };

        let $ctrl = this;
        $ctrl.$onInit = function () {
            refreshUser();
        };

        $scope.delete = (username) => {
            $scope.onDeleteUser = () => {
                TenantUserService.deleteInternalUser(username)
                    .then(() => {
                        $element.append($compile(`
                            <alert type="success" title="The selected user has been deleted successfully."></alert>
                        `)($scope));
                        refreshUser();
                    });
            };
            $element.append($compile(`
                <delete title="Revoke This User?"
                    body="Confirm if you are really want to revoke <strong>${username}</strong>."
                    on-delete="onDeleteUser()">
                </delete> 
            `)($scope));
        };
    }
})();