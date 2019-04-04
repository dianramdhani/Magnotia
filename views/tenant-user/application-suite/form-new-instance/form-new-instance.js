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

    tenantUserApplicationSuiteFormNewInstanceController.$inject = ['$scope', 'applicationPoolService'];

    function tenantUserApplicationSuiteFormNewInstanceController($scope, applicationPoolService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
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
                        console.log($scope.properties);
                    });
            };
        };
    }
})();