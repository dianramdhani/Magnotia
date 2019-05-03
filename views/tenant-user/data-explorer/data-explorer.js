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

    tenantUserDataExplorerController.$inject = ['$scope', '$element', '$compile', '$log', '$rootScope', 'LivyService'];
    function tenantUserDataExplorerController($scope, $element, $compile, $log, $rootScope, LivyService) {
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
                LivyService.getSession()
                    .then(resGetSession => {
                        data.forEach((_data, index) => {
                            let options = {};
                            if (_data.fileType === 'csv') {
                                options = {
                                    header: 'true',
                                    inferSchema: 'true',
                                    quoteMode: 'MINIMAL',
                                    mode: 'PERMISSIVE',
                                    ignoreLeadingWhiteSpace: 'true',
                                    ignoreTrailingWhiteSpace: 'true',
                                    parserLib: 'UNIVOCITY',
                                    wholeFile: 'true',
                                    escape: '\\n'
                                };
                            }
                            LivyService.createTableFromFile(resGetSession.id, _data.path, _data.tableName, _data.fileType, options)
                                .then(() => {
                                    if (index === data.length - 1) {
                                        $element.append($compile(`
                                            <alert type="success" title="Add tables success."></alert>
                                        `)($scope));
                                        $scope.canQuery = true;
                                    }
                                });
                        });
                    });
            };
            $scope.runQuery = (query) => {
                let sessionId = $rootScope.globals.sessionDataExplorer.id;
                LivyService.checkSession(sessionId)
                    .then(resCheckSession => {
                        if (resCheckSession.id !== null) {
                            LivyService.executeQuery(sessionId, query)
                                .then(resExecuteQuery => {
                                    let getStatement = () => {
                                        LivyService.getStatement(sessionId, resExecuteQuery.statementId)
                                            .then(resGetStatement => {
                                                if (resGetStatement.progress === 1) {
                                                    LivyService.getVarAsJson(sessionId, resExecuteQuery.varName)
                                                        .then(resGetVarAsJson => {
                                                            $scope.dataOutput = resGetVarAsJson;
                                                            console.log($scope.dataOutput)
                                                        });
                                                } else {
                                                    getStatement();
                                                }
                                            });
                                    };
                                    getStatement();
                                });
                        }
                    });
            };
        };
    }
})();