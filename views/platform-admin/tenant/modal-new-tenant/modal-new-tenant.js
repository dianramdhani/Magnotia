(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('platformAdminTenantModalNewTenant', {
            template: require('./modal-new-tenant.html'),
            controller: platformAdminTenantModalNewTenantController,
            bindings: {
                refreshTenants: '&'
            },
        });

    platformAdminTenantModalNewTenantController.$inject = ['$scope', '$timeout', '$element', '$compile', 'TenantUserService'];
    function platformAdminTenantModalNewTenantController($scope, $timeout, $element, $compile, TenantUserService) {
        let $ctrl = this,
            modalElement;
        $ctrl.$onInit = () => {
            $scope.id = $scope.$id;
            $timeout(() => {
                modalElement = angular.element(`#modal-${$scope.id}`);
                modalElement.on('shown.bs.modal', () => angular.element(`#first-input-${$scope.id}`).focus());
            });
        };

        $scope.save = async (tenantName) => {
            const
                close = () => {
                    $timeout(() => {
                        $scope.showLoading = false;
                        $scope.tenantName = '';
                        modalElement.modal('hide');
                    });
                },
                isSuccess = (res) => {
                    switch (res.status) {
                        case 'INTERNAL_SERVER_ERROR':
                            modalElement.on('hidden.bs.modal', () => {
                                $element.append($compile(`
                                    <alert type="danger" title="Failed!" body='${res.message}'></alert>
                                `)($scope));
                            });
                            break;
                    }
                    $ctrl.refreshTenants();
                    close();
                },
                isFailed = (message) => {
                    modalElement.on('hidden.bs.modal', () => {
                        $element.append($compile(`
                            <alert type="danger" title="Failed!" body="${message}"></alert>
                        `)($scope));
                    });
                    close();
                };

            $scope.showLoading = true;
            let availability = await TenantUserService.isTenantAvailable(tenantName);
            switch (availability.status) {
                case 'SUCCESS':
                    let res;
                    try {
                        res = await TenantUserService.createTenant(tenantName);
                    } catch (err) {
                        res = err;
                    }
                    isSuccess(res);
                    break;
                case 'FAILED':
                    isFailed(availability.message);
                    break;
            }
        };
    }
})();