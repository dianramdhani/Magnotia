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
        $scope.id = $scope.$id;
        $scope.createChart = (indexKey) => {
            const
                arrayColumn = (array, key) => array.map(currentValue => {
                    const isNumberic = (strVal) => /^\d+(\.\d+)*$/.test(strVal);
                    return isNumberic(currentValue[key]) ? Number(currentValue[key]) : currentValue[key];
                }),
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
            let tempXAxis = arrayColumn($ctrl.data, indexKey);
            tempXAxis.splice(0, 1);
            let xAxis = {
                categories: tempXAxis
            }, series = getSeries();
            $timeout(() => {
                Highcharts.chart(`highcharts-${$scope.id}`, {
                    chart: { type: $ctrl.chartType },
                    title: { style: { display: 'none' } },
                    xAxis,
                    series
                });
            });
        };

        $ctrl.$onChanges = function (e) {
            if (typeof e.data !== 'undefined') {
                if ($ctrl.data) {
                    $scope.indexKey = Object.keys($ctrl.data[0])[0];
                    $scope.createChart($scope.indexKey);
                }
            }
        };
    }
})();