(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('delete', {
            template: require('./delete.html'),
            controller: deleteController,
            bindings: {
                title: '@',
                body: '@',
                onDelete: '&'
            },
        });

    deleteController.$inject = ['$scope', '$timeout', '$element', '$compile'];
    function deleteController($scope, $timeout, $element, $compile) {
        var $ctrl = this;
        $scope.id = $scope.$id;

        $ctrl.$onInit = function () {
            let modalElement,
                deleteFn = angular.noop;
            $timeout(() => {
                angular.element(`#model-body-${$scope.id}`).append($compile(`<span>${$ctrl.body}</span>`)($scope));
                modalElement = angular.element(`#modal-${$scope.id}`)
                modalElement.modal('show');
                modalElement.on('hidden.bs.modal', () => {
                    $element.remove();
                    deleteFn();
                });
            });
            $scope.delete = () => {
                deleteFn = $ctrl.onDelete;
                modalElement.modal('hide');
            };
        };
    }
})();