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

    tenantUserDataExplorerController.$inject = ['$scope', '$element', '$compile', '$log', '$rootScope', '$timeout', 'LivyService'];
    function tenantUserDataExplorerController($scope, $element, $compile, $log, $rootScope, $timeout, LivyService) {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            $scope.$log = $log;
            $scope.id = $scope.$id;
            $scope.data = [];
        };

        const
            scrollIntoView = (queryElement) => $timeout(() => $element[0].querySelector(queryElement).scrollIntoView({ behavior: 'smooth', block: 'start' }));

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
            $scope.showLoading = true;
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
                                    scrollIntoView(`#data-output-container-${$scope.id}`);
                                    $element.append($compile(`
                                        <alert type="success" title="Add tables success."></alert>
                                    `)($scope));
                                    $scope.canQuery = true;
                                    $scope.query = '';
                                }
                                $scope.showLoading = false;
                            });
                    });
                });
        };
        $scope.runQuery = (query) => {
            const queryInvalid = () => {
                $scope.showLoading = false;
                $element.append($compile(`
                    <alert type="danger" title="Input query failed."></alert>
                `)($scope));
            };
            $scope.showLoading = true;
            let sessionId = $rootScope.globals.sessionDataExplorer.id;
            LivyService.checkSession(sessionId)
                .then(resCheckSession => {
                    if (resCheckSession.id !== null) {
                        LivyService.executeQuery(sessionId, query)
                            .then(resExecuteQuery => {
                                const getStatement = () => {
                                    LivyService.getStatement(sessionId, resExecuteQuery.statementId)
                                        .then(resGetStatement => {
                                            if (resGetStatement.progress === 1) {
                                                LivyService.getVarAsJson(sessionId, resExecuteQuery.varName)
                                                    .then(resGetVarAsJson => {
                                                        $scope.onAlertQuerySuccessClose = () => scrollIntoView(`#data-output-menu-${$scope.id}`);
                                                        $element.append($compile(`
                                                            <alert type="success" title="Query success." on-close="onAlertQuerySuccessClose()"></alert>
                                                        `)($scope));
                                                        $scope.dataOutput = resGetVarAsJson;
                                                        $scope.dataOutputType = 'table';
                                                        $scope.showLoading = false;
                                                    })
                                                    .catch(() => queryInvalid());
                                            } else {
                                                getStatement();
                                            }
                                        })
                                        .catch(() => queryInvalid());
                                };
                                getStatement();
                            })
                            .catch(() => queryInvalid());
                    }
                })
                .catch(() => queryInvalid());
        };
        $scope.showPieChart = (index) => {
            console.log({ index });
            $element.append($compile(`
                <modal-chart title="hallo indonesia" chart-type="pie"></modal-chart>
            `)($scope));
        };
    }
})();