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
        $scope.$log = $log;
        $scope.id = $scope.$id;

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
                                        $element.append($compile(`
                                            <alert type="success" title="Add tables success."></alert>
                                        `)($scope));
                                        $scope.canQuery = true;
                                    }
                                    $scope.showLoading = false;
                                });
                        });
                    });
            };
            $scope.runQuery = (query) => {
                $scope.showLoading = true;
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
                                                            $scope.dataOutputType = 'table';
                                                            $scope.showLoading = false;
                                                        })
                                                        .catch(e => {
                                                            $scope.showLoading = false;
                                                            $element.append($compile(`
                                                                <alert type="danger" title="Input query failed."></alert>
                                                            `)($scope));
                                                            console.log(e);
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
            $scope.createChart = (dataOutput, indexKey, dataOutputType) => {
                const
                    arrayColumn = (array, key) => array.map(currentValue => {
                        const isNumberic = (strVal) => /^\d+(\.\d+)*$/.test(strVal);
                        return isNumberic(currentValue[key]) ? Number(currentValue[key]) : currentValue[key];
                    }),
                    getSeries = () => {
                        let dataNoXAxis = dataOutput.map(currentValue => {
                            let temp = angular.copy(currentValue);
                            delete temp[indexKey];
                            return temp;
                        }), temp = [];
                        for (const key of Object.keys(dataNoXAxis[0])) {
                            temp.push(arrayColumn(dataNoXAxis, key));
                        }
                        return temp.map(currentValue => ({
                            name: currentValue.shift(),
                            data: currentValue
                        }));
                    };
                let tempXAxis = arrayColumn(dataOutput, indexKey);
                tempXAxis.splice(0, 1);
                let xAxis = {
                    categories: tempXAxis
                }, series = getSeries();
                console.log({ xAxis }, { series }, { dataOutputType });
                $timeout(() => {
                    Highcharts.chart(`highcharts-${dataOutputType}-${$scope.id}`, {
                        chart: { type: dataOutputType },
                        title: { style: { display: 'none' } },
                        xAxis,
                        series
                    });
                });
            };
        };
    }
})();