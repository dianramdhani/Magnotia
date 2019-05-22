(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('platformAdminContainer', {
            template: require('./container.html'),
            controller: platformAdminContainerController,
        });

    platformAdminContainerController.$inject = [];
    function platformAdminContainerController() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();