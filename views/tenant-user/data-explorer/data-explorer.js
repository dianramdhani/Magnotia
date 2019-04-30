(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserDataExplorer', {
            template: require('./data-explorer.html'),
            controller: tenantUserDataExplorerController
        });

    tenantUserDataExplorerController.$inject = ['$scope', '$element', '$compile'];
    function tenantUserDataExplorerController($scope, $element, $compile) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.onOpen = (path) => {
                console.log('ini path', path);
            };
            $scope.openFileOrFolder = (type) => {
                switch (type) {
                    case 'FILE':
                        $element.append($compile(`
                            <modal-select-file-or-directory on-open="onOpen(path)"></modal-select-file-or-directory>
                        `)($scope));
                        break;
                    case 'DIRECTORY':
                        $element.append($compile(`
                            <modal-select-file-or-directory get-directory="true" on-open="onOpen(path)"></modal-select-file-or-directory>
                        `)($scope));
                        break;
                }

            };
        };
    }
})();