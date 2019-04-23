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
                rootDir: '<',
                onError: '&'
            },
        });

    fileBrowserController.$inject = ['$scope', 'TenantUserService'];
    function fileBrowserController($scope, TenantUserService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.onClick = (fileDetail) => {
                if (fileDetail.type === 'DIRECTORY') {
                    TenantUserService.browseDirectory(fileDetail.filePath)
                        .then(resBrowseDirectory => $scope.dataBrowseDirectory = resBrowseDirectory);
                }
            };
            $scope.upDir = () => {
                const removeLastDir = (dir) => dir.substring(0, dir.lastIndexOf('/'));
                TenantUserService.browseDirectory(removeLastDir($scope.dataBrowseDirectory.currentDir))
                    .then(resBrowseDirectory => $scope.dataBrowseDirectory = resBrowseDirectory);
            };
        };
        $ctrl.$onChanges = function (e) {
            if (typeof e.rootDir.currentValue !== 'undefined') {
                TenantUserService.browseDirectory($ctrl.rootDir)
                    .then(resBrowseDirectory => $scope.dataBrowseDirectory = resBrowseDirectory)
                    .catch(err => $ctrl.onError({ err }));
            }
        };
    }
})();