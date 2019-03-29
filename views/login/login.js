(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('login', {
            template: require('./login.html'),
            controller: loginController,
        });

    loginController.$inject = [];

    function loginController() {
        var $ctrl = this;

        $ctrl.$onInit = function () {};
    }
})();