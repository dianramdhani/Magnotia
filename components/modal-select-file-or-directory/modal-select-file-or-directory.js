(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('modalSelectFileOrDirectory', {
            template: require('./modal-select-file-or-directory.html'),
            controller: modalSelectFileOrFolderController,
            bindings: {
                getDirectory: '<',
                onOpen: '&'
            }
        });

    modalSelectFileOrFolderController.$inject = ['$scope', '$timeout', '$q', '$rootScope', '$element', 'TenantUserService'];
    function modalSelectFileOrFolderController($scope, $timeout, $q, $rootScope, $element, TenantUserService) {
        var $ctrl = this;
        $scope.id = $scope.$id;

        $ctrl.$onInit = function () {
            $scope.nowRootPath = false;
            let modalElement,
                rootPath,
                getRootData = () => {
                    $scope.dataBrowseDirectory = {};
                    $q.all([
                        TenantUserService.diskUsage(`/tenant/${$rootScope.globals.currentUser.tenant}`, false),
                        TenantUserService.diskUsage(`/user/${$rootScope.globals.currentUser.username}`, false)
                    ])
                        .then(resAll => {
                            $scope.dataBrowseDirectory['fileDetails'] = [
                                {
                                    fileName: 'Tenant Storage',
                                    filePath: `/tenant/${$rootScope.globals.currentUser.tenant}`,
                                    byteSize: resAll[0].details[0].humanSize,
                                    type: 'DIRECTORY'
                                },
                                {
                                    fileName: 'User Storage',
                                    filePath: `/tenant/${$rootScope.globals.currentUser.username}`,
                                    byteSize: resAll[1].details[0].humanSize,
                                    type: 'DIRECTORY'
                                }
                            ];
                            rootPath = $scope.dataBrowseDirectory.fileDetails.map(({ filePath }) => filePath);
                            $scope.nowRootPath = true;
                        });
                },
                filterDirectory = (model) => {
                    if ($ctrl.getDirectory === true) {
                        model.fileDetails = model.fileDetails.filter(({ type }) => type === 'DIRECTORY');
                    }
                };
            $timeout(() => {
                modalElement = angular.element(`#modal-${$scope.id}`);
                modalElement.modal('show');
                getRootData();
                modalElement.on('hidden.bs.modal', () => $element.remove());
            });
            $scope.onClick = (fileDetail) => {
                if (fileDetail.type === 'DIRECTORY') {
                    TenantUserService.browseDirectory(fileDetail.filePath)
                        .then(resBrowseDirectory => {
                            $scope.dataBrowseDirectory = resBrowseDirectory;
                            filterDirectory($scope.dataBrowseDirectory);
                            $scope.nowRootPath = false;
                        });
                }
                if ($ctrl.getDirectory) {
                    $scope.pathToOpen = fileDetail.filePath;
                } else if (fileDetail.type === 'FILE') {
                    $scope.pathToOpen = fileDetail.filePath;
                }
            };
            $scope.upDir = () => {
                const removeLastDir = (dir) => dir.substring(0, dir.lastIndexOf('/'));
                TenantUserService.browseDirectory(removeLastDir($scope.dataBrowseDirectory.currentDir))
                    .then(resBrowseDirectory => {
                        $scope.nowRootPath = typeof rootPath.find(_ => resBrowseDirectory.currentDir.includes(_)) === 'undefined' ? true : false;
                        if ($scope.nowRootPath) {
                            getRootData();
                        } else {
                            $scope.dataBrowseDirectory = resBrowseDirectory;
                            filterDirectory($scope.dataBrowseDirectory);
                        }
                    });
            };
            $scope.open = () => {
                $ctrl.onOpen({ path: $scope.pathToOpen });
                modalElement.modal('hide');
            };
        };
    }
})();