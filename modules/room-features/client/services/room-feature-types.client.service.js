'use strict';

angular.module('room-features').factory('RoomFeatureTypes', function ($resource) {
    return $resource('api/room-feature-types/:roomId', {
        roomId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});
