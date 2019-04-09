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

    loadingController.$inject = ['$timeout'];
    function loadingController($timeout) {
        var $ctrl = this;

        $ctrl.$onInit = function () { };
        $ctrl.$onChanges = function (e) {
            if ($ctrl.show) {
                $timeout(() => $ctrl.show = false, 10000);
            }
        };
    }
})();