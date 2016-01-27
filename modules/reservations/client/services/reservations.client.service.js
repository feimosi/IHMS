'use strict';

angular.module('reservations').factory('Reservations', function ($resource) {
    return $resource('api/reservations/:reservationId', {
        reservationId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        getByUser: {
            method: 'GET',
            url: 'api/reservations/user/:userId',
            isArray: true
        }
    });
});
