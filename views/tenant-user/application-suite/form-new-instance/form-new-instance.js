(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteFormNewInstance', {
            template: require('./form-new-instance.html'),
            controller: tenantUserApplicationSuiteFormNewInstanceController,
        });

    tenantUserApplicationSuiteFormNewInstanceController.$inject = ['$scope', '$stateParams', '$state', '$compile', '$element', 'applicationPoolService'];

    function tenantUserApplicationSuiteFormNewInstanceController($scope, $stateParams, $state, $compile, $element, applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $scope.applicationSuiteId = $stateParams.applicationSuiteId;

            applicationPoolService.getApplicationSuite($stateParams.applicationSuiteId)
                .then(resGetApplicationSuite => $scope.applicationSuite = resGetApplicationSuite);

            applicationPoolService.getApplicationList()
                .then(resGetApplicationList => $scope.applicationList = resGetApplicationList);

            $scope.setApplicationNow = (application) => {
                $scope.applicationNow = application;
                applicationPoolService.getApplicationProperties($scope.applicationNow.id)
                    .then(resGetApplicationProperties => {
                        $scope.properties = (resGetApplicationProperties.map(property => {
                            if (property.configurable) {
                                let type = 'text',
                                    selection = [],
                                    duplicate = false,
                                    reference = '';

                                if (property.propertyFormat && property.propertyFormat.startsWith('[')) {
                                    type = 'select';
                                    selection = JSON.parse(property.propertyFormat);
                                } else if (property.propertyFormat === 'area' || property.propertyFormat === 'password'
                                    || property.propertyFormat === 'text') {
                                    type = property.propertyFormat;
                                } else if (property.propertyFormat && property.propertyFormat.startsWith('duplicate=')) {
                                    duplicate = true;
                                    reference = property.propertyFormat.substring(10);
                                } else {
                                    type = 'text';
                                }

                                if (!duplicate) {
                                    return {
                                        propertyName: property.instancePropertyName,
                                        propertyFormat: type,
                                        selection: selection
                                    };
                                } else {
                                    return {
                                        propertyName: property.instancePropertyName,
                                        propertyFormat: type,
                                        selection: selection,
                                        reference: reference
                                    };
                                }
                            }
                        })).filter(_ => typeof _ !== 'undefined');
                    });
            };

            /**
             * @todo
             * check setiap parameter tidak boleh kosong. jika kosong alert error.
             */
            $scope.save = (applicationNow, instance, properties) => {
                applicationPoolService.saveApplicationInstance(Object.assign({
                    applicationId: applicationNow.id,
                    applicationInstanceProperties: properties,
                    applicationSuiteId: $stateParams.applicationSuiteId
                }, instance))
                    .then(() => {
                        $scope.onClose = () => $state.go('tenantUser.applicationSuite.home.applicationInstance', { applicationSuiteId: $scope.applicationSuiteId });
                        $element.append($compile(`
                            <alert type="success" title="Add new application instance success." on-close="onClose()"></alert>
                        `)($scope));
                    });
            };
        };
    }
})();