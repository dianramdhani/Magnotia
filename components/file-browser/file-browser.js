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
                onError: '&',
                backRootStatus: '<',
                onBackRoot: '&'
            },
        });

    fileBrowserController.$inject = ['$scope', '$log', 'TenantUserService'];
    function fileBrowserController($scope, $log, TenantUserService) {
        var $ctrl = this;
        $scope.$log = $log;

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
            $scope.download = (fileDetail) => TenantUserService.downloadFile(fileDetail.filePath)
                .then(resDownloadFile => saveAs(resDownloadFile, fileDetail.fileName));

        };
        $ctrl.$onChanges = function (e) {
            if (typeof e.rootDir.currentValue !== 'undefined') {
                if ($ctrl.rootDir) {
                    TenantUserService.browseDirectory($ctrl.rootDir)
                        .then(resBrowseDirectory => $scope.dataBrowseDirectory = resBrowseDirectory)
                        .catch(err => $ctrl.onError({ err }));
                }
            }
        };
    }
})();