'use strict';

ApplicationConfiguration.registerModule('rooms', ['room-features']);
angular.module('rooms').config(function (NotificationProvider) {
    NotificationProvider.setOptions({
        positionX: 'center'
    });
});
