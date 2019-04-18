(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteHome', {
            template: require('./home.html'),
            controller: tenantUserApplicationSuiteHomeController,
        });

    tenantUserApplicationSuiteHomeController.$inject = ['$scope', '$log', '$rootScope', '$element', '$compile', '$state', 'applicationPoolService'];

    function tenantUserApplicationSuiteHomeController($scope, $log, $rootScope, $element, $compile, $state, applicationPoolService) {
        var $ctrl = this;
        $scope.$log = $log;
        $scope.id = $scope.$id;

        $ctrl.$onInit = function () {
            $scope.refreshApplicationSuiteList = () => {
                applicationPoolService.getApplicationSuiteList($rootScope.globals.currentUser.tenant)
                    .then(resGetApplicationSuiteList => {
                        $scope.applicationSuiteList = resGetApplicationSuiteList;
                        /**
                         * @todo
                         * cek dari $state sebelumnya
                         * jika belum ada maka $scope.applicationSuiteNow = $scope.applicationSuiteList[0]
                         */
                        // $scope.applicationSuiteNow = $scope.applicationSuiteList[0];
                    });
            };
            $scope.refreshApplicationSuiteList();

            $scope.setApplicationSuiteNow = (applicationSuite) => $scope.applicationSuiteNow = applicationSuite;
            $scope.$watch('applicationSuiteNow', (nowVal) => {
                if (typeof nowVal !== 'undefined') {
                    $state.go('tenantUser.applicationSuite.home.applicationInstance', { applicationSuiteId: $scope.applicationSuiteNow.id });
                }
            });

            $scope.deleteApplicationSuite = (applicationSuite) => {
                applicationPoolService.getApplicationInstanceList(applicationSuite.id)
                    .then(resGetApplicationInstanceList => {
                        if (resGetApplicationInstanceList.length === 0) {
                            $scope.onDeleteApplicationSuite = () => {
                                applicationPoolService.removeApplicationSuite(applicationSuite.id)
                                    .then(() => {
                                        $element.append($compile(`<alert type="success" title="Delete success."></alert>`)($scope));
                                        $scope.refreshApplicationSuiteList();
                                    });
                            };
                            $element.append($compile(`
                                <delete title="Delete This Application Suite?"
                                    body="Confirm if you are going to delete <strong>${applicationSuite.applicationSuiteName}</strong> Application Suite."
                                    on-delete="onDeleteApplicationSuite()">
                                </delete> 
                            `)($scope));
                        } else {
                            $element.append($compile(`
                                <alert type="danger" title="Delete failed!" body="Application instance must be empty."></alert>
                            `)($scope));
                        }
                    });
            };
        };
    }
})();