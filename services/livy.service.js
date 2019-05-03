(function () {
    'use strict';

    window.app
        .service('LivyService', LivyService);

    LivyService.$inject = ['$http', '$q', '$rootScope', '$cookies', 'CONFIG'];
    function LivyService($http, $q, $rootScope, $cookies, CONFIG) {
        this.createTableFromFile = createTableFromFile;
        this.getSession = getSession;
        this.deleteSession = deleteSession;
        this.checkSession = checkSession;
        this.executeQuery = executeQuery;
        this.getStatement = getStatement;
        this.getVarAsJson = getVarAsJson;

        const url = CONFIG.livy;

        function createHeaders() { }
        function getSession() {
            let q = $q.defer(),
                _getSession = () => {
                    $http.get(`${url}/get-session`).then(res => {
                        $rootScope.globals['sessionDataExplorer'] = res.data;
                        let cookieExp = new Date();
                        cookieExp.setDate(cookieExp.getDate() + 7);
                        $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
                        q.resolve(res.data);
                    });
                };
            if (typeof $rootScope.globals.sessionDataExplorer === 'undefined') {
                _getSession();
            } else {
                this.checkSession($rootScope.globals.sessionDataExplorer.id)
                    .then(resCheckSession => {
                        if (resCheckSession.id === null) {
                            _getSession();
                        } else {
                            q.resolve(resCheckSession);
                        }
                    });
            }
            return q.promise;
        }
        function getStatement(sessionId, statementId) {
            let q = $q.defer();
            $http.get(`${url}/get-statement/${sessionId}/${statementId}`).then(res => q.resolve(res.data));
            return q.promise;
        }
        function createTableFromFile(sessionId, path, tableName, fileType, options) {
            let q = $q.defer();
            $http.post(`${url}/create-table-from-file/${sessionId}`, { path, tableName, fileType, options }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function executeQuery(sessionId, query) {
            let q = $q.defer();
            $http.post(`${url}/execute-query/${sessionId}`, { query }).then(res => q.resolve(res.data));
            return q.promise;
        }
        function getVarAsJson(sessionId, varName) {
            let q = $q.defer();
            $http.get(`${url}/get-var-as-json/${sessionId}/${varName}`).then(res => q.resolve(res.data));
            return q.promise;
        }
        function deleteSession(sessionId) {
            let q = $q.defer();
            $http.delete(`${url}/delete-session/${sessionId}`).then(res => q.resolve(res.data));
            return q.promise;
        }
        function getSchema(sessionId, tableName) { }
        function checkSession(sessionId) {
            let q = $q.defer();
            $http.get(`${url}/check-session/${sessionId}`).then(res => q.resolve(res.data));
            return q.promise;
        }
    }
})();