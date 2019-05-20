(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('chart', {
            template: require('./chart.html'),
            controller: chartController,
            bindings: {
                data: '<',      // Type array. Value is response output from query.
                chartType: '@'  // Type string. Value is column or line.
            },
        });

    chartController.$inject = ['$scope', '$timeout'];
    function chartController($scope, $timeout) {
        var $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.id = $scope.$id;
        };
        $ctrl.$onChanges = () => {
            if (typeof $ctrl.data !== 'undefined') {
                if (Array.isArray($ctrl.data)) {
                    if ($ctrl.data.length > 0) {
                        $scope.indexKey = Object.keys($ctrl.data[0])[0];
                        $scope.createChart($scope.indexKey);
                    }
                }
            }
        };

        $scope.createChart = (indexKey) => {
            if ($ctrl.data != undefined) {
                const
                    arrayColumn = (array, key) => {
                        let res = array.map(currentValue => {
                            const isNumberic = (strVal) => /^\d+(\.\d+)*$/.test(strVal);
                            return isNumberic(currentValue[key]) ? Number(currentValue[key]) : currentValue[key];
                        });
                        return res;
                    },
                    getSeries = () => {
                        let dataNoXAxis = $ctrl.data.map(currentValue => {
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
                let categories = arrayColumn($ctrl.data, indexKey);
                categories.splice(0, 1);
                $timeout(() => {
                    Highcharts.chart(`highcharts-${$scope.id}`, {
                        chart: { type: $ctrl.chartType },
                        title: { style: { display: 'none' } },
                        xAxis: { categories },
                        series: getSeries()
                    });
                });
            }
        };
    }
})();