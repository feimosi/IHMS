'use strict';

angular.module('rooms').factory('Floors', function ($resource) {
    return $resource('api/floors/:floorId', {
        floorId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});
