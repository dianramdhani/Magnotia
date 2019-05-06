(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('loading', {
            template: require('./loading.html'),
            controller: loadingController,
            bindings: {
                show: '<',
            },
        });

    loadingController.$inject = ['$timeout', '$scope', '$element', '$compile'];
    function loadingController($timeout, $scope, $element, $compile) {
        var $ctrl = this;

        $ctrl.$onInit = function () { };
        $ctrl.$onChanges = function (e) {
            if ($ctrl.show) {
                $timeout(() => {
                    if ($ctrl.show === true) {
                        $element.append($compile(`
                            <alert type="danger" title="The request has timed out."></alert>
                        `)($scope));
                        $ctrl.show = false;
                    }
                }, 120000);
            }
        };
    }
})();