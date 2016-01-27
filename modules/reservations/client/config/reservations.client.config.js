'use strict';

angular.module('reservations').run(function (Menus) {
    Menus.addMenuItem('topbar', {
        title: 'Find room',
        state: 'reservations.list',
        roles: ['*']
    });
    Menus.addMenuItem('topbar', {
        title: 'My reservations',
        state: 'reservations.my',
        roles: ['user']
    });
});
