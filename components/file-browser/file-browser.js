(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('fileBrowser', {
            template: require('./file-browser.html'),
            controller: fileBrowserController,
            bindings: {
                path: '<',
            },
        });

    fileBrowserController.$inject = ['$scope', 'TenantUserService'];
    function fileBrowserController($scope, TenantUserService) {
        var $ctrl = this;

        $ctrl.$onInit = function () { };
        $ctrl.$onChanges = function (e) {
            if (typeof e.path.currentValue !== 'undefined') {
                TenantUserService.browseDirectory($ctrl.path)
                    .then(resBrowseDirectory => $scope.dataBrowseDirectory = resBrowseDirectory);
            }
        };
    }
})();