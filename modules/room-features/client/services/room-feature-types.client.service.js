'use strict';

angular.module('room-features').factory('RoomFeatureTypes', function ($resource) {
    return $resource('api/room-feature-types/:id', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});
