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
                rootDir: '<',           // Type string. String of root path.
                onError: '&',
                backRootStatus: '<',    // Type boolean. Optional if can back on root.
                onBackRoot: '&',
                editable: '='           // Type boolean. Optional if can add file, create new folder, and delete file or folder.
            },
        });

    fileBrowserController.$inject = ['$scope', '$log', '$timeout', '$element', '$compile', '$window', 'TenantUserService'];
    function fileBrowserController($scope, $log, $timeout, $element, $compile, $window, TenantUserService) {
        var $ctrl = this;
        $scope.$log = $log;
        $scope.id = $scope.$id;

        $ctrl.$onInit = function () {
            let refresh = (callback) => {
                TenantUserService.browseDirectory($scope.dataBrowseDirectory.currentDir)
                    .then(resBrowseDirectory => {
                        $scope.dataBrowseDirectory = resBrowseDirectory;
                        callback();
                    });
            };
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
                            refresh(() => {
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
            $scope.delete = (fileDetail) => {
                $scope.onDeleteFileOrFolder = () => {
                    TenantUserService.removeFile(fileDetail.filePath)
                        .then(() => {
                            refresh(() => {
                                $element.append($compile(`
                                    <alert type="success" title="Delete success."></alert>
                                `)($scope));
                            });
                        });
                };
                $element.append($compile(`
                    <delete title="Delete This File/Folder?"
                        body="Confirm if you are going to delete <strong>${fileDetail.fileName}</strong>."
                        on-delete="onDeleteFileOrFolder()">
                    </delete> 
                `)($scope));
            };
            $scope.uploadFile = (file) => {
                if (typeof file !== 'undefined') {
                    let checkSameFileName = typeof $scope.dataBrowseDirectory.fileDetails.find(fileDetail => fileDetail.type === 'FILE' && fileDetail.fileName === file.name) === 'undefined';
                    if (checkSameFileName) {
                        TenantUserService.uploadFile($scope.dataBrowseDirectory.currentDir, file)
                            .then(() => {
                                refresh(() => {
                                    $element.append($compile(`
                                        <alert type="success" title="Upload file success."></alert>
                                    `)($scope));
                                });
                            });
                    } else {
                        $element.append($compile(`
                            <alert type="danger" title="This destination already contains a file named '${file.name}'!" body="Please change the name of file before upload."></alert>
                        `)($scope));
                    }
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