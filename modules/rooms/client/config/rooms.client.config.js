'use strict';

angular.module('rooms').run(function (Menus) {
    Menus.addMenuItem('topbar', {
        title: 'Rooms',
        state: 'rooms',
        type: 'dropdown',
        roles: ['*']
    });

    Menus.addSubMenuItem('topbar', 'rooms', {
        title: 'List Rooms',
        state: 'rooms.list'
    });

    Menus.addSubMenuItem('topbar', 'rooms', {
        title: 'Create Room',
        state: 'rooms.create',
        roles: ['user']
    });
});
