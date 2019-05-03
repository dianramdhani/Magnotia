(function () {
    'use strict';

    window.app
        .service('TenantUserService', TenantUserService);

    TenantUserService.$inject = ['$http', '$q', '$rootScope', 'CONFIG'];
    function TenantUserService($http, $q, $rootScope, CONFIG) {
        this.browseDirectory = browseDirectory;
        this.downloadFile = downloadFile;
        this.diskUsage = diskUsage;

        const url = CONFIG.tenant;
        let headers = {};
        if ($rootScope.globals.currentUser) {
            headers = {
                token: $rootScope.globals.currentUser.token,
                username: $rootScope.globals.currentUser.username
            };
        }

        // LOGIN
        function isLoggedIn() { }
        function login(username, password) { }
        function logout() { }
        function resetPasswordToEmail() { }
        // TENANT
        function isTenantAvailable(name) { }
        function getTenant(name, status) { }
        function createTenant(name) { }
        function changeTenantStatus(params) { }
        // TENANT USER
        function isUsernameAvailable(username) { }
        function getInternalUser() { }
        function getInternalUserByUsername(username) { }
        function createInternalUser(password, username, email) { }
        function updateInternalUser(user) { }
        function deleteInternalUser(username) { }
        // HDFS RANGER POLICY
        function getHdfsRangerPolicyByTenant() { }
        function createHdfsRangerPolicy(policy) { }
        function updateHdfsRangerPolicy(policy) { }
        function deleteHdfsRangerPolicy(policyId) { }
        // HDFS RANGER POLICY
        function browseDirectory(path) {
            let q = $q.defer(),
                params = { path };
            $http.get(`${url}/fileBrowserService/browseDirectory`, { params, headers }).then(res => q.resolve(res.data)).catch(err => q.reject(err.data));
            return q.promise;
        }
        function makeDirectory(path, directory) { }
        function copyFile(source, destination) { }
        function moveFile(source, destination) { }
        function renameFile(source, newFileName) { }
        function removeFile(path) { }
        function downloadFile(path) {
            let q = $q.defer(),
                params = { path };
            $http.get(`${url}/fileBrowserService/downloadFile`, { params, headers, responseType: 'blob' }).then(res => q.resolve(res.data)).catch(err => q.reject(err.data));
            return q.promise;
        }
        function uploadFile(path, file) { }
        function diskUsage(path, isDetail) {
            let q = $q.defer(),
                params = { path, isDetail };
            $http.get(`${url}/fileBrowserService/diskUsage`, { params, headers }).then(res => q.resolve(res.data)).catch(err => q.reject(err.data));
            return q.promise;
        }
        function createConfig() { }
        // CLUSTERS AND HOST
        function findClusters() { }
        function findHosts(cluster) { }
        function findServices(cluster) { }
        function hostMetricsCpu(clusters, host) { }
        function hostMetricsMemory(clusters, host) { }
        function hostMetricsDisk(clusters, host) { }
        function hostMetricsNetwork(clusters, host) { }
        function hostDatanodeMetricsJvm(clusters, host) { }
    }
})();