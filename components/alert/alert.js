(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('alert', {
            template: require('./alert.html'),
            controller: alertController,
            bindings: {
                type: '@',
                title: '@',
                body: '@',
                onClose: '&'
            },
        });

    alertController.$inject = ['$scope', '$timeout', '$element'];
    function alertController($scope, $timeout, $element) {
        var $ctrl = this;
        $scope.id = $scope.$id;

        $ctrl.$onInit = function () {
            let alertElement;
            $timeout(() => {
                alertElement = angular.element(`#alert-${$scope.id}`)
                alertElement.modal('show');
                alertElement.on('hidden.bs.modal', () => {
                    $element.remove();
                    $ctrl.onClose();
                });
            });
        };
    }
})();