'use strict';

angular.module('reservations').run(function (Menus) {
    Menus.addMenuItem('topbar', {
        title: 'Reservations',
        state: 'reservations.list',
        roles: ['*']
    });
});
