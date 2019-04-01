(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserAppSuite', {
            template: require('./tenant-user-app-suite.html'),
            controller: tenantUserDefaultController,
        });

    tenantUserDefaultController.$inject = ['$scope', '$log', '$rootScope', 'applicationPoolService'];

    function tenantUserDefaultController($scope, $log, $rootScope, applicationPoolService) {
        var $ctrl = this;
        $scope.$log = $log;

        $ctrl.$onInit = function () {
            applicationPoolService.getApplicationSuiteList($rootScope.globals.currentUser.tenant)
                .then(resGetApplicationSuiteList => {
                    $scope.applicationSuiteList = resGetApplicationSuiteList;
                    $scope.applicationSuiteNow = $scope.applicationSuiteList[0];
                });
            $scope.setApplicationSuiteNow = (i) => {
                $scope.applicationSuiteNow = $scope.applicationSuiteList[i];
            };

            $scope.$watch('applicationSuiteNow', (nowVal) => {
                if (typeof (nowVal) !== 'undefined') {
                    applicationPoolService.getApplicationInstanceList(nowVal.id)
                        .then(resGetApplicationInstanceList => {
                            console.log(nowVal, resGetApplicationInstanceList);
                            $scope.applicationInstanceList = resGetApplicationInstanceList;
                        });
                }
            });
        };
    }
})();