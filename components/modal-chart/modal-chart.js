(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('modalChart', {
            template: require('./modal-chart.html'),
            controller: modalChartController,
            bindings: {
                title: '@',     // Type string. Title of modal.
                data: '=',      // Type array. Data table from request to ploting as chart.
                indexData: '=', // Type number. Index of data if you want to ploting only one record data as chart. Example ploting data in pie chart. 
                chartType: '@', // Type string. Example value is 'line' or 'pie'.
            },
        });

    modalChartController.$inject = ['$scope', '$timeout', '$element'];
    function modalChartController($scope, $timeout, $element) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.id = $scope.$id;
            $timeout(() => {
                const
                    createChart = () => {
                        if ($ctrl.chartType === 'pie') {
                            Highcharts.chart(`highcharts-${$scope.id}`, {
                                chart: { type: $ctrl.chartType },
                                title: { style: { display: 'none' } },
                                series: [{
                                    name: 'Brands',
                                    colorByPoint: true,
                                    data: [{
                                        name: 'Chrome',
                                        y: 61.41,
                                        sliced: true,
                                        selected: true
                                    }, {
                                        name: 'Internet Explorer',
                                        y: 11.84
                                    }, {
                                        name: 'Firefox',
                                        y: 10.85
                                    }, {
                                        name: 'Edge',
                                        y: 4.67
                                    }, {
                                        name: 'Safari',
                                        y: 4.18
                                    }, {
                                        name: 'Sogou Explorer',
                                        y: 1.64
                                    }, {
                                        name: 'Opera',
                                        y: 1.6
                                    }, {
                                        name: 'QQ',
                                        y: 1.2
                                    }, {
                                        name: 'Other',
                                        y: 2.61
                                    }]
                                }]
                            });
                        }
                    };

                angular.element(`#modal-${$scope.id}`)
                    .modal('show')
                    .on('shown.bs.modal', () => createChart())
                    .on('hidden.bs.modal', () => $element.remove());
            });
        };
    }
})();