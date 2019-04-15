(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserApplicationSuiteFormUpdateApplicationInstance', {
            template: require('./form-update-application-instance.html'),
            controller: tenantUserApplicationSuiteFormUpdateApplicationInstanceController,
        });

    tenantUserApplicationSuiteFormUpdateApplicationInstanceController.$inject = ['$scope', '$element', '$compile', '$q', '$stateParams', '$state', 'applicationPoolService'];
    function tenantUserApplicationSuiteFormUpdateApplicationInstanceController($scope, $element, $compile, $q, $stateParams, $state, applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            applicationPoolService.getApplicationSuite($stateParams.applicationSuiteId)
                .then(resGetApplicationSuite => $scope.applicationSuite = resGetApplicationSuite);

            $q.all([
                applicationPoolService.getApplicationInstance($stateParams.applicationInstanceId),
                applicationPoolService.getApplicationInstanceProperties($stateParams.applicationInstanceId)
            ])
                .then(resAll => {
                    let resGetApplicationInstance = resAll[0],
                        resGetApplicationInstanceProperties = resAll[1];
                    $scope.instance = resGetApplicationInstance;
                    applicationPoolService.getApplicationProperties(resGetApplicationInstance.applicationId)
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
                            $scope.properties.forEach(property => property['propertyValue'] = (resGetApplicationInstanceProperties.find(_ => _.propertyName === property.propertyName)).propertyValue);
                        });
                });
            $scope.update = (instance, properties) => {
                instance.applicationInstanceProperties = properties;
                applicationPoolService.saveApplicationInstance(instance)
                    .then(() => {
                        $scope.onClose = () => $state.go('tenantUser.applicationSuite.home');
                        $element.append($compile(`<alert type="success" title="Update success." on-close="onClose()"></alert>`)($scope));
                    });
            };
        };
    }
})();