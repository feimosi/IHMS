'use strict';

angular.module('rooms').factory('Rooms', function ($resource) {
    return $resource('api/rooms/:roomId', {
        roomId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});
