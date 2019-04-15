(function () {
    'use strict';

    window.app
        .service('applicationPoolService', applicationPoolService);

    applicationPoolService.$inject = ['$http', '$q', 'CONFIG'];
    function applicationPoolService($http, $q, CONFIG) {
        this.getApplicationSuiteList = getApplicationSuiteList;
        this.getApplicationInstanceList = getApplicationInstanceList;
        this.executeInstanceOperation = executeInstanceOperation;
        this.getOrchestratorServiceList = getOrchestratorServiceList;
        this.getApplication = getApplication;
        this.getApplicationList = getApplicationList;
        this.getApplicationInstance = getApplicationInstance;
        this.getApplicationInstanceProperties = getApplicationInstanceProperties;
        this.getApplicationProperties = getApplicationProperties;
        this.getApplicationSuite = getApplicationSuite;
        this.getInstanceSchedulerList = getInstanceSchedulerList;
        this.getOrchestratorService = getOrchestratorService;
        this.saveApplicationSuite = saveApplicationSuite;
        this.removeApplicationSuite = removeApplicationSuite;
        this.saveApplicationInstance = saveApplicationInstance;
        // remove application instance
        this.removeApplicationInstance = removeApplicationInstance;

        const url = CONFIG.apppool;
        const removeEmpty = (obj) => {
            Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
            return obj;
        }

        // APPLICATION
        function getApplicationList(id = null, name = null, description = null, orchestratorId = null) {
            let q = $q.defer(),
                params = removeEmpty({ id, name, description, orchestratorId });
            $http.get(`${url}/application/list`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function getListByOrchestrator(orchestratorId) { }
        function saveApplication(application) { }
        function getApplication(applicationId) {
            let q = $q.defer(),
                params = { applicationId };
            $http.get(`${url}/application/get`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function removeApplication(applicationId) { }
        function executeApplication(applicationId, orchestratorServiceId) { }
        function executeApplicationCustom(applicationId, orchestratorServiceId, serviceName) { }
        function addApplicationProperties(applicationId, properties) { }
        function getApplicationProperties(applicationId) {
            let q = $q.defer(),
                params = { applicationId };
            $http.get(`${url}/application/get_properties`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function getApplicationTemplates(applicationId) { }
        function removeApplicationProperty(applicationPropertyId) { }
        function getApplicationInstanceList(applicationSuiteId) {
            let q = $q.defer(),
                params = { applicationSuiteId };
            $http.get(`${url}/applicationInstance/list`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function saveApplicationInstance(instance) {
            let q = $q.defer();
            $http.post(`${url}/applicationInstance/save`, instance).then(res => q.resolve(res.data));
            return q.promise;
        }

        // APPLICATION INSTANCE
        function getApplicationInstance(applicationInstanceId) {
            let q = $q.defer(),
                params = { applicationInstanceId };
            $http.get(`${url}/applicationInstance/get`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function removeApplicationInstance(applicationInstanceId) {
            let q = $q.defer(),
                params = { applicationInstanceId };
            $http.get(`${url}/applicationInstance/remove`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function executeInstanceOperation(applicationInstanceId, orchestratorServiceId) {
            let q = $q.defer(),
                params = { applicationInstanceId, orchestratorServiceId };
            $http.get(`${url}/applicationInstance/execute`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function addApplicationInstanceProperties(applicationInstanceId, properties) { }
        function getApplicationInstanceProperties(applicationInstanceId) {
            let q = $q.defer(),
                params = { applicationInstanceId };
            $http.get(`${url}/applicationInstance/get_properties`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function removeApplicationInstanceProperty(applicationInstancePropertyId) { }

        // ORCHESTRATOR
        function getOrchestratorList() { }
        function saveOrchestrator(orchestrator) { }
        function getOrchestrator(orchestratorId) { }
        function removeOrchestrator(orchestratorId) { }
        function executeOrchestrator(orchestratorServiceId) { }

        // ORCHESTRATOR SERVICE
        function getOrchestratorServiceList(orchestratorId, applicationService = null, instanceService = null, name = null) {
            let q = $q.defer(),
                params = removeEmpty({ orchestratorId, applicationService, instanceService, name });
            $http.get(`${url}/orchestratorService/list`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function saveOrchestratorService(orchestratorId, orchestratorService) { }
        function getOrchestratorService(orchestratorServiceId) {
            let q = $q.defer(),
                params = { orchestratorServiceId };
            $http.get(`${url}/orchestratorService/get`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function removeOrchestratorService(orchestratorServiceId) { }
        function getApplicationSuiteList(tenant, applicationSuiteName = null) {
            let q = $q.defer(),
                params = removeEmpty({ tenant, applicationSuiteName });
            $http.get(`${url}/applicationSuite/list`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function saveApplicationSuite(applicationSuite) {
            let q = $q.defer();
            $http.post(`${url}/applicationSuite/save`, applicationSuite).then(res => q.resolve(res.data));
            return q.promise;
        }
        function getApplicationSuite(applicationSuiteId) {
            let q = $q.defer(),
                params = { applicationSuiteId };
            $http.get(`${url}/applicationSuite/get`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function removeApplicationSuite(applicationSuiteId) {
            let q = $q.defer(),
                params = { applicationSuiteId };
            $http.get(`${url}/applicationSuite/remove`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }

        // EVENT SERVICE
        function getEventList(id, name, orchestratorId) { }
        function saveEvent(event) { }
        function getEvent(eventId) { }
        function removeEvent(eventId) { }
        function removeEventService(eventServiceId) { }
        function getEventServices(eventId) { }
        function addServices(eventId, eventService) { }

        // INSTANCE SCHEDULER SERVICE
        function getInstanceSchedulerList(applicationInstanceId) {
            let q = $q.defer(),
                params = { applicationInstanceId };
            $http.get(`${url}/instanceScheduler/list`, { params }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function getInstanceSchedule(scheduleId) { }
        function removeInstanceSchedule(scheduleId) { }
        function saveInstanceScheduler(instanceSchedule) { }
        function startInstanceScheduler(scheduleId) { }
        function stopInstanceScheduler(scheduleId) { }
        function isInstanceSchedulerRunning(scheduleId) { }
    }
})();