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
                rootDir: '<',                   // Type string. String of root path.
                onError: '&',
                backRootStatus: '<',            // Type boolean. Optional if can back on root.
                onBackRoot: '&',
                addFileOrNewFolderStatus: '='   // Type boolean. Optional if can add file or create new folder.
            },
        });

    fileBrowserController.$inject = ['$scope', '$log', '$timeout', '$element', '$compile', 'TenantUserService'];
    function fileBrowserController($scope, $log, $timeout, $element, $compile, TenantUserService) {
        var $ctrl = this;
        $scope.$log = $log;
        $scope.id = $scope.$id;

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
            $scope.addFolder = () => {
                $scope.formAddFolderShow = true;
                $timeout(() => angular.element(`#first-input-${$scope.id}`).focus());
            };
            $scope.saveFolder = (folderName) => {
                let checkSameFolderName = typeof $scope.dataBrowseDirectory.fileDetails.find(fileDetail => fileDetail.type === 'DIRECTORY' && fileDetail.fileName === folderName) === 'undefined';
                if (checkSameFolderName) {
                    TenantUserService.makeDirectory($scope.dataBrowseDirectory.currentDir, folderName)
                        .then(() => {
                            $scope.folderName = '';
                            $scope.formAddFolderShow = false;
                            TenantUserService.browseDirectory($scope.dataBrowseDirectory.currentDir)
                                .then(resBrowseDirectory => {
                                    $scope.dataBrowseDirectory = resBrowseDirectory;
                                    $element.append($compile(`
                                        <alert type="success" title="Create folder '${folderName}' has been success."></alert>
                                    `)($scope));
                                });
                        });
                } else {
                    $element.append($compile(`
                        <alert type="danger" title="This destination already contains a folder named '${folderName}'!" body="Please change a folder name."></alert>
                    `)($scope));
                }
            };
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