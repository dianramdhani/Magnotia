window.app = angular.module('Magnotia', ['ui.router', 'angular-md5', 'ngCookies']);

// config
require('./config');

(function () {
    'use strict';

    window.app
        .run(Run);

    Run.$inject = ['$rootScope', '$cookies', '$state'];
    function Run($rootScope, $cookies, $state) {
        $rootScope.globals = angular.fromJson($cookies.get('globals')) || {};
        if (typeof $rootScope.globals.currentUser === 'undefined') {
            $state.go('login');
        }
    }
})();

// routes
// app
require('../routes/app.route');
// app/tenant-user
require('../routes/tenant-user.route');
// app/tenant-user/application-suite
require('../routes/application-suite.route');

// services
// AuthService
require('../services/auth.service');
// applicationPoolService
require('../services/application-pool.service');
// TenantUserService
require('../services/tenant-user.service');
// LivyService
require('../services/livy.service');

// components
// search
require('../components/search/search');
// loading
require('../components/loading/loading');
// delete
require('../components/delete/delete');
// alert
require('../components/alert/alert');
// file-browser
require('../components/file-browser/file-browser');
// modal-select-file-or-directory
require('../components/modal-select-file-or-directory/modal-select-file-or-directory')

// views
// login login
require('../views/login/login');
// tenantUserContainer tenant-user-container
require('../views/tenant-user/container/container');
// tenantUserApplicationSuiteContainer tenant-user-application-suite-container
require('../views/tenant-user/application-suite/container/container');
// tenantUserApplicationSuiteHome tenant-user-application-suite-home
require('../views/tenant-user/application-suite/home/home');
// tenantUserApplicationSuiteFormNewInstance tenant-user-application-suite-form-new-instance
require('../views/tenant-user/application-suite/form-new-instance/form-new-instance');
// tenantUserApplicationSuiteModalNewApplicationSuite tenant-user-application-suite-modal-new-application-suite
require('../views/tenant-user/application-suite/modal-new-application-suite/modal-new-application-suite');
// tenantUserApplicationSuiteFormUpdateApplicationInstance tenant-user-application-suite-form-update-application-instance
require('../views/tenant-user/application-suite/form-update-application-instance/form-update-application-instance');
// tenantUserApplicationSuiteListSchedulerApplicationInstance tenant-user-application-suite-list-scheduler-application-instance
require('../views/tenant-user/application-suite/list-scheduler-application-instance/list-scheduler-application-instance');
// tenantUserApplicationSuiteModalNewSchedulerApplicationInstance tenant-user-application-suite-modal-new-scheduler-application-instance
require('../views/tenant-user/application-suite/modal-new-scheduler-application-instance/modal-new-scheduler-application-instance');
// tenantUserApplicationSuiteOutputApplicationInstance tenant-user-application-suite-output-application-instance
require('../views/tenant-user/application-suite/output-application-instance/output-application-instance');
// tenantUserApplicationSuiteTableApplicationInstance tenant-user-application-suite-table-application-instance
require('../views/tenant-user/application-suite/table-application-instance/table-application-instance');
// tenantUserDataBrowser tenant-user-data-browser
require('../views/tenant-user/data-browser/data-browser');
// tenantUserDataExplorer tenant-user-data-explorer
require('../views/tenant-user/data-explorer/data-explorer')