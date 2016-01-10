'use strict';

angular.module('rooms').run(function (Menus) {
    Menus.addMenuItem('topbar', {
        title: 'Rooms management',
        state: 'rooms.list',
        roles: ['*']
    });
});
