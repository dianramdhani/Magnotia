require('./config');

window.app = angular.module('Magnotia', ['ui.router', 'angular-md5', 'ngCookies']);

(function () {
    'use strict';

    window.app
        .run(Run);

    Run.$inject = ['$rootScope', '$cookies', '$http'];
    function Run($rootScope, $cookies, $http) {
        $rootScope.config = window.config;
        $rootScope.globals = angular.fromJson($cookies.get('globals')) || {};
        if ($rootScope.globals.currentUser) {
            // $http.defaults.headers.common['token'] = $rootScope.globals.currentUser.token;
            $http.defaults.headers.common['token'] = '1234';
        }
    }
})();

// routes
require('../routes/app.route');
require('../routes/tenant-user.route');

// services
require('../services/auth.service');
require('../services/application-pool.service');

// components
require('../components/search/search');

// views
require('../views/login/login');
require('../views/tenant-user/tenant-user-container/tenant-user-container');
require('../views/tenant-user/tenant-user-app-suite/tenant-user-app-suite');
require('../views/tenant-user/tenant-user-new-instance-form/tenant-user-new-instance-form');
require('../views/tenant-user/tenant-user-add-application/tenant-user-add-application');