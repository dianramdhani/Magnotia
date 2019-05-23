(function () {
    'use strict';

    window.app
        .service('TenantUserService', TenantUserService);

    TenantUserService.$inject = ['$http', '$q', '$rootScope', 'md5', 'CONFIG'];
    function TenantUserService($http, $q, $rootScope, md5, CONFIG) {
        this.browseDirectory = browseDirectory;
        this.downloadFile = downloadFile;
        this.diskUsage = diskUsage;
        this.makeDirectory = makeDirectory;
        this.removeFile = removeFile;
        this.uploadFile = uploadFile;
        this.getInternalUser = getInternalUser;
        this.createInternalUser = createInternalUser;
        this.deleteInternalUser = deleteInternalUser;
        this.getInternalUserByUsername = getInternalUserByUsername;
        this.updateInternalUser = updateInternalUser;
        this.getTenant = getTenant;
        this.isTenantAvailable = isTenantAvailable;
        this.createTenant = createTenant;

        const url = CONFIG.tenant, removeEmpty = (obj) => {
            Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
            return obj;
        }
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
        function isTenantAvailable(name) {
            let q = $q.defer(),
                params = { name };
            $http.get(`${url}/tenantService/isTenantAvailable`, { params, headers }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function getTenant(name, status) {
            let q = $q.defer(),
                params = removeEmpty({ name, status });
            $http.get(`${url}/tenantService/getTenant`, { params, headers }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function createTenant(name) {
            let q = $q.defer(),
                params = { tenant: name };
            $http.post(`${url}/tenantService/createTenant`, params, { headers }).then(res => q.resolve(res.data)).catch(err => q.reject(err.data));
            return q.promise;
        }
        function changeTenantStatus(params) { }
        // TENANT USER
        function isUsernameAvailable(username) { }
        function getInternalUser() {
            let q = $q.defer(),
                params = { tenant: $rootScope.globals.currentUser.tenant };
            $http.get(`${url}/tenantUserService/getInternalUser`, { params, headers }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function getInternalUserByUsername(username) {
            let q = $q.defer(),
                params = { username };
            $http.get(`${url}/tenantUserService/getInternalUserByUsername`, { params, headers }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function createInternalUser(password, username, email) {
            let q = $q.defer(),
                params = {
                    tenantName: $rootScope.globals.currentUser.tenant,
                    user: {
                        password: md5.createHash(password),
                        username, email
                    }
                };
            $http.post(`${url}/tenantUserService/createInternalUser`, params, { headers }).then(res => q.resolve(res.data)).catch(err => q.reject(err.data));
            return q.promise;
        }
        function updateInternalUser(user) {
            let q = $q.defer(),
                params = {
                    tenantName: $rootScope.globals.currentUser.tenant,
                    user
                };
            $http.put(`${url}/tenantUserService/updateInternalUser`, params, { headers }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function deleteInternalUser(username) {
            let q = $q.defer(),
                params = { username };
            $http.delete(`${url}/tenantUserService/deleteInternalUser`, { params, headers }).then(res => q.resolve(res.data));
            return q.promise;
        }
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
        function makeDirectory(path, directory) {
            let q = $q.defer(),
                params = { path, directory };
            $http.post(`${url}/fileBrowserService/makeDirectory`, {}, { params, headers }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function copyFile(source, destination) { }
        function moveFile(source, destination) { }
        function renameFile(source, newFileName) { }
        function removeFile(path) {
            let q = $q.defer(),
                params = { path };
            $http.put(`${url}/fileBrowserService/removeFile`, {}, { params, headers }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function downloadFile(path) {
            let q = $q.defer(),
                params = { path };
            $http.get(`${url}/fileBrowserService/downloadFile`, { params, headers, responseType: 'blob' }).then(res => q.resolve(res.data)).catch(err => q.reject(err.data));
            return q.promise;
        }
        function uploadFile(path, file) {
            let q = $q.defer(),
                data = new FormData();
            data.append('file', file, file.name);
            data.append('path', path);
            $http({
                url: `${url}/fileBrowserService/uploadFile`,
                method: 'POST',
                data,
                headers: Object.assign({ 'Content-Type': undefined }, headers)
            })
                .then(res => q.resolve(res.data))
                .catch(err => q.reject(err.data));
            return q.promise;
        }
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