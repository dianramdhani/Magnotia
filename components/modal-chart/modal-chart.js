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
                chartType: '@', // Type string. Example value is 'line' or 'pie'.
                data: '=',      // Type array. Data table from request to ploting as chart.
                indexData: '<', // Type number. Index of data if you want to ploting only one record data as chart. Example ploting data in pie chart. 
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
                        const isNumberic = (strVal) => /^\d+(\.\d+)*$/.test(strVal);

                        if ($ctrl.chartType === 'pie') {
                            let data = Object.keys($ctrl.data[0])
                                .filter(key => isNumberic($ctrl.data[$ctrl.indexData][key]))
                                .map(key => ({
                                    name: $ctrl.data[0][key],
                                    y: Number($ctrl.data[$ctrl.indexData][key])
                                }));
                            Highcharts.chart(`highcharts-${$scope.id}`, {
                                chart: { type: $ctrl.chartType },
                                title: { style: { display: 'none' } },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: { enabled: false },
                                        showInLegend: true
                                    }
                                },
                                series: [{ data }]
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