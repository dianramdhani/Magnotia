(function () {
    'use strict';

    window.app
        .service('applicationPoolService', applicationPoolService);

    applicationPoolService.$inject = ['$http', '$q', '$rootScope'];
    function applicationPoolService($http, $q, $rootScope) {
        const url = $rootScope.config.apppool;

        // APPLICATION
        function getApplicationList(id = null, name = null, description = null, orchestratorId = null) { }
        function getListByOrchestrator(orchestratorId) { }
        function saveApplication(application) { }
        function getApplication(applicationId) { }
        function removeApplication(applicationId) { }
        function executeApplication(applicationId, orchestratorServiceId) { }
        function executeApplicationCustom(applicationId, orchestratorServiceId, serviceName) { }
        function addApplicationProperties(applicationId, properties) { }
        function getApplicationProperties(applicationId) { }
        function getApplicationTemplates(applicationId) { }
        function removeApplicationProperty(applicationPropertyId) { }
        function getApplicationInstanceList(applicationSuiteId) { }
        function saveApplicationInstance(instance) { }

        // APPLICATION INSTANCE
        function getApplicationInstance(applicationInstanceId) { }
        function removeApplicationInstance(applicationInstanceId) { }
        function executeInstanceOperation(applicationInstanceId, orchestratorServiceId, noalert) { }
        function addApplicationInstanceProperties(applicationInstanceId, properties) { }
        function getApplicationInstanceProperties(applicationInstanceId) { }
        function removeApplicationInstanceProperty(applicationInstancePropertyId) { }

        // ORCHESTRATOR
        function getOrchestratorList() { }
        function saveOrchestrator(orchestrator) { }
        function getOrchestrator(orchestratorId) { }
        function removeOrchestrator(orchestratorId) { }
        function executeOrchestrator(orchestratorServiceId) { }

        // ORCHESTRATOR SERVICE
        function getOrchestratorServiceList(orchestratorId, applicationService = null, instanceService = null, name = null) { }
        function saveOrchestratorService(orchestratorId, orchestratorService) { }
        function getOrchestratorService(orchestratorServiceId) { }
        function removeOrchestratorService(orchestratorServiceId) { }
        function getApplicationSuiteList(tenant, applicationSuiteName = null) { }
        function saveApplicationSuite(applicationSuite) { }
        function getApplicationSuite(applicationSuiteId) { }
        function removeApplicationSuite(applicationSuiteId) { }

        // EVENT SERVICE
        function getEventList(id, name, orchestratorId) { }
        function saveEvent(event) { }
        function getEvent(eventId) { }
        function removeEvent(eventId) { }
        function removeEventService(eventServiceId) { }
        function getEventServices(eventId) { }
        function addServices(eventId, eventService) { }

        // INSTANCE SCHEDULER SERVICE
        function getInstanceSchedulerList(applicationInstanceId) { }
        function getInstanceSchedule(scheduleId) { }
        function removeInstanceSchedule(scheduleId) { }
        function saveInstanceScheduler(instanceSchedule) { }
        function startInstanceScheduler(scheduleId) { }
        function stopInstanceScheduler(scheduleId) { }
        function isInstanceSchedulerRunning(scheduleId) { }
    }
})();