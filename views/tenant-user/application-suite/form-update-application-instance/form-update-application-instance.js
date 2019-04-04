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

    tenantUserApplicationSuiteFormUpdateApplicationInstanceController.$inject = ['$scope', '$q', '$stateParams', 'applicationPoolService'];
    function tenantUserApplicationSuiteFormUpdateApplicationInstanceController($scope, $q, $stateParams, applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            console.log($stateParams)
            $q.all([
                applicationPoolService.getApplicationInstance($stateParams.applicationInstanceId),
                applicationPoolService.getApplicationInstanceProperties($stateParams.applicationInstanceId)
            ])
                .then(resAll => {
                    let resGetApplicationInstance = resAll[0],
                        resGetApplicationInstanceProperties = resAll[1];
                    applicationPoolService.getApplicationProperties(resGetApplicationInstance.applicationId)
                        .then(resGetApplicationProperties => {
                            // console.log(resAll, resGetApplicationProperties);
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
                                        console.log({ reference });
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
                            })).filter(_ => typeof (_) !== 'undefined');
                        })
                });
        };
    }
})();