(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('tenantUserDataBrowser', {
            template: require('./data-browser.html'),
            controller: tenantUserDataBrowserController
        });

    tenantUserDataBrowserController.$inject = [];
    function tenantUserDataBrowserController() {
        var $ctrl = this;

        $ctrl.$onInit = function () { };
    }
})();