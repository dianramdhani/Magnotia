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

    tenantUserDataExplorerController.$inject = ['$scope', '$element', '$compile', '$log'];
    function tenantUserDataExplorerController($scope, $element, $compile, $log) {
        var $ctrl = this;
        $scope.$log = $log;

        $ctrl.$onInit = function () {
            $scope.data = [];
            $scope.onOpen = (path) => $scope.data.push({ path });
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
            $scope.delete = (index) => $scope.data.splice(index, 1);
            $scope.loadAll = (data) => {
                console.log(data);
            };
        };
    }
})();